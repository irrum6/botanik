const fs = require('fs');
//load data
const datadir = __dirname.replace("mods", "data");

const data = require(`${datadir}/playlist.json`);
const controls = require(`${datadir}/playlist.control.json`);
//load modules
const { post } = require('../modules/topic');
const { youtube } = require('../modules/bbcodes');
const { getbbtext } = require('../modules/getbbtext');

const listenvideo = (id, options) => {
    if (typeof id !== 'string') throw { message: "youtube: id is not a string" };
    if (id === "") throw { message: "youtube: id is empty" };
    const video = youtube(id);
    let text = getbbtext(options);
    //return
    return video.concat("\n").concat(text);
};

//makepost
const listenpost = async (page, options) => {
    try {
        const currentLink = data.links[controls.currentIndex];
        if (currentLink.id === controls.lastUsedId) {
            throw { message: "no new music to post" };
        }
        const id = currentLink.id;
        options.message = "●";
        let lv = listenvideo(id, options);
        await post(page, lv);
        //icnrease index
        //change last used id
        controls.currentIndex = ++controls.currentIndex;
        //stay in bounds
        if (controls.currentIndex >= data.links.length) {
            controls.currentIndex = data.links.length - 1;
        }
        controls.lastUsedId = id;
        //write then to file
        const controlsnew = JSON.stringify(controls);
        const controlsfile = `${datadir}/playlist.control.json`;
        fs.writeFileSync(controlsfile, controlsnew);
        return;
    }
    catch (err) {
        console.error(err.message);
    }

};

module.exports = { listenpost }