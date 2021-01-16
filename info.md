## 描述 
* 本程式為繪圖網站PIXIV每日排行榜的爬蟲
* 使用工具及環境: Notepad++(editer), Windows PowerShell, nodejs
* 目標網站: [PIXIV](http://pixiv.net/ranking.php)
* 找到連結會直接顯示在localhost網頁上，結果隨網站更新變化

## 程式
* [執行檔](https://github.com/st741963456/crawer/blob/main/index.js)
* [package]()

安裝套件： npm install express
		npm install superagent
		npm install cheerio
執行方法： node index.js

```
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
```

## 結果
![image](https://user-images.githubusercontent.com/36965820/104821685-8b38b000-5878-11eb-8688-6294a9302a1f.png)
![image](https://user-images.githubusercontent.com/36965820/104821795-47927600-5879-11eb-8cb0-870ceedb9b5a.png)

## 參考來源
* [程式前沿/分分鐘鐘教你用node.js寫個爬蟲](https://codertw.com/ios/20272/)
