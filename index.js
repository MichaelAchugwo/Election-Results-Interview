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
    let currentPu = pu_select.value
    let viewParticularResults = await database
    .from("announced_pu_results")
    .select("polling_unit_uniqueid, party_abbreviation, party_score");

    let resultData = viewParticularResults.data;
    const targetUniqueId = currentPu;
    const filteredData = resultData.filter((result) => result.polling_unit_uniqueid === targetUniqueId);

function createTableRow() {
    const row = document.createElement('tr');
    const abbreviationCell = document.createElement('td');
    abbreviationCell.textContent = filteredData.party_abbreviation;
    console.log(abbreviationCell)
    row.appendChild(abbreviationCell);
    const scoreCell = document.createElement('td');
    scoreCell.textContent = filteredData.party_score;
    row.appendChild(scoreCell);
}
function appendRowsToTable(rows) {
    rows.forEach(row => {
        pu_results.appendChild(row);
    });
}

const tableRows = filteredData.map(createTableRow);
}

appendRowsToTable(tableRows);