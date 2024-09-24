document.addEventListener('DOMContentLoaded', function () {
  // Add an event listener to the form submission
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Gather form data
    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Make a POST request to compare entry data with exit data
    fetch('http://localhost:6006/exit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.match) {
          // Entry data matches exit data, proceed to fee receipt
          window.location.href = '../frontend/fee.html';
        } else {
          // Entry data does not match exit data, show error message
          alert('Entry data does not match with exit data!');
        }
      })
      .catch((error) => console.error('Error:', error));
  });
});
