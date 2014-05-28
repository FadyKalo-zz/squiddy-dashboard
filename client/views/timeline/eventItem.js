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
//  ownPost: function () {
//    return this.userId === Meteor.userId();
//  }
  partCount: function () {
    // the creator always participates.
    return this.participants.length +1;
//    return Events.find({postId: this._id}).count();
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
