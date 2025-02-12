'use strict'
const _ = require('lodash')
const INTENT_PREFIX = 'intent:'

/**
 * Get a variable under this user's storage
 * @title Validate user choice
 * @category Skills
 * @hidden true
 * @author Botpress, Inc.
 * @param {string} data - The parameters of the available choices
 */
const validateChoice = async data => {
  let choice = undefined
  const config = await bp.config.getModuleConfigForBot('basic-skills', event.botId)
  console.log('config', config);
  console.log('data', data);

  const nb = _.get(event.preview.match(/^[#).!]?([\d]{1,2})[#).!]?$/), '[1]')
  console.log('nb', nb);
  console.log('event', event);

  if (config.matchNumbers && nb) {
    const index = parseInt(nb) - 1
    const element = await bp.cms.getContentElement(event.botId, data.contentId)
    choice = _.get(element, `formData.choices.${index}.value`)
  }

  if (!choice && config.matchNLU) {
    choice = _.findKey(data.keywords, keywords => {
      const intents = keywords
        .filter(x => (x || '').toLowerCase().startsWith(INTENT_PREFIX))
        .map(x => x.substr(INTENT_PREFIX.length))
      return _.some(intents, k => event.nlu.intent.name === k)
    })
  }

  if (!choice) {
    const preview = (event.preview || '').toLowerCase()
    const userText = ((event.payload && event.payload.text) || '').toLowerCase()
    const choiceValue = ((event.payload && event.payload.payload) || '').toLowerCase()

    choice = _.findKey(data.keywords, keywords =>
      _.some(keywords || [], k => {
        const keyword = (k || '').toLowerCase()
        return preview.includes(keyword) || userText.includes(keyword) || choiceValue.includes(keyword)
      })
    )
  }

  const keySuffix = args.randomId ? `-${args.randomId}` : ''
  if (choice) {
    temp[`skill-choice-valid${keySuffix}`] = true
    temp[`skill-choice-ret${keySuffix}`] = choice
  } else {
    temp[`skill-choice-valid${keySuffix}`] = false
  }
}

return validateChoice(args)
