var Workqueue = function() {

	var _wq = this;

	_wq.__actions = [];

	_wq.toJson = function () {
		return JSON.stringify(_wq.actions);
	}

	Object.defineProperty(_wq, "queue", {
		get: function () {
			return _wq.__actions;
		}
	});

	this.__addParam = function (name, description, key) {
		if (!key) {
			key = name;
		}
		this[name] = function (value) {
			_wq.__lastAction.inputs[key] = value;
			process.stdout.write(description + " '" + value + "' ");
			return _wq;
		}
	};

	this.__addAction = function(name, description) {
		Object.defineProperty(_wq, name, {
			get: function () {

				_wq.__lastAction = {
					name: name,
					inputs: {}
				};
				_wq.__actions.push(_wq.__lastAction);

				process.stdout.write(description + " ");

				return _wq;
			},
			enumerable: true
		});
	};

	this.__addChain = function(name, description) {
		Object.defineProperty(_wq, name, {
			get: function () {
				process.stdout.write(description+" ");
				return _wq;
			},
			enumerable: true
		});
	};

	_wq.__addParam("x", "x");
	_wq.__addParam("y", "y");
	_wq.__addParam("width", "width");
	_wq.__addParam("height", "height");
	_wq.__addParam("type", "type");
	_wq.__addParam("page", "page");
	_wq.__addParam("to", "to");
	_wq.__addParam("from", "from");
	_wq.__addParam("by", "by", "count");
	_wq.__addParam("template", "template");
	_wq.__addParam("name", "with name");
	_wq.__addParam("called", "called", "name");

	_wq.__addAction("fetch", "fetch from");
	_wq.__addAction("rotate", "rotate");
	_wq.__addAction("upload", "upload to");
	_wq.__addAction("add", "add");
	_wq.__addAction("barcode", "barcode");
	_wq.__addAction("impose", "impose");
	_wq.__addAction("duplicate", "duplicate");
	_wq.__addAction("email", "email");

	_wq.__addChain("then", "then");
	_wq.__addChain("and", "and");
	_wq.__addChain("at", "at");
	_wq.__addChain("with", "with");
	_wq.__addChain("pages", "pages");
	_wq.__addChain("using", "using");
	_wq.__addChain("file", "file");

};

module.exports = Workqueue;
