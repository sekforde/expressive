var Workqueue = function(str) {

	var _wq = this;

	_wq.__verbs = [];
	_wq.__connectors = [];
	_wq.__params = [];

	_wq.__typeHash = {};
	_wq.__actions = [];
	_wq.__narrative = "";
	_wq.__sentances = [];

	_wq.toJson = function () {
		return JSON.stringify(_wq.actions);
	}

	Object.defineProperty(_wq, "queue", {
		get: function () {
			return _wq.__actions;
		}
	});

	Object.defineProperty(_wq, "narrative", {
		get: function () {
			return _wq.__sentances.join(" ");
		}
	});

	this.__addParam = function (name, description, key) {
		key = key || name;
		_wq.__params.push(key);
		_wq.__typeHash[key] = "param";
		this[name] = function (value) {
			_wq.__lastAction.inputs[key] = value;
			_wq.__sentances.push(description + " '" + value + "'")
			return _wq;
		}
	};

	this.__addAction = function(name, description, expectedParams) {
		description = description || name;
		_wq.__verbs.push(name);
		_wq.__typeHash[name] = "action";
		Object.defineProperty(_wq, name, {
			get: function () {
				_wq.__lastAction = {
					name: name,
					inputs: {}
				};
				_wq.__actions.push(_wq.__lastAction);
				_wq.__sentances.push(description);
				return _wq;
			},
			enumerable: true
		});
	};

	this.__addChain = function(name, description) {
		description = description || name;
		_wq.__connectors.push(name);
		_wq.__typeHash[name] = "chain";
		Object.defineProperty(_wq, name, {
			get: function () {
				_wq.__sentances.push(description);
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
	_wq.__addParam("template", "template");
	_wq.__addParam("name", "with name");
	_wq.__addParam("called", "called", "name");
	_wq.__addParam("degrees", "rotation");

	_wq.__addAction("fetch", "fetch from");
	_wq.__addAction("rotate", "rotate");
	_wq.__addAction("upload", "upload to");
	_wq.__addAction("barcode", "barcode");
	_wq.__addAction("impose", "impose");
	_wq.__addAction("duplicate", "duplicate");
	_wq.__addAction("email", "email");

	_wq.__addChain("add");
	_wq.__addChain("then");
	_wq.__addChain("and");
	_wq.__addChain("at");
	_wq.__addChain("with");
	_wq.__addChain("pages");
	_wq.__addChain("using");
	_wq.__addChain("file");
	_wq.__addChain("by");
	_wq.__addChain("times");
	_wq.__addChain("a");
	_wq.__addChain("it");
	_wq.__addChain("the");

	if (str) {
		console.log(str);
		var tokens = str.split(" ");

		var _queue = _wq;
		while (tokens.length) {
			var token = tokens.shift();

			if (!_wq.hasOwnProperty(token)) {
				// console.log("ignore : ", token);
			} else {

				if (_wq.__typeHash[token]) {
					switch (_wq.__typeHash[token]) {
						case "param":
							var value = tokens.shift();
							// console.log("params : ", token, value);
							// console.log("found param", token);
							_wq[token](value);
						break;
						case "action":
							// console.log("found action", token);
							// console.log("action : ", token);
							_wq[token];
						break;
						case "chain":
							// console.log("found chain", token);
						break;
					}

				}

			}

		}

	}

};

if (!window) {
	module.exports = Workqueue;
}
