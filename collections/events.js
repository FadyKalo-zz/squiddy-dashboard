/*globals Meteor*/
Events = new Meteor.Collection('events');


Events.allow({
  insert: function (userId, event) {
    return false; // no creation with insert, only with the create method.
  },
  update: function (userId, event, fields, modifier) {
    if (userId !== event.userId)
      return false; // not the owner

    var allowed = ["title", "description", "x", "y"];
    if (_.difference(fields, allowed).length){
      console.log("UPDATE NOT ALLOWED")
      return false; // tried to write to forbidden field
    }

    // A good improvement would be to validate the type of the new
    // value of the field (and if a string, the length.) In the
    // future Meteor will have a schema system to makes that easier.
    return true;
  },
  remove: function (userId, event) {
    // You can only remove events that you created and nobody is going to.
    return event.userId === userId && attending(event) === 0;
  }
});
