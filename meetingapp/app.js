let jsSHA = require('jssha');
let btoa = require('btoa');

let applicationId = "9dc8b2.vidyo.io";
let developerKey = "f04986bf3ffd478ea687840f242f7604";

function getRandomInt() {
return Math.floor(Math.random() * Math.floor(9999));
}

function generateToken(expiresInSeconds) {
var EPOCH_SECONDS = 62167219200;
var expires = Math.floor(Date.now() / 1000) + expiresInSeconds + EPOCH_SECONDS;
var shaObj = new jsSHA("SHA-384", "TEXT");
shaObj.setHMACKey(developerKey, "TEXT");
jid = "demoUser" + getRandomInt() + '@' + applicationId;
var body = 'provision' + '\x00' + jid + '\x00' + expires + '\x00';
shaObj.update(body);
var mac = shaObj.getHMAC("HEX");
var serialized = body + '\0' + mac;
return btoa(serialized);
}


const express = require('express')
const app = express()
const port = 3000
const hostname = '142.4.1.26';
app.use(express.static('public'))

app.get('/token', (req, res) => {
let thirtyMinutes = 30 * 60;
let response = JSON.stringify({
token: generateToken(thirtyMinutes)
});
res.send(response);
})

app.listen(port,hostname, () => console.log(`Listening on port ${port}!`))
