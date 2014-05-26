Template.eventSubmitForm.events({
  'submit form': function (e) {
    e.preventDefault();
    var event = {
      title: $(e.target).find('[name=title]').val(),
      summary: $(e.target).find('[name=summary]').val(),
      start: $(e.target).find('[name=start]').val(),
      end: $(e.target).find('[name=end]').val(),
      participants: $(e.target).find('[name=participants]').tagsinput('items')
    };

//    console.log($(e.target).find('[name=participants]').tagsinput('items'))
//    console.log(event.participants);
    Meteor.call('createEvent', event, function (error, id) {
      if (error) {
        // display the error to the user
        console.log("error occured.")
      } else {
        console.log("OK")
      }
    });
  }
});


Template.eventSubmitForm.rendered = function(){
  $('#participants').tagsinput({
    typeahead: {
      source: ['fadykalo@gmail.com', 'giuse88@gmail.com', 'example@gmail.com']
    }
  });

}