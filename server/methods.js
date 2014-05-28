Meteor.methods({
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
      participants: mapInvitee(eventAttributes.participants),
      invited:[]
    });

    var eventId = Events.insert(event);
//    if the event was created
    if(eventId){
      console.log("i'm in",eventId)
      console.log(eventAttributes)
      console.log(event.participants)
      addSend(eventId, eventAttributes.participants)
    }
    return eventId;
  },
  invite: function (eventId, userId) {

    check(eventId, String);
    check(userId, String);
    var event = Events.findOne(eventId);
    console.log("event: ",event.userId._id)
    console.log("event: ",this.userId)
    if (!event || event.userId._id !== this.userId) {
      throw new Meteor.Error(404, "No such event");
    }
    if (userId !== event.userId._id && !_.contains(event.invited, userId)) {
      Events.update(eventId, { $addToSet: { invited: userId } });

      var from = contactEmail(Meteor.users.findOne(this.userId));
      var to = contactEmail(Meteor.users.findOne(userId));

      if (Meteor.isServer && to) {
        // This code only runs on the server. If you didn't want clients
        // to be able to see it, you could move it to a separate file.
        // TODO: change the text to go the event link.
        Email.send({
          from: "noreply@squiddy.com",
          to: to,
          replyTo: from || undefined,
          subject: "Event: " + event.title,
          text: "Hey, I just invited you to '" + event.title + "\n\nCome check it out: " + Meteor.absoluteUrl() + "\n"
        });
      }
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

function addSend(eventId,participantList){
  _.each(participantList,function(part){

    Meteor.call('invite',eventId, part._id)
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
  if (user.email && user.email.length)
    return user.email;
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
  return null;
};