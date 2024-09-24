document.addEventListener('DOMContentLoaded', function () {
  // Add an event listener for each button
  document.getElementById('entryButton').addEventListener('click', function () {
    window.location.href = 'entry form.html'; // Navigate to the entry form page
  });

  document.getElementById('exitButton').addEventListener('click', function () {
    window.location.href = 'exit form.html'; // Navigate to the exit form page
  });

  document
    .getElementById('viewEntryButton')
    .addEventListener('click', function () {
      window.location.href = 'viewentry.html'; // Navigate to the view entry page
    });
});
