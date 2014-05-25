/*globals Events, Meteor, moment*/

// Fixture data
if (Events.find().count() === 0) {
  var now = new Date().getTime();
  var mom = moment().format('MMMM Do YYYY, h:mm:ss a');

  // create two users
  var giuseppeId = Meteor.users.insert({
    profile: {
      name: 'Giuseppe Pes',
      picture: 'https://avatars1.githubusercontent.com/u/1751200?s=400'
    }
  });
  var giuseppe = Meteor.users.findOne(giuseppeId);

  var fadyId = Meteor.users.insert({
    profile: {
      name: 'Fady Kalo',
      picture: 'https://avatars3.githubusercontent.com/u/3518488?s=460'
    }
  });
  var fady = Meteor.users.findOne(fadyId);

  var event2 = Events.insert({
    title: 'Easy Session',
    summary: "let's figure out the solution.",
    userId: giuseppe._id,
    author: giuseppe.profile.name,
    time: now - 13 * 3600 * 1000,
    start: now - 10 * 3600 * 1000,
    end: now - 9.5 * 3600 * 1000,
    participants: [
      fady
    ]
  });

  var event1 = Events.insert({
    title: 'Relaxed Chat',
    summary: "just hanging out.",
    userId: fady._id,
    author: fady.profile.name,
    time: now - 9 * 3600 * 1000,
    start: now - 7 * 3600 * 1000,
    end: now - 6 * 3600 * 1000,
    participants: [
      fady,
      giuseppe
    ]
  });

  var event3 = Events.insert({
    title: 'Interview Call',
    summary: "do some exercises.",
    userId: giuseppe._id,
    author: giuseppe.profile.name,
    time: now - 20 * 3600 * 1000,
    start: now - 12 * 3600 * 1000,
    end: now - 10 * 3600 * 1000,
    participants: [
      giuseppe
    ]
  });
  var event4 = Events.insert({
    title: 'Late Call',
    summary: "I have to debug.",
    userId: fady._id,
    author: fady.profile.name,
    time: now - 29 * 3600 * 1000,
    start: now - 24 * 3600 * 1000,
    end: now - 23.5 * 3600 * 1000,
    participants: [
      fady,
      giuseppe
    ]
  });
  var event5 = Events.insert({
    title: 'Video Chat',
    summary: "Video Chat to arrange the work.",
    userId: giuseppe._id,
    author: giuseppe.profile.name,
    time: now - 100 * 3600 * 1000,
    start: now - 72 * 3600 * 1000,
    end: now - 70.5 * 3600 * 1000,
    participants: [
      giuseppe,
      fady
    ]
  });
}