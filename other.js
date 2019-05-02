const { post } = require('./topic');
const options = require('./options.json');
const { getbbtext } = require('./getbbtext');

const othertopics = async (page) => {
    let text = getbbtext(options);
    await post(page, text)
};

module.exports = { othertopics };