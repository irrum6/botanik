const GEO = 'input[name="geo"]';

const timeStamp = () => {
    const nd = new Date();

    const h = String(nd.getHours()).padStart(2, '0');
    const m = String(nd.getMinutes()).padStart(2, '0');
    const s = String(nd.getSeconds()).padStart(2, '0');

    return `${h}:${m}:${s}`;
}

const post = async (page, text) => {
    if (typeof text !== 'string') throw { message: "text not a string" };
    if (text.length < 31) {
        console.log("text is too short");
        //enlarge
        text = text.concat('\n').concat(".".repeat(31));
    }
    //disable geokeyboard
    await page.waitFor(GEO);
    await page.waitFor(1000);
    await page.click(GEO);

    await page.waitFor('textarea');
    await page.focus('textarea');
    await page.type('textarea', text);
    await page.click('input[type=submit]');

    console.log(`post @${timeStamp()}`);

    return;
}

module.exports = { post }