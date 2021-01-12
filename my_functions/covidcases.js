exports.handler = async (event, context) => {
  const fetch = require('node-fetch') //diese Bibliothek wird gebraucht, damit man wie bei normalem Javascript fetch verwenden kann
  const anzahl = event.queryStringParameters.anzahl   //👉https://flaviocopes.com/netlify-functions-query-parameters/
  const API_ENDPOINT = "https://data.bs.ch/api/records/1.0/search/?dataset=100108&q=&rows="+anzahl+"&sort=test_datum&facet=test_datum";
  const infogramSchema = [[]]       //👉Schema-Beschreibung https://infogram.com/api/examples/live.json

  return fetch(API_ENDPOINT, { headers: { "Accept": "application/json" } })
    .then(response => response.json()) // = mach was mit der Antwort und zwar mach sie zu einem json-objekt
    
    .then(data => {                 // = mach was mit der Antwort (= dem json-objekt mit allen einträgen)
        data.records.forEach(       // für alle einträge...
          eintrag => {              // nimm den aktuellen eintrag..
            infogramSchema[0].push( //und füge ihn zuhinterst im finalen Array an und zwar als 👇 "Datum", Zahl, Zahl 
              [eintrag.fields.test_datum, parseInt(eintrag.fields.faelle_bs), parseInt(eintrag.fields.inzidenz14_bs)]
            )
          }
        )
        infogramSchema[0].push(     //wenn alle Einträge durch, füge die Spaltenüberschriften hinzu
          ["Corona Infektionen","neue Fälle","14-Tage-Inzidenz"]
        );
        infogramSchema[0].reverse(); //und drehe das ganze array um, wobei das Schema bei inforam gefühlt eine eckige Klammer zu viel hat deshalb jeweils [0]
      }    
    )

    .then(ausgabe => ({             //wenn bis hierhin kein fehler: gib das Infogram-Array als String aus. dieses letzte then sowie das "catch" bezieht sich auf return ganz am Anfang der Funktion, siehe https://docs.netlify.com/functions/build-with-javascript/
      statusCode: 200, body: JSON.stringify(infogramSchema)      
    }))
    .catch(error => ({ statusCode: 422, body: String(error) })); //sonst gib einen Fehler zurück 
}