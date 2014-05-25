/*globals Events*/

// Fixture data
if (Events.find().count() === 0) {
  var now = new Date().getTime();
  var mom = moment().format('MMMM Do YYYY, h:mm:ss a');

  console.log(mom);
  // create two users
  var giuseppeId = Meteor.users.insert({
    profile: { name: 'Giuseppe Pes' }
  });
  var giuseppe = Meteor.users.findOne(giuseppeId);

  var fadyId = Meteor.users.insert({
    profile: { name: 'Fady Kalo' }
  });
  var fady = Meteor.users.findOne(fadyId);

  var event1 = Events.insert({
    title: 'Relaxed Chat',
    summary:"just hanging out.",
    userId: fady._id,
    author: fady.profile.name,
    time: now - 7 * 3600 * 1000
  });
  var event2 = Events.insert({
    title: 'Easy Session',
    summary:"let's figure out the solution.",
    userId: giuseppe._id,
    author: giuseppe.profile.name,
    time: now - 10 * 3600 * 1000
  });
  var event3 = Events.insert({
    title: 'Interview Call',
    summary:"do some exercises.",
    userId: giuseppe._id,
    author: giuseppe.profile.name,
    time: now - 12 * 3600 * 1000
  });
}