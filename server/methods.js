Meteor.startup(function () {
  Meteor.methods({
//  TODO: add check on the input format.
    createEvent: function (eventAttributes) {
      var user = Meteor.user();
      if (!user) {
        throw new Meteor.Error(401, "You need to login to create an event");
      }

      var event = _.extend(eventAttributes, {
        url: "https://squiddy.io",
        title: eventAttributes.title,
        userId: user,
        author: user.username,
        time: new Date().getTime(),
        summary: eventAttributes.summary,
        start: eventAttributes.start,
        end: eventAttributes.end,
        invited: mapInvitee(eventAttributes.invited),
        rsvps: []
      });

      var eventId = Events.insert(event);
//    if the event was created
      if (eventId) {
        console.log(eventAttributes.invited)
        addSend(eventId, eventAttributes.invited)
      }
      return eventId;
    },
    invite: function (eventId, userId) {

      check(eventId, String);
      check(userId, String);
      var event = Events.findOne(eventId);

      if (!event || event.userId._id !== this.userId) {
        throw new Meteor.Error(404, "No such event");
      }
      if (userId !== event.userId._id && !_.contains(event.invited, userId)) {
//      Events.update(eventId, { $addToSet: { invited: userId } });

        var from = contactEmail(Meteor.users.findOne(this.userId));
        var to = contactEmail(Meteor.users.findOne(userId));

        if (Meteor.isServer && to) {
          // This code only runs on the server. If you didn't want clients
          // to be able to see it, you could move it to a separate file.
          // TODO: change the text to go the event link.
//        Email.send({
//          from: "noreply@squiddy.com",
//          to: to,
//          replyTo: from || undefined,
//          subject: "Event: " + event.title,
//          text: "Hey, I just invited you to '" + event.title + "\n\nCome check it out: " + Meteor.absoluteUrl() + "\n"
//        });
        }
      }
    },
    rsvp: function (eventId, rsvp) {
      check(eventId, String);
      check(rsvp, String);
      if (!this.userId)
        throw new Meteor.Error(403, "You must be logged in to RSVP");
      if (!_.contains(['yes', 'no', 'maybe'], rsvp))
        throw new Meteor.Error(400, "Invalid RSVP");
      var event = Events.findOne(eventId);
      if (!event)
        throw new Meteor.Error(404, "No such event");
      if (event.userId !== this.userId && !_.contains(event.invited, this.userId))
      // private, but let's not tell this to the user
        throw new Meteor.Error(403, "No such event");

      var rsvpIndex = _.indexOf(_.pluck(event.rsvps, 'user'), this.userId);
      if (rsvpIndex !== -1) {
        // update existing rsvp entry

        if (Meteor.isServer) {
          // update the appropriate rsvp entry with $
          Events.update(
            {_id: eventId, "rsvps.user": this.userId},
            {$set: {"rsvps.$.rsvp": rsvp}});
        }
//      else {
//        // minimongo doesn't yet support $ in modifier. as a temporary
//        // workaround, make a modifier that uses an index. this is
//        // safe on the client since there's only one thread.
//        var modifier = {$set: {}};
//        modifier.$set["rsvps." + rsvpIndex + ".rsvp"] = rsvp;
//        Events.update(eventId, modifier);
//      }

        // TODO(possible): send email to the other people that are coming to the event.
      } else {
        // add new rsvp entry
        Events.update(eventId,
          {$push: {rsvps: {user: this.userId, rsvp: rsvp}}});
      }
    }
  });

  function mapInvitee(participantList) {
    var result = _.map(participantList, function (part) {
      var thisUser = Meteor.users.findOne({ "emails.address": part });
      return thisUser;
    });
    return result;
  }

  function addSend(eventId, participantList) {
    _.each(participantList, function (part) {
      Meteor.call('invite', eventId, part._id)
    });

  }

//function createInviteeList(participants) {
//  return _.map(mapInvitee(participants), function (part) {
//    var a = {id: part}
//    return a
//  });
//}

//TODO this is based on how i have created the fixture for the user.
  var contactEmail = function (user) {
    if (user.emails && user.emails.length) {
      return user.emails[0].address;
    }
//  if (user.services && user.services.facebook && user.services.facebook.email){
//    return user.services.facebook.email;
//  }
    return null;
  }

});