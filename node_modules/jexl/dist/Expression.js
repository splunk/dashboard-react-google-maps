"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/*
 * Jexl
 * Copyright 2020 Tom Shawver
 */
var Evaluator = require('./evaluator/Evaluator');

var Lexer = require('./Lexer');

var Parser = require('./parser/Parser');

var PromiseSync = require('./PromiseSync');

var Expression = /*#__PURE__*/function () {
  function Expression(grammar, exprStr) {
    (0, _classCallCheck2.default)(this, Expression);
    this._grammar = grammar;
    this._exprStr = exprStr;
    this._ast = null;
  }
  /**
   * Forces a compilation of the expression string that this Expression object
   * was constructed with. This function can be called multiple times; useful
   * if the language elements of the associated Jexl instance change.
   * @returns {Expression} this Expression instance, for convenience
   */


  (0, _createClass2.default)(Expression, [{
    key: "compile",
    value: function compile() {
      var lexer = new Lexer(this._grammar);
      var parser = new Parser(this._grammar);
      var tokens = lexer.tokenize(this._exprStr);
      parser.addTokens(tokens);
      this._ast = parser.complete();
      return this;
    }
    /**
     * Asynchronously evaluates the expression within an optional context.
     * @param {Object} [context] A mapping of variables to values, which will be
     *      made accessible to the Jexl expression when evaluating it
     * @returns {Promise<*>} resolves with the result of the evaluation.
     */

  }, {
    key: "eval",
    value: function _eval() {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._eval(context, Promise);
    }
    /**
     * Synchronously evaluates the expression within an optional context.
     * @param {Object} [context] A mapping of variables to values, which will be
     *      made accessible to the Jexl expression when evaluating it
     * @returns {*} the result of the evaluation.
     * @throws {*} on error
     */

  }, {
    key: "evalSync",
    value: function evalSync() {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var res = this._eval(context, PromiseSync);

      if (res.error) throw res.error;
      return res.value;
    }
  }, {
    key: "_eval",
    value: function _eval(context, promise) {
      var _this = this;

      return promise.resolve().then(function () {
        var ast = _this._getAst();

        var evaluator = new Evaluator(_this._grammar, context, undefined, promise);
        return evaluator.eval(ast);
      });
    }
  }, {
    key: "_getAst",
    value: function _getAst() {
      if (!this._ast) this.compile();
      return this._ast;
    }
  }]);
  return Expression;
}();

module.exports = Expression;