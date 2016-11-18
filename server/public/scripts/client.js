$(document).ready(function () {

  $('#add-pet').on('click', function(event){
      event.preventDefault();
      addPet();
  });
});

function addPet() {
  var pets = {};
    $.each($('#pet-form').serializeArray(), function (i, field) {
    pets[field.name] = field.value;
  });
  console.log('pets: ', pets);

  $.ajax({
    type: 'POST',
    url: '/pets',
    data: pets,
    success: function(response) {
      // getPets();
      console.log('server is talking', response);
    },
    error: function() {
      console.log('could not post a new pet');
    }
  })

}
