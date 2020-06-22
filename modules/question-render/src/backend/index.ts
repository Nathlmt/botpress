import 'bluebird-global'
import * as sdk from 'botpress/sdk'
import _ from 'lodash'


import question from './question'

const onServerReady = async (bp: typeof sdk) => {
  // await choice.setup(bp)
}

const onModuleUnmount = async (bp: typeof sdk) => {
  bp.http.deleteRouterForBot('basic-skills')
}

const skillsToRegister: sdk.Skill[] = [
  {
    id: 'Render',
    name: 'Question',
    icon: 'numbered-list',
    flowGenerator: question.generateFlow
  },

]

const entryPoint: sdk.ModuleEntryPoint = {
  onServerReady,
  onModuleUnmount,
  definition: {
    name: 'question-render',
    menuIcon: 'fiber_smart_record',
    fullName: 'Question Render',
    homepage: 'https://botpress.com',
    noInterface: true,
    plugins: [],
    moduleView: { stretched: true }
  },
  skills: skillsToRegister
}

export default entryPoint
