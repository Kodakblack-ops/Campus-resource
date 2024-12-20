function showFeature(featureId) {
  // Hide all features
  const features = document.querySelectorAll('.feature');
  features.forEach(feature => feature.style.display = 'none');
  
  // Show the selected feature
  document.getElementById(featureId).style.display = 'block';
}
document.querySelector('.button').addEventListener('click', function () {
  window.location.href = '#features';
});

 // Function to fetch real-time availability from the server (mocked)
 function fetchAvailability() {
  // Example AJAX call to a server endpoint that returns real-time availability data
  $.ajax({
      url: "/api/availability", // API endpoint for real-time availability
      method: "GET",
      success: function (data) {
          // Update availability status for study spaces, meeting rooms, and parking spots
          $("#study-space-availability").html(data.studySpacesAvailable ? "Available" : "Not Available");
          $("#meeting-room-availability").html(data.meetingRoomsAvailable ? "Available" : "Not Available");
          $("#parking-spot-availability").html(data.parkingSpotsAvailable ? "Available" : "Not Available");

          // Enable buttons if spaces are available
          $("#book-study-space").prop("disabled", !data.studySpacesAvailable).toggleClass("available", data.studySpacesAvailable).toggleClass("not-available", !data.studySpacesAvailable);
          $("#book-meeting-room").prop("disabled", !data.meetingRoomsAvailable).toggleClass("available", data.meetingRoomsAvailable).toggleClass("not-available", !data.meetingRoomsAvailable);
          $("#book-parking-spot").prop("disabled", !data.parkingSpotsAvailable).toggleClass("available", data.parkingSpotsAvailable).toggleClass("not-available", !data.parkingSpotsAvailable);
      },
      error: function () {
          alert("Failed to fetch availability data.");
      }
  });
}

// Booking action (for simplicity, alerts here)
$("#book-study-space").click(function () {
  alert("Study space booked!");
  $("#study-space-status").text("You have successfully booked a study space.");
});

$("#book-meeting-room").click(function () {
  alert("Meeting room booked!");
  $("#meeting-room-status").text("You have successfully booked a meeting room.");
});

$("#book-parking-spot").click(function () {
  alert("Parking spot booked!");
  $("#parking-spot-status").text("You have successfully booked a parking spot.");
});

// Initialize by fetching availability data
$(document).ready(function () {
  fetchAvailability();
  setInterval(fetchAvailability, 30000); // Refresh every 30 seconds to update availability
});



// Open the modal when "Add to Cart" is clicked
function openModal(foodItem) {
  document.getElementById('customization-modal').style.display = 'block';
  document.getElementById('customization-form').dataset.food = foodItem;
}

// Close the modal
function closeModal() {
  document.getElementById('customization-modal').style.display = 'none';
}

// Handle the submission of the order
function submitOrder() {
  const form = document.getElementById('customization-form');
  const foodItem = form.dataset.food;

  // Gather selected toppings
  const toppings = [];
  document.querySelectorAll('input[name="topping"]:checked').forEach(input => toppings.push(input.value));

  // Gather selected beverage
  const beverage = document.querySelector('input[name="beverage"]:checked')?.value;

  // Display the order summary
  alert(`You added ${foodItem} with toppings: ${toppings.join(', ')} and beverage: ${beverage || 'none'} to your cart.`);

  // Close the modal
  closeModal();
}

// Attach click handlers to "Add to Cart" buttons
document.querySelectorAll('.foodmenu button').forEach(button => {
  button.addEventListener('click', function () {
    const foodItem = this.getAttribute('for');
    openModal(foodItem);
  });
});
