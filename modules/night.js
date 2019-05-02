const { post } = require('./topic');
const { getbbtext } = require('./getbbtext');

const nighttopic = async (page, options) => {
    let text = getbbtext(options);
    await post(page, text);
};

module.exports = { nighttopic };