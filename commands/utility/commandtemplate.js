const { SlashCommandBuilder } = require("discord.js");
const CoreApp = require("../../CoreApp");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("command_name")//只能小寫英文字母跟_-這種符號，不能有空格
        .setDescription("指令的說明")//可以是任何符號、大小寫、中文
        ,
    async execute(interaction){
        //指令輸入後要執行的函式
        var Name = interaction.user.globalName;
        //interaction的內容在Base.js的client.on()函式裡用autoclomplete找的到
        await interaction.reply(`回覆`);//這是回覆的內容，一定要回覆什麼東西不然會顯示no response
    },
};
// 有新指令時季的在DiscordApp或你新命名的名子的資料夾的powershell打 node deploy-commands.js