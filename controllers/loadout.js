const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const axios = require('axios').default;
const Promise = require("bluebird");

const client = require("../constants/constant.js").client;
const prefix = require("../constants/constant.js").prefix;
const API_URL = require("../constants/constant.js").API_URL;
const errorMessage = require("../helpers/validation.js").errorMessage; 
const chunk = require("../helpers/chunker"); 

exports.getWeaponLoadouts = async(msg) => {
    msg.content = msg.content.replace(`${prefix} weapon `,'');

    const weaponName = msg.content.trim().toLowerCase(); 
    const result = await getWeaponLoadoutsData(weaponName); 
    let thread = msg.channel.threads.cache.find(x => x.name === weaponName.toUpperCase());
    let arrayIdentifier = 0; 

    if(thread){
      await thread.members.add(msg.author.id); 
      errorMessage(
        msg,
        "This thread already exists",
        "Please check the open threads in this channel. This thread will be assigned to you."
      )
      return true; 
    }
    
      const threadTitle = weaponName.toUpperCase(); 
      thread = await msg.channel.threads.create({
        name: threadTitle,
        autoArchiveDuration: 60,
        reason: `The following streamers have a loadout with ${weaponName}`
      });
      //thread = msg.channel.threads.cache.find(x => x.name === threadTitle);

    let selectMenu = new SelectMenuBuilder().setCustomId('select').setPlaceholder('Nothing selected')

    const chunks = await chunk(result, 60);

    Promise.map(chunks, async function(chunk) {
      let element = chunk.toString(); 
      element = element.split(',').join('\n');
      thread.send(element); 

    }).then(async function() {
      await thread.members.add(msg.author.id); 
    
      thread.send("Loaded all streamers... ")
      .then(function(message){ 
        message.react('😄');
        msg.reply("Your thread has been assigned");
      });
    });

    

    // for (let index = 0; index < result.length; index++) { // result.length to replace 5
    //   selectMenu.addOptions(
    //     {
    //       label: result[index].Channel,
    //       description: 'This is a description',
    //       value: result[index].Channel,
    //     }
    //     );
    //   }
      
    // let row = new ActionRowBuilder().addComponents(selectMenu);

    // msg.channel.send({
    //   content: `Streamers with ${weaponName} loadouts found`,
    //   components: [row],
    //   emphemeral: true
    // });

   

    
}

exports.getWeaponLoadoutByStreamer = async(msg) =>{
  const string = msg.split(" "); 

  const streamer = string[1].split(":")[1]; 

  const weapon = string[2].split(":")[1]; 

  if(string[1].includes("streamer") && string[2].includes("weapon") ){
    // Fetch API data for loadout of specific weapon and streamer
  } else{
    // Return error validation message to user 
  }
}


async function getWeaponLoadoutsData(weaponName){

    return new Promise((resolve, reject) => {

        axios.post(`${API_URL}/api/loadout.php`, {
            route: 'searchWeapon',
            weaponName: weaponName,
          })
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            reject(error);
          });

    });

    
}



function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}
