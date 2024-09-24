// fee_payment.js

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('paymentForm').addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Gather form data
      const formData = new FormData(event.target);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
  
      // Make a POST request to the server for processing
      fetch('http://localhost:6006/fee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      })
        .then(response => response.text())
        .then(message => {
          // Handle response from the server
          alert(message);
          // Optionally, redirect to a success page
          window.location.href = 'success.html';
        })
        .catch(error => console.error('Error:', error));
    });
  });
  