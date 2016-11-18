$(document).ready(function () {

  getPets();
  getDropDown();

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
      getPets();
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

  });
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
    // console.log(string);
    $el.append(string);

  }
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
      getDropDown();
      console.log('server is functional', response);
    },
    error: function() {
      console.log('could not register a new owner');
    }
  })
}

function getDropDown () {

  console.log('get dropdown');
  $.ajax({
    type: 'GET',
    url: '/owners/names',
    success: function(names) {
      appendNames(names);
    },
    error: function() {
      console.log('Database error');
    }

  });
}

function appendNames (names) {
  $('#owner-dropdown').empty();
  console.log('append names');
  for (var i = 0; i < names.length; i++) {
    var string = '<option value=' + names[i].id +'>' + names[i].first_name + ' ' + names[i].last_name + '</option>';
    $('#owner-dropdown').append(string);
  }
}
