$( "#query-form" ).submit(function( event ) {
  event.preventDefault();
  var $form = $( this )
  student_id = $form.find( "input[name='student_id']" ).val()
  var posting = $.post( '/query', { student_id } );
  posting.done(function( data ) {
    $( "#result" ).empty()
    if (data.error) {
      console.log(data.error)
    } else {
      console.log(data)
      createTable(data.results)
    }
  });
});

$( "#query-form-escaped" ).submit(function( event ) {
  event.preventDefault();
  console.log('Using escaped query')
  var $form = $( this )
  student_id = $form.find( "input[name='student_id']" ).val()
  var posting = $.post( '/query-escaped', { student_id } );
  posting.done(function( data ) {
    $( "#result" ).empty()
    if (data.error) {
      console.log(data.error)
    } else {
      console.log(data)
      createTable(data.results)
    }
  });
});

function createTable(data) {
  var tbl_body = document.createElement("tbody");
  var tbl_row = tbl_body.insertRow();
  ['ID', 'First Name', 'Last Name', 'Email', 'Password'].forEach((item) => {
    var cell = tbl_row.insertCell();
    cell.appendChild(document.createTextNode(item));
  });
  var odd_even = false;
  $.each(data, function() {
    var tbl_row = tbl_body.insertRow();
    tbl_row.className = odd_even ? "odd" : "even";
    $.each(this, function(k , v) {
      var cell = tbl_row.insertCell();
      cell.appendChild(document.createTextNode(v.toString()));
    });
    odd_even = !odd_even;
  });
  $("#result").html(tbl_body);
}

$( "#clear" ).click(function() {
  $( "#result" ).empty()
});
