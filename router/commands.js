
const prefix = require("../constants/constant.js").prefix;
const loadoutController = require("../controllers/loadout"); 
const utilController = require("../controllers/utils"); 

function getCommand(msg){
    if(msg.author.bot) return false; 

    if ( msg.content.toLowerCase().startsWith(prefix + " weapon") ){
        loadoutController.getWeaponLoadouts(msg); 

    }

    if (msg.content.startsWith(`${prefix} clear`)) {
        utilController.clear(msg);
    } 

    

}

exports.get = getCommand; 