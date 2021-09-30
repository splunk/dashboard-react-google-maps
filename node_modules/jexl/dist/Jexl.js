"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/*
 * Jexl
 * Copyright 2020 Tom Shawver
 */
var Expression = require('./Expression');

var _require = require('./grammar'),
    getGrammar = _require.getGrammar;
/**
 * Jexl is the Javascript Expression Language, capable of parsing and
 * evaluating basic to complex expression strings, combined with advanced
 * xpath-like drilldown into native Javascript objects.
 * @constructor
 */


var Jexl = /*#__PURE__*/function () {
  function Jexl() {
    (0, _classCallCheck2.default)(this, Jexl);
    // Allow expr to be called outside of the jexl context
    this.expr = this.expr.bind(this);
    this._grammar = getGrammar();
  }
  /**
   * Adds a binary operator to Jexl at the specified precedence. The higher the
   * precedence, the earlier the operator is applied in the order of operations.
   * For example, * has a higher precedence than +, because multiplication comes
   * before division.
   *
   * Please see grammar.js for a listing of all default operators and their
   * precedence values in order to choose the appropriate precedence for the
   * new operator.
   * @param {string} operator The operator string to be added
   * @param {number} precedence The operator's precedence
   * @param {function} fn A function to run to calculate the result. The function
   *      will be called with two arguments: left and right, denoting the values
   *      on either side of the operator. It should return either the resulting
   *      value, or a Promise that resolves with the resulting value.
   * @param {boolean} [manualEval] If true, the `left` and `right` arguments
   *      will be wrapped in objects with an `eval` function. Calling
   *      left.eval() or right.eval() will return a promise that resolves to
   *      that operand's actual value. This is useful to conditionally evaluate
   *      operands.
   */


  (0, _createClass2.default)(Jexl, [{
    key: "addBinaryOp",
    value: function addBinaryOp(operator, precedence, fn, manualEval) {
      this._addGrammarElement(operator, (0, _defineProperty2.default)({
        type: 'binaryOp',
        precedence: precedence
      }, manualEval ? 'evalOnDemand' : 'eval', fn));
    }
    /**
     * Adds or replaces an expression function in this Jexl instance.
     * @param {string} name The name of the expression function, as it will be
     *      used within Jexl expressions
     * @param {function} fn The javascript function to be executed when this
     *      expression function is invoked. It will be provided with each argument
     *      supplied in the expression, in the same order.
     */

  }, {
    key: "addFunction",
    value: function addFunction(name, fn) {
      this._grammar.functions[name] = fn;
    }
    /**
     * Syntactic sugar for calling {@link #addFunction} repeatedly. This function
     * accepts a map of one or more expression function names to their javascript
     * function counterpart.
     * @param {{}} map A map of expression function names to javascript functions
     */

  }, {
    key: "addFunctions",
    value: function addFunctions(map) {
      for (var key in map) {
        this._grammar.functions[key] = map[key];
      }
    }
    /**
     * Adds a unary operator to Jexl. Unary operators are currently only supported
     * on the left side of the value on which it will operate.
     * @param {string} operator The operator string to be added
     * @param {function} fn A function to run to calculate the result. The function
     *      will be called with one argument: the literal value to the right of the
     *      operator. It should return either the resulting value, or a Promise
     *      that resolves with the resulting value.
     */

  }, {
    key: "addUnaryOp",
    value: function addUnaryOp(operator, fn) {
      this._addGrammarElement(operator, {
        type: 'unaryOp',
        weight: Infinity,
        eval: fn
      });
    }
    /**
     * Adds or replaces a transform function in this Jexl instance.
     * @param {string} name The name of the transform function, as it will be used
     *      within Jexl expressions
     * @param {function} fn The function to be executed when this transform is
     *      invoked. It will be provided with at least one argument:
     *          - {*} value: The value to be transformed
     *          - {...*} args: The arguments for this transform
     */

  }, {
    key: "addTransform",
    value: function addTransform(name, fn) {
      this._grammar.transforms[name] = fn;
    }
    /**
     * Syntactic sugar for calling {@link #addTransform} repeatedly.  This function
     * accepts a map of one or more transform names to their transform function.
     * @param {{}} map A map of transform names to transform functions
     */

  }, {
    key: "addTransforms",
    value: function addTransforms(map) {
      for (var key in map) {
        this._grammar.transforms[key] = map[key];
      }
    }
    /**
     * Creates an Expression object from the given Jexl expression string, and
     * immediately compiles it. The returned Expression object can then be
     * evaluated multiple times with new contexts, without generating any
     * additional string processing overhead.
     * @param {string} expression The Jexl expression to be compiled
     * @returns {Expression} The compiled Expression object
     */

  }, {
    key: "compile",
    value: function compile(expression) {
      var exprObj = this.createExpression(expression);
      return exprObj.compile();
    }
    /**
     * Constructs an Expression object from a Jexl expression string.
     * @param {string} expression The Jexl expression to be wrapped in an
     *    Expression object
     * @returns {Expression} The Expression object representing the given string
     */

  }, {
    key: "createExpression",
    value: function createExpression(expression) {
      return new Expression(this._grammar, expression);
    }
    /**
     * Retrieves a previously set expression function.
     * @param {string} name The name of the expression function
     * @returns {function} The expression function
     */

  }, {
    key: "getFunction",
    value: function getFunction(name) {
      return this._grammar.functions[name];
    }
    /**
     * Retrieves a previously set transform function.
     * @param {string} name The name of the transform function
     * @returns {function} The transform function
     */

  }, {
    key: "getTransform",
    value: function getTransform(name) {
      return this._grammar.transforms[name];
    }
    /**
     * Asynchronously evaluates a Jexl string within an optional context.
     * @param {string} expression The Jexl expression to be evaluated
     * @param {Object} [context] A mapping of variables to values, which will be
     *      made accessible to the Jexl expression when evaluating it
     * @returns {Promise<*>} resolves with the result of the evaluation.
     */

  }, {
    key: "eval",
    value: function _eval(expression) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var exprObj = this.createExpression(expression);
      return exprObj.eval(context);
    }
    /**
     * Synchronously evaluates a Jexl string within an optional context.
     * @param {string} expression The Jexl expression to be evaluated
     * @param {Object} [context] A mapping of variables to values, which will be
     *      made accessible to the Jexl expression when evaluating it
     * @returns {*} the result of the evaluation.
     * @throws {*} on error
     */

  }, {
    key: "evalSync",
    value: function evalSync(expression) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var exprObj = this.createExpression(expression);
      return exprObj.evalSync(context);
    }
    /**
     * A JavaScript template literal to allow expressions to be defined by the
     * syntax: expr`40 + 2`
     * @param {Array<string>} strs
     * @param  {...any} args
     */

  }, {
    key: "expr",
    value: function expr(strs) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var exprStr = strs.reduce(function (acc, str, idx) {
        var arg = idx < args.length ? args[idx] : '';
        acc += str + arg;
        return acc;
      }, '');
      return this.createExpression(exprStr);
    }
    /**
     * Removes a binary or unary operator from the Jexl grammar.
     * @param {string} operator The operator string to be removed
     */

  }, {
    key: "removeOp",
    value: function removeOp(operator) {
      if (this._grammar.elements[operator] && (this._grammar.elements[operator].type === 'binaryOp' || this._grammar.elements[operator].type === 'unaryOp')) {
        delete this._grammar.elements[operator];
      }
    }
    /**
     * Adds an element to the grammar map used by this Jexl instance.
     * @param {string} str The key string to be added
     * @param {{type: <string>}} obj A map of configuration options for this
     *      grammar element
     * @private
     */

  }, {
    key: "_addGrammarElement",
    value: function _addGrammarElement(str, obj) {
      this._grammar.elements[str] = obj;
    }
  }]);
  return Jexl;
}();

module.exports = new Jexl();
module.exports.Jexl = Jexl;