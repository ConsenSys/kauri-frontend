"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _default = function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "svg",
        _extends({}, this.props, { width: "24", height: "24", viewBox: "0 0 24 24" }),
        _react2.default.createElement("path", { fill: "currentColor", d: "M14.643 16.66v2.827c0 .598-.174.897-.522.897-.205 0-.406-.098-.602-.295v-4.032c.196-.196.397-.295.603-.295.35 0 .523.3.523.898zm4.527.014v.616h-1.206v-.616c0-.607.2-.91.603-.91.402 0 .603.303.603.91zm-12.938-2.92h1.433v-1.258H3.487v1.258h1.406v7.62h1.34v-7.62zm3.857 7.62h1.19V14.76h-1.19v5.06c-.27.376-.523.564-.764.564-.16 0-.255-.094-.28-.28-.01-.028-.015-.184-.015-.47V14.76H7.84v5.236c0 .437.035.763.106.977.108.33.367.496.777.496.43 0 .884-.274 1.366-.818v.723zm5.745-1.98v-2.64c0-.65-.04-1.093-.12-1.325-.152-.5-.47-.75-.952-.75-.446 0-.86.24-1.245.722v-2.906h-1.192v8.88h1.192v-.644c.402.49.817.737 1.245.737.483 0 .8-.247.95-.738.082-.24.122-.687.122-1.34zm4.527-.135v-.175h-1.22c0 .455-.008.727-.026.817-.062.32-.24.482-.536.482-.41 0-.616-.308-.616-.924v-1.165h2.398v-1.38c0-.705-.12-1.223-.362-1.553-.348-.456-.82-.683-1.42-.683-.607 0-1.084.226-1.433.682-.25.33-.375.848-.375 1.553v2.317c0 .706.13 1.223.39 1.554.347.455.83.683 1.445.683.643 0 1.125-.238 1.447-.71.16-.242.254-.483.28-.724.02-.08.028-.34.028-.777zM12.22 7.03V4.22c0-.617-.193-.925-.577-.925-.384 0-.576.308-.576.924v2.81c0 .626.192.94.576.94.384 0 .576-.314.576-.94zm9.628 10.06c0 2.09-.116 3.65-.348 4.687-.125.527-.384.97-.777 1.326-.393.357-.848.562-1.366.616-1.643.186-4.12.28-7.433.28-3.312 0-5.79-.094-7.433-.28-.517-.055-.974-.26-1.372-.617-.397-.357-.654-.8-.77-1.326-.232-1-.348-2.563-.348-4.688 0-2.09.116-3.652.348-4.688.125-.527.384-.97.777-1.326.393-.357.853-.567 1.38-.63 1.633-.178 4.107-.267 7.42-.267 3.312 0 5.79.088 7.432.266.518.063.976.273 1.373.63s.654.8.77 1.326c.232 1 .348 2.562.348 4.687zM8.482 0h1.366l-1.62 5.344v3.63h-1.34v-3.63c-.125-.66-.397-1.607-.817-2.84C5.74 1.584 5.45.75 5.2 0h1.42l.95 3.522L8.483 0zm4.956 4.46v2.344c0 .723-.126 1.25-.376 1.58-.33.455-.803.683-1.42.683-.597 0-1.066-.228-1.405-.683-.25-.34-.375-.866-.375-1.58V4.46c0-.714.125-1.237.375-1.567.34-.455.808-.683 1.406-.683.616 0 1.09.228 1.42.683.25.33.374.853.374 1.567zm4.486-2.17v6.683h-1.22v-.736c-.472.553-.932.83-1.378.83-.41 0-.674-.165-.79-.496-.072-.213-.107-.548-.107-1.003V2.29h1.217v4.915c0 .295.005.45.014.47.027.196.12.294.282.294.24 0 .495-.193.763-.577V2.29h1.22z" })
      );
    }
  }]);

  return _default;
}(_react2.default.Component);

exports.default = _default;