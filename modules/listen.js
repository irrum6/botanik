const fs = require('fs');
//load data
const datadir = '../data';
const data = require(`${datadir}/playlist.json`);
const controls = require(`${datadir}/playlist.control.json`);
//load modules
const { post } = require('./topic');
const { youtube } = require('./bbcodes');
const { getbbtext } = require('./getbbtext');

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
    const currentLink = data.links[controls.currentIndex];
    if (currentLink.id === controls.lastUsedId) {
        console.log("no new music to post");
        return;
    }
    const id = currentLink.id;
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
    const controlsnew = JSON.stringify(controls)
    fs.writeFileSync(`${datadir}/playlist.control.json`, controlsnew);
    return;
};

module.exports = { listenpost }