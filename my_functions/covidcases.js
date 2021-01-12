const fetch = require('node-fetch')

const API_ENDPOINT = "https://data.bs.ch/api/records/1.0/search/?dataset=100108&q=&rows=100&sort=test_datum&facet=test_datum";



exports.handler = async (event, context) => {
let ausgabe = ""
const allBS = []
const allBL = []

const infogramSchema = [[]] // Schema-Beschreibung https://infogram.com/api/examples/live.json

  return fetch(API_ENDPOINT, { headers: { "Accept": "application/json" } })
    .then(response => response.json())
    .then(function (data) {
      data.records.forEach(post => {
        
        infogramSchema[0].push([post.fields.test_datum,parseInt(post.fields.faelle_bs),parseInt(post.fields.inzidenz14_bs)]);
   
      });
      //allBS.reverse()
      allBL.reverse()
      let newCasesCumBL = []
      /*allBS.forEach((e, index) => {
        newCasesCumBS.push(index > 0 ? e - allBS[index - 1] > 0 ? e - allBS[index - 1] : 0 : 0);

      })*/

      /*allBL.forEach((e, index) => {
        newCasesCumBL.push(index > 0 ? e - allBL[index - 1] > 0 ? e - allBL[index - 1] : 0 : 0)
      })*/
      
    
    //infogramSchema[0].push(allBS)
    infogramSchema[0].push([
      "Corona Infektionen",
      "neue Fälle",
      "14-Tage-Inzidenz",
    ])
    infogramSchema[0].reverse()
    ausgabe = JSON.stringify(infogramSchema)

    })
    .then(data => ({
      statusCode: 200,
      body: ausgabe
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};