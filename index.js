key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwdWJ3bHVndXJkb2dzd210bG9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4MTA3NTgsImV4cCI6MjAyMDM4Njc1OH0.q_ny_P3pSAo2O3UJONmqQQ8peujO__cELkyXJJX6QTM";

url = "https://upubwlugurdogswmtlom.supabase.co";

database = supabase.createClient(url, key);
var pu_select = document.getElementById("pu-select");

showPollingUnits = async () => {
    let announced_pu_results = await database
        .from("announced_pu_results")
        .select("polling_unit_uniqueid, party_abbreviation, party_score");
    console.log(announced_pu_results.data.length);
    for(i>0, i++, i<=announced_pu_results.data.length){
      option = document.createElement('option')
      option.innerText = `${announced_pu_results.data[i].polling_unit_uniqueid}`
      console.log(option)
      pu_select.appendChild = `${option}`
      i+1
    }
    // var options = announced_pu_results
    //     .map((data) => {
    //         return "<option>" + data.item.polling_unit_uniqueid + "</option>";
    //     })
    //     .join(" ");
    // console.log(options);
    // pu_select.appendChild(options);
};
showPollingUnits();
