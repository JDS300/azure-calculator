document.getElementById('azureForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cpuCores = document.getElementById('cpuCores').value;
    const ramGB = document.getElementById('ramGB').value;
    const numVolumes = document.getElementById('numVolumes').value;
    const volumeSizeGB = document.getElementById('volumeSizeGB').value;

    // Make API request to Azure Pricing API
    const apiUrl = `https://prices.azure.com/api/retail/prices?cpu=${cpuCores}&ram=${ramGB}&volumes=${numVolumes}&size=${volumeSizeGB}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Display results in a formatted way
    const instanceName = data.instanceName;
    const instancePrice = data.instancePrice;
    const diskType = data.diskType;
    const diskPrice = data.diskPrice;

    const resultHTML = `
        <h2>Recommended Azure Instance:</h2>
        <p>Instance Type: ${instanceName}</p>
        <p>Instance Price (1-year reserve): $${instancePrice}</p>
        <h2>Managed Disk Configuration:</h2>
        <p>Disk Type: ${diskType}</p>
        <p>Disk Price (1-year reserve): $${diskPrice}</p>
    `;

    resultsDiv.innerHTML = resultHTML;
}
