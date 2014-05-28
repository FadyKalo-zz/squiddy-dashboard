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

    Meteor.call('createEvent', event, function (error, id) {
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
  }
});


Template.eventSubmitForm.rendered = function () {
  $('#participants').tagsinput({
    typeahead: {
      source: ['fadykalo@gmail.com', 'giuse88@gmail.com', 'example@gmail.com']
    }
  });

  var my_date = new Date();
  var today = moment().format()
  my_date.setFullYear(my_date.getFullYear() - 18, my_date.getMonth(), my_date.getDay() - 1)


  a = moment(my_date).format('L');
  console.log(today);

  $('#start').datepicker({
    format: "dd/mm/yyyy",
    startView: 0,
    autoclose: true,
    startDate: today
  });
  $('#end').datepicker({
    format: "dd/mm/yyyy",
    startView: 0,
    autoclose: true,
    startDate: today
  });

//  $('#time').timepicker();
  //HTML5 editor
//  $('#text-editor').wysihtml5();
};


//  Template.eventSubmitForm.rendered = function () {
//
//    $(".inside").children('input').blur(function () {
//      $(this).parent().children('.add-on').removeClass('input-focus');
//    });
//
//    $(".inside").children('input').focus(function () {
//      $(this).parent().children('.add-on').addClass('input-focus');
//    });
//
//    $(".input-group.transparent").children('input').blur(function () {
//      $(this).parent().children('.input-group-addon').removeClass('input-focus');
//    });
//
//    $(".input-group.transparent").children('input').focus(function () {
//      $(this).parent().children('.input-group-addon').addClass('input-focus');
//    });
//}