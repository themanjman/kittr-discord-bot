
exports.get = async (interaction) =>{
	const {commandName, options} = interaction

	if(commandName ==='findbattlenet') {
		interactionController.findbattlenet(interaction, options); 
	}
	else{
		await interaction.reply({ content: `You selected ${interaction.values[0]}` });
	}
}