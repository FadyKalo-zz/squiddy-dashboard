/*globals Meteor*/
Events = new Meteor.Collection('events');

Meteor.methods({
  createEvent: function (eventAttributes) {

    var user = Meteor.users.find({username:'fady'});
//    console.log(user);
    var event = _.extend(eventAttributes, {
      url:"https://squiddy.io",
      title: eventAttributes.title,
      userId: user._id,
      author: user.username,
      time: new Date().getTime(),
      summary: eventAttributes.summary,
      start: eventAttributes.start,
      end: eventAttributes.end,
      participants: eventAttributes.participants
    });

    var eventId = Events.insert(event);
    return eventId;
  }
});