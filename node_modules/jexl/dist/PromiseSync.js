"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/*
 * Jexl
 * Copyright 2020 Tom Shawver
 */
var PromiseSync = /*#__PURE__*/function () {
  function PromiseSync(fn) {
    (0, _classCallCheck2.default)(this, PromiseSync);
    fn(this._resolve.bind(this), this._reject.bind(this));
  }

  (0, _createClass2.default)(PromiseSync, [{
    key: "catch",
    value: function _catch(rejected) {
      if (this.error) {
        try {
          this._resolve(rejected(this.error));
        } catch (e) {
          this._reject(e);
        }
      }

      return this;
    }
  }, {
    key: "then",
    value: function then(resolved, rejected) {
      if (!this.error) {
        try {
          this._resolve(resolved(this.value));
        } catch (e) {
          this._reject(e);
        }
      }

      if (rejected) this.catch(rejected);
      return this;
    }
  }, {
    key: "_reject",
    value: function _reject(error) {
      this.value = undefined;
      this.error = error;
    }
  }, {
    key: "_resolve",
    value: function _resolve(val) {
      if (val instanceof PromiseSync) {
        if (val.error) {
          this._reject(val.error);
        } else {
          this._resolve(val.value);
        }
      } else {
        this.value = val;
        this.error = undefined;
      }
    }
  }]);
  return PromiseSync;
}();

PromiseSync.all = function (vals) {
  return new PromiseSync(function (resolve) {
    var resolved = vals.map(function (val) {
      while (val instanceof PromiseSync) {
        if (val.error) throw Error(val.error);
        val = val.value;
      }

      return val;
    });
    resolve(resolved);
  });
};

PromiseSync.resolve = function (val) {
  return new PromiseSync(function (resolve) {
    return resolve(val);
  });
};

PromiseSync.reject = function (error) {
  return new PromiseSync(function (resolve, reject) {
    return reject(error);
  });
};

module.exports = PromiseSync;