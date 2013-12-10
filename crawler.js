var Crawler = require('crawler').Crawler;
var fs = require('fs');
var output = fs.createWriteStream('crawl_result.txt', {'flags': 'a'});

var c = new Crawler({
	"maxConnections":10,

	//This will be called for each crawled page
	"callback":function(error, result, $) {
        // If an "a" tag is found, check if it's a weekly happy hour link.
		$("a").each(function(index, a) {
            if(a.href.substring(0,30) === "http://do512.com/events/weekly" &&
                    a.attributes.class != undefined) {
                if(a.attributes.class._nodeValue === "ds-listing-event-title url summary"){
                    c.queue(a.href);
                }
            }
		});

        // If a "span" tag is found, check if it's a weekly happy hour title.
        $("span").each(function(index, h) {
            if(h.attributes.class != undefined &&
                h.attributes.class._nodeValue === "ds-event-title-text") {
                console.log(h._childNodes[0]._nodeValue);
                output.write(h._childNodes[0]._nodeValue + "\n");
            }
        });

        // If a "div" tag is found, check if it's a weekly happy hour date.
        $("div").each(function(index, h) {
            if(h.attributes.class != undefined &&
                h.attributes.class._nodeValue === "ds-event-date") {
                console.log(h._childNodes[0]._nodeValue);
                console.log('-----------------------------------------------');
                output.write(h._childNodes[0]._nodeValue + "\n");
                output.write('-----------------------------------------------\n');
            }

        });
	}
});

c.queue("http://do512.com/events/austin-happy-hours/week");
