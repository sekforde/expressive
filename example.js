var Workqueue = require("./lib/workqueue");

// var workqueue = new Workqueue();

// workqueue
// 	.fetch.a.file.from("here").file.called("file1")
// 	.and.rotate.pages.from(5).to(10).by.degrees(90)
// 	.then.add.barcode.type("code128").at.x(100).y(100).with.width(50).height(50)
// 	.and.duplicate(100).times
// 	.and.impose.using.template("impositionTemplateId")
// 	.and.upload.to("there")
// 	.and.email.to("nigelwatson@me.com");

// console.log(workqueue.narrative+"\n");

var str = "fetch a file from http://download.com/file called file1 and rotate pages from 5 to 10 "+
	"and add a barcode type code128 at x 100 and y 100 with width 50 height 50 " +
	"and then duplicate it 100 times "+
	"and impose it using the template impositionTemplateId "+
	"and upload it to http://upload.com/file "+
	"and email it to nigelwatson@me.com";

var workqueue2 = new Workqueue(str);

// console.log(workqueue2.queue);

console.log(JSON.stringify(workqueue2.__actions, null, 2));
