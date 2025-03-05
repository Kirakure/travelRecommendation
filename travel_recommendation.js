// Function to fetch the data from the travel_recommendation_api.json
async function fetchData() {
    const response = await fetch('travel_recommendation_api.json');
    return await response.json();
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', async function() {
    // Get the search input, convert it to lowercase
    const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();

    // Fetch data
    const data = await fetchData();

    let resultMessage = "No results found for '" + searchTerm + "'. Please try again.";
    let resultsHTML = '';

    // Search through the data and check for matching keywords
    if (searchTerm === "beach" || searchTerm === "beaches") {
        data.beaches.forEach(item => {
            resultsHTML += `
                <div class="result-item">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                </div>
            `;
        });
        resultMessage = resultsHTML ? '' : resultMessage;
    } else if (searchTerm === "temple" || searchTerm === "temples") {
        data.temples.forEach(item => {
            resultsHTML += `
                <div class="result-item">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                </div>
            `;
        });
        resultMessage = resultsHTML ? '' : resultMessage;
    } else if (searchTerm === "country" || searchTerm === "countries") {
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                resultsHTML += `
                    <div class="result-item">
                        <img src="${city.imageUrl}" alt="${city.name}">
                        <div>
                            <h3>${city.name}</h3>
                            <p>${city.description}</p>
                        </div>
                    </div>
                `;
            });
        });
        resultMessage = resultsHTML ? '' : resultMessage;
    }

    // Display results or message if no matches
    document.getElementById('resultsSection').innerHTML = resultsHTML || `<p>${resultMessage}</p>`;
});
