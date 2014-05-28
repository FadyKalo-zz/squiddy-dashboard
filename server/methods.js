Meteor.methods({
  createEvent: function (eventAttributes) {
    var user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to create an event");
    }

    var event = _.extend(eventAttributes, {
      url: "https://squiddy.io",
      title: eventAttributes.title,
      userId: user._id,
      author: user.username,
      time: new Date().getTime(),
      summary: eventAttributes.summary,
      start: eventAttributes.start,
      end: eventAttributes.end,
      participants: createParticipantsList(eventAttributes.participants)
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

function createParticipantsList(participants){
  return _.map(mapParticipants(participants), function(part){
    var a={id:part}
    return a
  });
}