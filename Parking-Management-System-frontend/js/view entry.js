document.addEventListener('DOMContentLoaded', function () {
    // Fetch entry data from the server
    fetch('http://localhost:6006/entries')
        .then(response => response.json())
        .then(entryData => displayEntryData(entryData))
        .catch(error => console.error('Error:', error));

    // Function to display entry data on the page
    function displayEntryData(entryData) {
        const entryDataContainer = document.getElementById('entryDataContainer');

        if (entryData.length === 0) {
            entryDataContainer.innerHTML = '<p>No entry data available.</p>';
            return;
        }

        const tableHtml = `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Vehicle No</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    ${entryData.map(entry => `
                        <tr>
                            <td>${entry.name}</td>
                            <td>${entry.vehicleno}</td>
                            <td>${entry.email}</td>
                            <td>${entry.phonenumber}</td>
                            <td>${entry.time}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        entryDataContainer.innerHTML = tableHtml;
    }
});
