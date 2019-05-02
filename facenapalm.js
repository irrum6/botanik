const { post } = require('./topic');
const options = require('./options.json');
const { getbbtext } = require('./getbbtext');

const facenapalm = async (page, user) => {
    options.message = user;
    let text = getbbtext(options);
    text = text.concat('\n:facepalm:')
    await post(page, text);
};

module.exports = { facenapalm };