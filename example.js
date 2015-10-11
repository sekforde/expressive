var Workqueue = require("./lib/workqueue");

var workqueue = new Workqueue();

workqueue
	.fetch.from("here").file.called("file1")
	.and.rotate.pages.from(5).to(10)
	.and.add.barcode.type("code128").at.x(100).y(100).with.width(50).height(50)
	.and.duplicate.by(100)
	.and.impose.using.template("impositionTemplateId")
	.and.upload.to("there")
	.and.email.to("nigelwatson@me.com");

console.log();

console.log(workqueue.queue);

// console.log(JSON.stringify(workqueue.__actions, null, 2));
