Meteor.methods({
  createEvent: function (eventAttributes) {

    var user = Meteor.users.findOne({username: 'fady'});
    var event = _.extend(eventAttributes, {
      url: "https://squiddy.io",
      title: eventAttributes.title,
      userId: user._id,
      author: user.username,
      time: new Date().getTime(),
      summary: eventAttributes.summary,
      start: eventAttributes.start,
      end: eventAttributes.end,
      participants: mapParticipants(eventAttributes.participants)
    });

    var eventId = Events.insert(event);
    return eventId;
  }
});

function mapParticipants(participantList) {
  var result = _.map(participantList, function (part) {
    var thisUser = Meteor.users.findOne({ "emails.address" : part });
    return thisUser;
  });
  return result;
}