exports.handler = async (event, context) => {
  const fetch = require('node-fetch') //diese Bibliothek wird gebraucht, damit man wie bei normalem Javascript fetch verwenden kann
  const anzahl = event.queryStringParameters.anzahl   //👉https://flaviocopes.com/netlify-functions-query-parameters/
  const API_ENDPOINT = "https://cocontrol.bl.ch/public/dbw/146";
  const infogramSchema = [[]]       //👉Schema-Beschreibung https://infogram.com/api/examples/live.json

  return fetch(API_ENDPOINT)
    .then(response => response.text()) // = mach was mit der Antwort und zwar mach sie zu einem json-objekt
    .then(websitecontent => {
        websitecontent = websitecontent.replace(/(\r\n|\n|\r)/gm, "")
        websitecontent = websitecontent.match(/(?<=Neuinfektionen&quot;).*(?=\<\/pre>)/)[0]
        websitecontent = websitecontent.split(/(?=\d\d-\d\d-\d\d\d\d)/)
        return(JSON.stringify(websitecontent))//3328var res = str.substr(1, 4);

    })
    .then(ausgabe => ({             //wenn bis hierhin kein fehler: gib das Infogram-Array als String aus. dieses letzte then sowie das "catch" bezieht sich auf return ganz am Anfang der Funktion, siehe https://docs.netlify.com/functions/build-with-javascript/
      statusCode: 200, body: ausgabe
    }))
    .catch(error => ({ statusCode: 422, body: String(error) })); //sonst gib einen Fehler zurück 
}