key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwdWJ3bHVndXJkb2dzd210bG9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4MTA3NTgsImV4cCI6MjAyMDM4Njc1OH0.q_ny_P3pSAo2O3UJONmqQQ8peujO__cELkyXJJX6QTM";

url = "https://upubwlugurdogswmtlom.supabase.co";

database = supabase.createClient(url, key);

let ipAddress;
let date = new Date;
let year = date.getFullYear()
let month = date.getMonth() + 1
let day = date.getDay()
if (month<10, day<10) {
    month =  "0" + month
    day = "0" + day
}
let currentDate = `${year}-${month}-${day}`
let polling_unit_id = document.getElementById("polling_unit_id").value
let party_name = document.getElementById("party_name").value
let party_score = document.getElementById("party_score").value
let entered_by_user = document.getElementById("entered_by_user").value

fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    let ipAddress = data.ip;
    addPUResult(ipAddress)
})
  .catch(error => {
    console.error('Error fetching IP address:', error);
  });

addPUResult = async (e, ip) => {
    e.preventDefault;
    ip = ip
    let packet = { 
        polling_unit_id, party_name, party_score, entered_by_user, currentDate, ip
    }
    data = await database
        .from('announced_pu_results')
        .insert([packet])
        .select()
    // if (data) {
    //     alert("Polling Unit Result Added Successfully")
    // } else {
    //     alert("Polling Unit Result Add was unsuccessful")
    // }      
}