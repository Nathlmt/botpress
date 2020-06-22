import * as sdk from 'botpress/sdk'
import _ from 'lodash'

const generateFlow = async (data: any, metadata: sdk.FlowGeneratorMetadata): Promise<sdk.FlowGenerationResult> => {
  const lesson = JSON.parse(data.lessonInput);
  return {
    transitions: createTransitions(),
    flow: {
      nodes: createNodes(lesson),
      catchAll: {
        next: []
      }
    }
  }
}

const createNodes = data => {
  const nodes: sdk.SkillFlowNode[] = [
    {
      name: 'entry',
      onEnter: [
        {
          type: sdk.NodeActionType.RenderText,
          name: `{"text": "${data.question}"}`
        }
      ],
      next: [{ condition: 'true', node: 'parse' }]
    }
  ]
  return nodes
}

const createTransitions = (): sdk.NodeTransition[] => {
  return [
    { caption: 'On success', condition: 'temp.valid', node: '' },
    { caption: 'On failure', condition: '!temp.valid', node: '' }
  ]
}

export default { generateFlow }
