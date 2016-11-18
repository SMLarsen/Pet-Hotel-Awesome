$(document).ready(function () {

  $('#add-pet').on('click', function(event){
      event.preventDefault();
      addPet();
  });

  $('#register-owner').on('click', function(event){
    event.preventDefault();
    registerOwner();

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

function registerOwner() {
  var owners = {};
  $.each($('#owner-form').serializeArray(), function (i, field) {
    owners[field.name] = field.value;
  });
  console.log('owners: ', owners);

  $.ajax({
    type: 'POST',
    url: '/owners',
    data: owners,
    success: function(response) {
      //get Owners();
      console.log('server is functional', response);
    },
    error: function() {
      console.log('could not register a new owner');
    }
  })
}
