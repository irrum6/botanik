const options = require('./options.json');
const { colored, font, bold, size } = require('./bbcodes');

const getbbtext = () => {
    if (typeof options.message !== "string") return "";
    if (options.message === "") return "";
    let text = options.message;
    if (options.bold) text = bold(text);
    if (options.font !== "") text = font(text, options.font);
    if (options.size > 0) text = size(text, options.size);
    if (options.color !== "") text = colored(text, options.color);
    return text;
}

module.exports = { getbbtext };