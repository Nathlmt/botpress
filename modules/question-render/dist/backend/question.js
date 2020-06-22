"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var sdk = _interopRequireWildcard(require("botpress/sdk"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const generateFlow = async (data, metadata) => {
  const lesson = JSON.parse(data.lessonInput);
  return {
    transitions: createTransitions(),
    flow: {
      nodes: createNodes(lesson),
      catchAll: {
        next: []
      }
    }
  };
};

const createNodes = data => {
  const nodes = [{
    name: 'entry',
    onEnter: [{
      type: sdk.NodeActionType.RenderText,
      name: `{"text": "${data.question}"}`
    }],
    next: []
  }];
  return nodes;
};

const createTransitions = () => {
  return [{
    caption: 'On success',
    condition: 'temp.valid',
    node: ''
  }, {
    caption: 'On failure',
    condition: '!temp.valid',
    node: ''
  }];
};

var _default = {
  generateFlow
};
exports.default = _default;
//# sourceMappingURL=question.js.map