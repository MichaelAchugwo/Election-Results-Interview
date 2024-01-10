key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwdWJ3bHVndXJkb2dzd210bG9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4MTA3NTgsImV4cCI6MjAyMDM4Njc1OH0.q_ny_P3pSAo2O3UJONmqQQ8peujO__cELkyXJJX6QTM";

url = "https://upubwlugurdogswmtlom.supabase.co";

database = supabase.createClient(url, key);

pu_select = document.getElementById("pu-select");


showPollingUnits = async () => {
    let announced_pu_results = await database
        .from("announced_pu_results")
        .select("polling_unit_uniqueid, party_abbreviation, party_score");

    const uniqueIds = new Set();

    announced_pu_results.data.forEach(item => {
        if (!uniqueIds.has(item.polling_unit_uniqueid)) {
            const optionElement = document.createElement('option');
            optionElement.value = item.polling_unit_uniqueid;  // Set the value attribute
            optionElement.textContent = item.polling_unit_uniqueid;  // Set the inner text
            pu_select.appendChild(optionElement);  // Append the option to the select element
    
            uniqueIds.add(item.polling_unit_uniqueid);
        }
    });
};
showPollingUnits();
