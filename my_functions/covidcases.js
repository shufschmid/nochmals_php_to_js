const fetch = require('node-fetch')

const API_ENDPOINT = "https://data.bs.ch/api/records/1.0/search/?dataset=100077&q=BS+or+BL&rows=100&sort=update";
let ausgabe = ""

exports.handler = async (event, context) => {
    return fetch('https://data.bs.ch/api/records/1.0/search/?dataset=100073&q=&sort=timestamp&facet=timestamp')
    .then(response => response.json())
    .then(function(data){
        data.records.forEach(post => { console.log(post.fields.current_quarantined_total)});
    })
    
   }; 