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

        // Make a POST request to the backend
        fetch('http://localhost:6006/entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        })
        .then(response => response.text())
        .then(message => alert(message))
        .catch(error => console.error('Error:', error));
    });
});
