Template.eventList.helpers({
  events: function () {
    return Events.find({}, {sort: {start: -1}});
  }
});