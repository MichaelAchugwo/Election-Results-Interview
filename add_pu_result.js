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
let submitBtn = document.getElementById("submitBtn")

function json(url) {
    return fetch(url).then(res => res.json());
  }
  
  let apiKey = 'd7cc73ce7ba915ecaf69a2daf6e1e6bb8ddf808c7bf961eea5469abf';
  json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
    ipAddress = data.ip;
    return ipAddress;
  });

const addPUResult =  async (e) => {
    e.preventDefault()
    let polling_unit_id = document.getElementById("polling_unit_id").value
    let party_name = document.getElementById("party_name").value
    let party_score = document.getElementById("party_score").value
    let entered_by_user = document.getElementById("entered_by_user").value
    let packet = { 
        polling_unit_uniqueid: polling_unit_id, 
        party_abbreviation: party_name, 
        party_score: party_score, 
        entered_by_user: entered_by_user, 
        date_entered: currentDate,
        user_ip_address: ipAddress
    }
    try {
        let res = await database
        .from('announced_pu_results').insert([packet])
        if (res) {
            alert("Polling Unit Result Added Successfully")
        } else {
            alert("Polling Unit Result Add was unsuccessful")
    }      
    } catch(error) {
        console.error(error)
    }
    polling_unit_id = ""
    party_name = ""
    party_score = ""
    entered_by_user = ""
}
submitBtn.addEventListener('click', addPUResult)