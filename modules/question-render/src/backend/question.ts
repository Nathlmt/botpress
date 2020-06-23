import * as sdk from 'botpress/sdk'
import _ from 'lodash'
import bodyParser from 'body-parser';

const generateFlow = async (data: any, metadata: sdk.FlowGeneratorMetadata): Promise<sdk.FlowGenerationResult> => {
  const lesson = JSON.parse(data.lessonInput);
  return {
    transitions: createTransitions(data),
    flow: {
      nodes: createNodes({ ...lesson, randomId: data.randomId }),
      catchAll: {
        next: []
      }
    }
  }
}

const createNodes = data => {
  const nodes: sdk.SkillFlowNode[] = [
    {
      name: 'initialElement',
      onReceive: [
        {
          type: sdk.NodeActionType.RunAction,
          name: 'question-render/create_question_element',
          args: { ...data }
        }
      ],
      next: [{ condition: 'true', node: 'ask' }]
    },
    {
      name: 'ask',
      onEnter: [
        {
          type: sdk.NodeActionType.RenderText,
          name: `{"text": "${data.question}"}`
        }
      ],
      next: [{ condition: 'true', node: 'parse' }]},
    {
      name: 'parse',
      onReceive: [
        {
          type: sdk.NodeActionType.RunAction,
          name: 'question-render/choice_parse_answer',
          args: { ...data }
        }
      ],
      next: [
        { condition: `temp['skill-choice-valid-${data.randomId}'] === true`, node: 'success' },
        { condition: 'true', node: 'fail' }
      ],
      triggers: [{ conditions: [{ id: 'always' }] }]
    },
    {
      name: 'fail',
      onEnter: [
        {
          type: sdk.NodeActionType.RenderText,
          name: `{"text": "Oops! Tiếc thật, câu trả lời của bạn chưa chính xác, bạn cố gắng hơn trong câu hỏi tiếp theo nhé"}`
        }
      ],
      next: [{ condition: 'true', node: 'parse' }]
    },
    {
      name: 'success',
      onEnter: [
        {
          type: sdk.NodeActionType.RenderText,
          name: `{"text": "Chúc mừng bạn đã trả lời đúng"}`
        }
      ],
      next: [{ condition: 'true', node: '#' }]
    }
  ]
  return nodes
}

const createTransitions = (data): sdk.NodeTransition[] => {
  return [
    { caption: 'On success', condition: `temp['skill-choice-valid-${data.randomId}'] === true`, node: '' },
    { caption: 'On failure', condition: '!temp.valid', node: '' }
  ]
}

export default { generateFlow }
