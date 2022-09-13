exports.clear = async(msg) =>{
    msg.delete();
    const fetched = await msg.channel.messages.fetch();
    msg.channel.bulkDelete(fetched);
}