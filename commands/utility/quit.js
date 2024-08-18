const { SlashCommandBuilder } = require("discord.js");
const path = require('node:path');
const CoreApp = require("../../CoreApp");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quit")
        .setDescription("退出遊戲"),
    async execute(interaction){
        var Name = interaction.user.globalName;
        if (CoreApp.Judge === Name) {
            CoreApp.Judge = null;
        }
        for (let I of CoreApp.Names) {
            if(I.UserName === Name){ 
                CoreApp.Names = CoreApp.Names.filter((i)=>{return i !== I})
            }
        }
        await interaction.reply(`${Name}退出遊戲`);
    },
};