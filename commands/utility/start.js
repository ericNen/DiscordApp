const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, 
    StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType,
    GuildTextThreadManager,ChannelType
    }
     = require("discord.js");
const path = require('node:path');
const CoreApp = require("../../CoreApp");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("start")
        .setDescription("開始"),
    async execute(interaction){
        if (CoreApp.IsStartCmdUsed) {
            return interaction.reply({content: "有人使用start了", ephemeral: true});
        }
        const channel = await CoreApp.Client.channels.fetch('1273243740512981047')
        //這個channel是Server For Testing App伺服器中的general頻道，之後換伺服器或頻道時需要改
        const thread = channel.threads.cache.find(x => x.name === 'testthread');
        //x的類型是thread，thread有點像聊天室，在find(x => x.name === '名稱')中
        //x是一個變數名稱，自己取的，他會被拿來代替find找到的東西，x的條件是 x的屬性
        //name叫做'testthread'(我取這個名字是因為test thread)，符合的話會傳回x，然後thread就會 = x
        if (thread != null) {
            await thread.delete();
            //刪除這個thread
        }
        CoreApp.Reset();
        var Name = interaction.user.globalName;
        var Players = "";
        for (let I of CoreApp.Names) {
            CoreApp.CurrentCount = CoreApp.CurrentCount + 1;
            Players = Players + `${CoreApp.CurrentCount} : ${I.UserName}\n`
            // `\n`代表換行
        }
        if (CoreApp.CurrentCount === CoreApp.Names.length) {
            Players = Players + `共${CoreApp.CurrentCount}位玩家\n ${CoreApp.Judge} 是法官`
        }
        await interaction.reply(Players);
        
        const CitNum = new StringSelectMenuBuilder()
            .setCustomId('平民')
            .setPlaceholder('平民人數');
        for (let i = 0; i < 6; i++) {
            const Opt = new StringSelectMenuOptionBuilder()
                .setLabel(i.toString())
                .setValue(i.toString());
                if (i === 0) {
                    Opt.setDefault(true);
                }
            CitNum.addOptions(Opt);
        }
        const WerewolfNum = new StringSelectMenuBuilder()
            .setCustomId('狼人')
            .setPlaceholder('狼人人數');
        for (let i = 0; i < 6; i++) {
            const Opt = new StringSelectMenuOptionBuilder()
                .setLabel(i.toString())
                .setValue(i.toString());
                if (i === 0) {
                    Opt.setDefault(true);
                }
            WerewolfNum.addOptions(Opt);
        }
        const SetCit = new ActionRowBuilder()
        const SetWo = new ActionRowBuilder()
        SetCit.addComponents(CitNum);
        SetWo.addComponents(WerewolfNum);

        const SetWit = new ActionRowBuilder();
        const SetPr = new ActionRowBuilder();
        const SetHu = new ActionRowBuilder();
        const SetWW = new ActionRowBuilder();
        const SetBW = new ActionRowBuilder();
        const SetDe = new ActionRowBuilder();
        const SetGu = new ActionRowBuilder();

        const SingleRole = ["女巫","預言家","獵人","白狼王","黑狼王","惡靈騎士","守衛"]
        for (let r of SingleRole) {
            const Builder = new StringSelectMenuBuilder()
                .setCustomId(r)
            const no = new StringSelectMenuOptionBuilder()
                .setLabel('無')
                .setValue('0')
                .setDefault(true);
            const one = new StringSelectMenuOptionBuilder()
                .setLabel('有')
                .setValue('1');
            Builder.addOptions(no);
            Builder.addOptions(one);
            switch (r) {
                case '女巫':
                    SetWit.addComponents(Builder);
                    break;
                case '預言家':
                    SetPr.addComponents(Builder);
                    break;
                case '獵人':
                    SetHu.addComponents(Builder);
                    break;
                case '白狼王':
                    SetWW.addComponents(Builder);
                    break;
                case '黑狼王':
                    SetBW.addComponents(Builder);
                    break;
                case '惡靈騎士':
                    SetDe.addComponents(Builder);
                    break;
                default:
                    SetGu.addComponents(Builder);
                    break;
            }
        }
               
        const confirmBut = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('確認')
			.setStyle(ButtonStyle.Success)
        ;
        const Confirm = new ActionRowBuilder()
        Confirm.addComponents(confirmBut);
        // ephemeral: true 代表只有打指令的人看得到回覆
        // components一次最多只能5個所以要分開

        //第一次
        var GameConfig1 = await interaction.followUp({
            content: '平民、狼人、女巫、預言、獵人',components: [SetCit,SetWo,SetWit,SetPr,SetHu] ,ephemeral: true
        })
        //第二次
        var GameConfig2 = await interaction.followUp({
            content: '白狼王、黑狼王、惡靈、守衛',components: [SetWW,SetBW,SetDe,SetGu] ,ephemeral: true
        })
        //確認按鈕
        var Startt = await interaction.followUp({
            components: [Confirm] ,ephemeral: true
        })

        const collector1 = GameConfig1.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });
        collector1.on('collect', async i => {
            //這裡蒐集第一次回覆的選單中選擇的東西
            console.log(`${i.customId} ${i.values[0]}`);
	        const selection = i.values[0];
            switch (i.customId) {
                case '平民':
                    CoreApp.Cit = Number(selection);
                    i.Set
                    break;
                case '狼人':
                    CoreApp.Wol = Number(selection);
                    break;
                case '女巫':
                    CoreApp.Wit = Number(selection);
                    break;
                case '預言家':
                    CoreApp.Pro = Number(selection);
                    break;
                case '獵人':
                    CoreApp.Hun = Number(selection);
                    break;
                default:
                    break;
            }
	        await i.reply('a');
            await i.deleteReply();
        });

        const collector2 = GameConfig2.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });
        collector2.on('collect', async i => {
            //這裡蒐集第二次回覆的選單中選擇的東西
            console.log(`${i.customId} ${i.values[0]}`);
	        const selection = i.values[0];
            switch (i.customId) {
                case '白狼王':
                    CoreApp.WhW = Number(selection);
                    break;
                case '黑狼王':
                    CoreApp.BlW = Number(selection);
                    break;
                case '惡靈騎士':
                    CoreApp.DeK = Number(selection);
                    break;
                default:
                    CoreApp.Gua = Number(selection);
                    break;
            }
	        await i.reply('a');
            await i.deleteReply();
        });
        


        const Resp = await Startt.awaitMessageComponent();
        if(Resp.customId === "confirm"){
            //這裡偵測確認鍵被按下
            console.log("Confirmed");
            const Re = CoreApp.StartGame();
            var msg = "";
            if (Re === "人數錯誤") {
                msg = msg + "人數錯誤";
            }else{
                for(let i of Re){
                    msg = msg + `${i.PlayerName} => ${i.Role}\n`
                }
            }
            if (msg === "" || msg === null) {
                msg = "錯誤"
            }
            await Resp.reply(msg);
            //const channel = await CoreApp.Client.channels.fetch('1273243740512981047')
            //channel.send({content: "Message"})

            //嘗試創造一個聊天室，之後會需要分好幾個因為有不同角色
            const t = await channel.threads.create({
                name: 'testthread',
                ChannelType : ChannelType.PrivateThread,
                reason: 'test',
            })

            t.setArchived(false);
            t.setLocked(true);
            console.log(Re);
        }
    },
};