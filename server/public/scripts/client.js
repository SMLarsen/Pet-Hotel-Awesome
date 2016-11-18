$(document).ready(function () {
  console.log("js working");

//  getPets();

  $('#add-pet').on('click', function(event){
      event.preventDefault();
      addPet();
      getPets();
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

function getPets() {
  $.ajax({
    type: 'GET',
    url: '/pets',
    success: function(pets) {
      appendPets(pets);
    },
    error: function() {
      console.log('Database error');
    }

  })
}

function appendPets(pets) {
  $el=$(".pet-display");
  console.log(pets);
  $el.find(".petRow").empty();
  $el = $el.children().last();
  for (var i = 0; i < pets.length; i++) {
    var string = '<tr class="row petRow">';
    string += '<td>' + pets[i].first_name + ' ' + pets[i].last_name +'</td>';
    string += '<td>' + pets[i].name +'</td>';
    string += '<td>' + pets[i].breed +'</td>';
    string += '<td>' + pets[i].color +'</td>';
    string += '<td><button class="btn updateBtn" data-id=' + pets.id +'>Update</button></td>';
    string += '<td><button class="btn deleteBtn" data-id=' + pets.id +'>Delete</button></td>';
    string += '<td><button class="btn checkBtn" data-id=' + pets.id +'>In</button></td>';
    string += '</tr>';
    console.log(string);
    $el.append(string);

    // $el = $('.col-md-12');
    // var pet = pets[i];
    // console.log(pet);
    // $el.data('id', pet.id);
    // $el.append('<td name="owner" value="' + pet.name + '"></td>');
    // $el.append('<td name="petName" value="' + pet.name + '"></td>');
    // $el.append('<td name="breed" value="' + pet.name + '"></td>');
    // $el.append('<td name="color" value="' + pet.name + '"></td>');
    // $el.append('<td name="update" value="' + pet.name + '"></td>');
    // $el.append('<td name="delete" value="' + pet.name + '"></td>');
    // $el.append('<td name="checkInOut" value="' + pet.name + '"></td>');
  }
}
