const VALID_FONTS = ["Arial", "Times", "Courier", "Impact", "Geneva", "Optima"];
const VALID_COLORS = ["Black", "Red", "Green", "Blue", "Orange", "Purple", "Yellow", "Teal", "Peru"];
const MAX_FONT_SIZE = 21;
const MIN_FONT_SIZE = 1;
Object.freeze(VALID_FONTS);
Object.freeze(VALID_COLORS);

const colored = (text, color) => {
    if (typeof text !== 'string') throw { message: "not a string" };
    if (text === "") throw { message: "empty text" };
    if (!VALID_COLORS.includes(color)) {
        // log about invalid color and return noncolor text instead error
        console.log("not a valid color");
        return text;
    }
    return `[COLOR=${color}]${text}[/COLOR]`;
};

const font = (text, font) => {
    if (typeof text !== 'string') throw { message: "not a string" };
    if (text === "") throw { message: "empty text" };
    if (!VALID_FONTS.includes(font)) {
        // log about invalid font and return simple text instead error
        console.log("not a valid font");
        return text;
    }
    return `[FONT=${font}]${text}[/FONT]`;
}
const bold = (text) => {
    if (typeof text !== 'string') throw { message: "not a string" };
    if (text === "") throw { message: "empty text" };
    return `[B]${text}[/B]`;
}
const size = (text, size) => {
    if (typeof text !== 'string') throw { message: "not a string" };
    if (text === "") throw { message: "empty text" };
    if (typeof size !== 'number') throw { message: "not a number" };
    if (size > MAX_FONT_SIZE) size = 21;//silent correction
    if (size < MIN_FONT_SIZE) size = 1; //also a silent correction
    return `[SIZE=${size}]${text}[/SIZE]`;
};

const youtube = (id) => {
    if (typeof id !== 'string') throw { message: "youtube id is not a string" };
    if (id === "") throw { message: "youtube id is an empty string" };
    return `[YOUTUBE]${id}[/YOUTUBE]`;
};

const test = (text) => {
    if (typeof text !== 'string') throw { message: "not a string" };
    if (text === "") throw { message: "empty text" };
    //bolded
    text = bold(text);
    //fonted
    text = font(text, 'Arial');
    //resized
    text = size(text, 7);
    //colored
    text = colored(text, 'Peru');
    console.log(text);
}

//passes test
//test("ara");

module.exports = { colored, font, bold, size, youtube };