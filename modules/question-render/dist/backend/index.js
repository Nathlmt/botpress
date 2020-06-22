"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("bluebird-global");

var _question = _interopRequireDefault(require("./question"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const onServerReady = async bp => {// await choice.setup(bp)
};

const onModuleUnmount = async bp => {
  bp.http.deleteRouterForBot('basic-skills');
};

const skillsToRegister = [{
  id: 'Render',
  name: 'Question',
  icon: 'numbered-list',
  flowGenerator: _question.default.generateFlow
}];
const entryPoint = {
  onServerReady,
  onModuleUnmount,
  definition: {
    name: 'question-render',
    menuIcon: 'fiber_smart_record',
    fullName: 'Question Render',
    homepage: 'https://botpress.com',
    noInterface: true,
    plugins: [],
    moduleView: {
      stretched: true
    }
  },
  skills: skillsToRegister
};
var _default = entryPoint;
exports.default = _default;
//# sourceMappingURL=index.js.map