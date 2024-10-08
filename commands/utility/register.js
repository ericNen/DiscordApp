const { SlashCommandBuilder } = require("discord.js");
const path = require('node:path');
const CoreApp = require("../../CoreApp");
var NumberCount = 0;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("register")
        .setDescription("參加"),
    async execute(interaction){
        var Name = interaction.user.globalName;
        if (CoreApp.Judge === Name) {
            CoreApp.Judge = null;
        }
        for (let I of CoreApp.Names) {
            if(I.UserName === Name){ 
                await interaction.reply(`重複`);
                return;
            }
        }
        CoreApp.Names.push({UserName : Name});
        await interaction.reply(`Registered ${Name}`);
    },
};