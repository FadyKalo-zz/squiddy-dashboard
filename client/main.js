Meteor.subscribe('events');
//Meteor.subscribe('events', Meteor.user());

attending = function (event) {
  return (_.groupBy(event.rsvps, 'rsvp').yes || []).length;
};


displayName = function (user) {
  if (user.profile && user.profile.name) {
    console.log("PROFILE",user.profile.name)
    return user.profile.name
  } else {
    return user.username;
  }
//  return user.emails[0].address;
};