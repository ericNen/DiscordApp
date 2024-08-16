const { SlashCommandBuilder } = require("discord.js");
const path = require('node:path');
const CoreApp = require("../../CoreApp");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("start")
        .setDescription("開始"),
    async execute(interaction){
        console.clear();
        var Players = "";
        for (let I of CoreApp.Names) {
            CoreApp.CurrentCount = CoreApp.CurrentCount + 1;
            Players = Players + `${CoreApp.CurrentCount} : ${I.UserName}\n`
        }
        if (CoreApp.CurrentCount === CoreApp.Names.length) {
            Players = Players + `Total : ${CoreApp.CurrentCount} players`
            await interaction.reply(Players);
        }else{ await interaction.reply(' start.js:20行  錯誤')}
        CoreApp.Names.length = 0;
        CoreApp.CurrentCount = 0;
    },
};