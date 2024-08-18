const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const path = require('node:path');
const CoreApp = require("../../CoreApp");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("start")
        .setDescription("開始"),
    async execute(interaction){
        var Players = "";
        for (let I of CoreApp.Names) {
            CoreApp.CurrentCount = CoreApp.CurrentCount + 1;
            Players = Players + `${CoreApp.CurrentCount} : ${I.UserName}\n`
        }
        if (CoreApp.CurrentCount === CoreApp.Names.length) {
            Players = Players + `共${CoreApp.CurrentCount}位玩家\n ${CoreApp.Judge} 是法官`
            await interaction.reply(Players);
        }
        
        CoreApp.StartGame(CoreApp.Names)
        //CoreApp.Names.length = 0;
        //CoreApp.CurrentCount = 0;
    },
};