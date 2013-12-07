var Crawler = require('crawler').Crawler;
var fs = require('fs');
var output = fs.createWriteStream('crawl_result.txt', {'flags': 'a'});
output.write("Result of keyword: happy");
output.write("\n");

var c = new Crawler({
	"maxConnections":10,

	//This will be called for each crawled page
	"callback":function(error, result, $) {
		if(result) {
			var page = result.body;
			var res = page.match(/happy/i);
			if (res && res.length > 0) {
				//console.log(result.body);
				output.write('-------------------------------------------------');
				output.write("\n");
				output.write(result.body);
				//output.write(res);
			}
		}

		//$ is a jQuery instance scoped to the server-side DOM of the page
		$("a").each(function(index, a) {
			console.log(a.href);
			c.queue(a.href);
		});
	}
});

c.queue("http://do512.com/events/austin-happy-hours");