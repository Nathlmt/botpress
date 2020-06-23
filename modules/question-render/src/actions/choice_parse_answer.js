'use strict'
const _ = require('lodash')

/**
 * Get a variable under this user's storage
 * @title Validate user choice
 * @category Skills
 * @hidden true
 * @author Botpress, Inc.
 * @param {string} data - The parameters of the available choices
 */
const createResult = (answers) =>{
    const arrResult = {};
    (function createSentence(k, res) {
        if (k === answers.length) {
            arrResult[res] = 1;
            return res
        };
        for (let i = 0; i < answers[k].length; i++) {
            res = res + answers[k][i];
            createSentence(k + 1, res);
        }
    })(0, "");
    return arrResult;
}

const validateChoice = async data => {
    console.log('data', data);
    console.log('event', event);

  const result = createResult(data.answer);
  const userResponse = event.preview.normalize('NFC');
  const keySuffix = data.randomId ? `-${data.randomId}` : ''
  if (result[userResponse]) {
    temp[`skill-choice-valid${keySuffix}`] = true
  } else {
    temp[`skill-choice-valid${keySuffix}`] = false
  }
}


return validateChoice(args)
