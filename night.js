const { post } = require('./topic');
const { getbbtext } = require('./getbbtext');

const nighttopic = async (page) => {
    let text = getbbtext();
    await post(page, text);
};

module.exports = { nighttopic };