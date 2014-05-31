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
    return formatName(this.user);
  },
  creatorName: function () {
    var owner = this.userId
    console.log("OWNER:", this.userId)
    if (owner._id === Meteor.userId())
      return "me";
    return formatName(owner);
  },
  canInvite: function () {
//    console.log(Meteor.userId() === this.userId._id);
    return this.userId._id === Meteor.userId();
  },
  invitationName: function () {
//    console.log(formatName(this));
    var test = formatName(this)
    console.log(test)
    return test;
  },

  nobody: function () {
    return (this.rsvps.length + this.invited.length === 0);
  },
  outstandingInvitations: function () {
    var userList = ( _.pluck(this.rsvps, 'user'));

//    console.log(this.title, _.pluck(this.invited, '_id'), _.pluck(userList, '_id'))
    var condition = Meteor.users.find({$and: [
      {_id: {$in: _.pluck(this.invited, '_id')}}, // they're invited
      {_id: {$nin: _.pluck(userList, '_id')}} // but haven't RSVP'd
    ]});
    return condition;
  },
  maybeChosen: function (what) {
    var myRsvp = _.find(this.rsvps, function (r) {
//      console.log(r.user._id === Meteor.userId())
      return r.user._id === Meteor.userId();
    }) || {};

    return what == myRsvp.rsvp ? "chosen btn-inverse" : "";
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
  },
  'click .rsvp_yes': function () {
    console.log(this)
    Meteor.call("rsvp", this._id, "yes", function (error, id) {
      if (error) {
        // display the error to the user
        if (error.error === 401) {
//          console.log(error.message);
        }
        console.log(error.message);
      } else {
        console.log("OK")
      }
    });
    return false;
  },
  'click .rsvp_maybe': function () {
    Meteor.call("rsvp", this._id, "maybe", function (error, id) {
      if (error) {
        // display the error to the user
        if (error.error === 401) {
//          console.log(error.message);
        }
        console.log(error.message);
      } else {
        console.log("OK")
      }
    });
    return false;
  },
  'click .rsvp_no': function () {
    Meteor.call("rsvp", this._id, "no", function (error, id) {
      if (error) {
        // display the error to the user
        if (error.error === 401) {
//          console.log(error.message);
        }
        console.log(error.message);
      } else {
        console.log("OK")
      }
    });
    return false;
  }
//  'click .invite': function () {
////    openInviteDialog();
//    return false;
//  },
//  'click .remove': function () {
//    Events.remove(this._id);
//    return false;
//  }

});

//$('.grid .tools a.remove')
