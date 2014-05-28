/*globals moment*/
Template.eventItem.helpers({
  created: function () {
    var mom = moment(this.time).format('MMMM Do YYYY, h:mm:ss a');
    return mom;
  },
  fromNow: function () {
    var time = moment(this.start);
    var now = moment();
    var from;
    switch (now.diff(time, 'days')) {
      case -1:
        from = 'tomorrow';
        break;
      case 0:
        from = 'today';
        break;
      case 1:
        from = 'yesterday';
        break;
      default:
        from = moment(time).format('L');
    }
    return from;
  },
  fromNowTime: function () {
    var mom = moment(this.start).format('hh:mm');
    return mom;
  },
  duration: function () {
    var end = moment(this.end);
    var start = moment(this.start);
    var diff = end.diff(start);
    return moment(diff).format("H [h] mm [min]");
//    return diff;
  },
  ampm: function () {
    var mom = moment(this.start).format('a');
    return mom;
  },

  partCount: function () {
    return this.rsvps.length;
//    return Events.find({postId: this._id}).count();
  },
  //  ownPost: function () {
  //    return this.userId === Meteor.userId();
  //  },
  rsvpIs: function (what) {
    return this.rsvp === what;
  },
  rsvpName: function () {
    return displayName(this.user);
  },
  creatorName: function () {
    var owner = Meteor.users.findOne(this.userId);
    console.log(owner)
    if (owner._id === Meteor.userId())
      return "me";
    return displayName(owner);
  },
  canInvite: function () {
    console.log(Meteor.userId() === this.userId._id);
    return this.userId._id === Meteor.userId();
  },
  invitationName: function () {
    return displayName(this);
  },

  nobody: function () {
    return (this.rsvps.length + this.invited.length === 0);
  },
  outstandingInvitations: function () {
    var event = Events.findOne(this._id);
    return Meteor.users.find({$and: [
      {_id: {$in: event.invited}}, // they're invited
      {_id: {$nin: _.pluck(event.rsvps, 'user')}} // but haven't RSVP'd
    ]});
  }


});

Template.eventItem.events({
  'click .grid .tools .collapse, click .grid .tools .expand': function (e) {
    var $target = $(e.target);
    collapseToggle($target);
  },
  'click .grid .tools a.remove': function (e) {
    var $target = $(e.target);
    removeToggle($target);
  },
  'click .grid .tools a.reload': function (e) {
    var $target = $(e.target);
    refreshToggle($target);
  }

});

//$('.grid .tools a.remove')
