const { post } = require('../modules/topic');
const { getbbtext } = require('../modules/getbbtext');

const othertopics = async (page, options) => {
    let text = getbbtext(options);
    await post(page, text)
};

module.exports = { othertopics };