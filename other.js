const { post } = require('./topic');
const { getbbtext } = require('./getbbtext');

const othertopics = async (page) => {
    let text = getbbtext();
    await post(page, text)
};

module.exports = { othertopics };