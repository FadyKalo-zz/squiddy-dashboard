Template.eventSubmitForm.events({
  'submit form': function (e) {
    e.preventDefault();
    var event = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      summary: $(e.target).find('[name=summary]').val(),
      start: $(e.target).find('[name=start]').val(),
      end: $(e.target).find('[name=end]').val(),
      participants: $(e.target).find('[name=participants]').val()
    }

    Meteor.call('post', post, function (error, id) {
      if (error) {
        // display the error to the user
      } else {
      }
    });
  },

  "click .open-modal": function (e, t) {
//    e.preventDefault();
    console.log(e.target);
//    $("#myModal").modal("show");
  }
});