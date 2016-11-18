$(document).ready(function () {
  console.log("js working");
});

$('#add-pet').on('click' addPet);


function addPet() {
  event.preventDefault();

  var pets = {};

    $.each($('#pet-form').serializeArray(), function (i, field) {
    pets[field.name] = field.value;
  });

  console.log('pets: ', pet);

  $.ajax({
    type: 'POST',
    url: '/pets',
    data: book,
    success: function(response) {
      // getPets();
      console.log('server is talking');
    },
    error: function() {
      console.log('could not post a new pet');
    }
  })

}
