const { SlashCommandBuilder } = require("discord.js");
const CoreApp = require("../../CoreApp");

//要創造新指令時複製這一個檔案在同一個資料夾(commands\utility)才會被deploy-commands.js找到
//要改檔案名稱!!

//CoreApp是用來當中繼站儲存公共變數的檔案，你可以呼叫CoreApp中module.export裡的變數
module.exports = {
    data: new SlashCommandBuilder()
        .setName("command_name")//只能小寫英文字母跟_-這種符號，不能有空格
        .setDescription("指令的說明")//可以是任何符號、大小寫、中文
        ,
    async execute(interaction){
        //指令輸入後要執行的函式
        var Name = interaction.user.globalName;
        //interaction的內容在Base.js的client.on()函式裡用autoclomplete找得到
        await interaction.reply(`回覆`);//這是回覆的內容，一定要回覆什麼東西不然會顯示no response
    },
};
// 有新指令時記得在DiscordApp(或新命名的名字)的資料夾的powershell(用cd可以改powershell的資料夾位置)
// 輸入 node deploy-commands.js