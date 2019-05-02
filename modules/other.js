const { post } = require('./topic');
const { getbbtext } = require('./getbbtext');

const othertopics = async (page, options) => {
    let text = getbbtext(options);
    await post(page, text)
};

module.exports = { othertopics };