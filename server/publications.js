Meteor.publish('events', function (user) {
  return Events.find({});
//  return Events.find( { parcipants: { $elemMatch: { id: user } } } );
});