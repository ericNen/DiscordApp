const { SlashCommandBuilder } = require("discord.js");
const path = require('node:path');
const CoreApp = require("../../CoreApp");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("judge")
        .setDescription("當法官"),
    async execute(interaction){
        var Name = interaction.user.globalName;
        if (CoreApp.Judge == null) {
            CoreApp.Judge = Name;
            for (let I of CoreApp.Names) {
                if(I.UserName === Name){
                    CoreApp.Names = CoreApp.Names.filter((i)=>{ return i !== I})
                }
            }
            await interaction.reply(`${Name} 是法官`);
        }else{
            await interaction.reply(`${CoreApp.Judge} 已經是法官`);
        }
    },
};