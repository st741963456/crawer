const express = require('express');
const app = express();
const superagent= require('superagent');
const cheerio = require('cheerio');
// ...
let server = app.listen(3000, function () 
	{
	let host = server.address().address;
	let port = server.address().port;
	console.log('Running at http://%s:%s', host, port);
	}
);


//app.get('/', function (req, res) {res.send('Hello World!');});


let Today = [];

superagent.get('http://pixiv.net/ranking.php').end((err, res) => {
if (err) {
console.log(`lost - ${err}`)
} else {Today = getToday(res)}
});

let getToday = (res) => 
{
	let Today = [];
	let $ = cheerio.load(res.text);
	$("div[class='ranking-items adjust'] section div[class='ranking-image-item'] a:first-child").each( (idx, ele) =>
		{
		let rank = 
			{
			//title: $('ele').attr('data-title'),
			href: 'https://www.pixiv.net'+$(ele).attr('href')
			};
		Today.push(rank);
		})
	return Today
};

app.get('/', async (req, res, next) => {
res.send(Today);
});