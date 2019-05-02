const GEO = 'input[name="geo"]';

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

    const nd = new Date();
    console.log(`post @${nd.getHours()}:${nd.getMinutes()}`);

    return;
}

module.exports = { post }