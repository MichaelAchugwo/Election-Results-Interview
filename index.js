key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwdWJ3bHVndXJkb2dzd210bG9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4MTA3NTgsImV4cCI6MjAyMDM4Njc1OH0.q_ny_P3pSAo2O3UJONmqQQ8peujO__cELkyXJJX6QTM";

url = "https://upubwlugurdogswmtlom.supabase.co";

database = supabase.createClient(url, key);

var pu_select = document.getElementById("pu-select");
var pu_results = document.getElementById("pu-results");


showPollingUnits = async () => {
    let announced_pu_results = await database
        .from("announced_pu_results")
        .select("polling_unit_uniqueid");

    const uniqueIds = new Set();

    announced_pu_results.data.forEach(item => {
        if (!uniqueIds.has(item.polling_unit_uniqueid)) {
            const optionElement = document.createElement('option');
            optionElement.value = item.polling_unit_uniqueid; 
            optionElement.textContent = item.polling_unit_uniqueid; 
            pu_select.appendChild(optionElement); 
    
            uniqueIds.add(item.polling_unit_uniqueid);
        }
    });
};
showPollingUnits();

const viewResults = async () => {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = ""
    let currentPu = pu_select.value
    let viewParticularResults = await database
    .from("announced_pu_results")
    .select("polling_unit_uniqueid, party_abbreviation, party_score");

    let resultData = viewParticularResults.data;
    const targetUniqueId = currentPu;
    const filteredData = resultData.filter((result) => result.polling_unit_uniqueid === targetUniqueId);
    console.log(filteredData)

    const tableElement = document.createElement('table');
    tableElement.style.margin = "auto"
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