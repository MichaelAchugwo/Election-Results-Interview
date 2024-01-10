key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwdWJ3bHVndXJkb2dzd210bG9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4MTA3NTgsImV4cCI6MjAyMDM4Njc1OH0.q_ny_P3pSAo2O3UJONmqQQ8peujO__cELkyXJJX6QTM";

url = "https://upubwlugurdogswmtlom.supabase.co";

database = supabase.createClient(url, key);

var lga_select = document.getElementById("lga-select");
var lga_results = document.getElementById("lga-results");

showLocalGovernments = async () => {
    let announced_lga_results = await database
        .from("lga")
        .select("lga_id, lga_name")

    const uniqueIds = new Set();

    announced_lga_results.data.forEach(item => {
        if (!uniqueIds.has(item.lga_name)) {
            const optionElement = document.createElement('option');
            optionElement.value = item.lga_id; 
            optionElement.textContent = item.lga_name; 
            lga_select.appendChild(optionElement); 
    
            uniqueIds.add(item.lga_id);
        }
    })
};
showLocalGovernments();

viewLGAResults = async () => {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = ""
    let currentLGA = lga_select.value
    let viewParticularResults = await database
    .from("announced_lga_results")
    .select("lga_name, party_abbreviation, party_score");

    let resultData = viewParticularResults.data;
    const targetUniqueId = currentLGA;
    const filteredData = resultData.filter((result) => result.lga_name === targetUniqueId);

    const tableElement = document.createElement('table');
    tableElement.style.margin = "auto"
    tableElement.style.marginTop = "20px"
    const tableBodyElement = document.createElement('tbody');

filteredData.forEach(item => {
    const rowElement = document.createElement('tr');

    // Create first table cell for property1
    const cell1 = document.createElement('td');
    cell1.style.padding = "10px"
    cell1.textContent = item.party_abbreviation;
    rowElement.appendChild(cell1);

    // Create second table cell for property2
    const cell2 = document.createElement('td');
    cell2.style.padding = "10px"
    cell2.textContent = item.party_score;
    rowElement.appendChild(cell2);

    // Append the row to the table body
    tableBodyElement.appendChild(rowElement);
});
tableElement.appendChild(tableBodyElement);
tableContainer.appendChild(tableElement);
}