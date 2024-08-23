const {SlashCommandBuilder} = require("discord.js");

//
// 這裡不需要動
//

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`reloadcommands`)
        .setDescription("重新載入指令的程式碼")
        .addStringOption(opt =>
            opt.setName('commandtoreload')
                .setAutocomplete(true)
                .setDescription("要重製的指令")
                .setRequired(false)
        ),
    async execute(interaction){
        const commandName = interaction.options.getString('commandtoreload', true).toLowerCase();
        if (commandName === null || commandName.trim() === "" ) {
            interaction.client.commands.forEach(async command => {
                const path = `./${command.data.name}.js`;
                delete require.cache[require.resolve(path)]
                try{
                    const newcmd = require(path)
                    interaction.client.commands.set(newcmd.data.name, newcmd);
                    await interaction.reply({content:'ok',ephemeral: true})
                }catch(err){ console.log(err);await interaction.reply({content:'failed',ephemeral: true})}
            });
            //require.cache
        }else{
		    const command = interaction.client.commands.get(commandName);
        	if (!command) {
			    return interaction.reply({content:`There is no command with name \`${commandName}\`!`, ephemeral: true});
		    }
            const path = `./${command.data.name}.js`;
            delete require.cache[require.resolve(path)]
            try{
                const newcmd = require(path)
                interaction.client.commands.set(newcmd.data.name, newcmd);
                await interaction.reply({content:'ok',ephemeral: true})
            }catch(err){ console.log(err);await interaction.reply({content:'failed',ephemeral: true})}
        }
    }
}