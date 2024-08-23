const {ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, GuildTextThreadManager, Guild, Client} = require("discord.js")


module.exports = {
    IsStartCmdUsed : false, // /start指令正在被使用過就是true
    Client: null, //
    Judge: null,
    JudgeID: null,
    
    //人數
    Cit : 0, //平民
    Wol : 0, //狼
    Wit : 0, //
    Pro : 0, //預言
    Hun : 0, // 
    WhW : 0, //白狼
    BlW : 0, //黑狼
    DeK : 0, //惡靈
    Gua : 0, //守衛
    CurrentCount : 0,
    Names : [],
    RNN : NumNameRolePair,
    Reset : ()=>{
        //歸零
        Cit = 0;
        Wol = 0;
        Wit = 0;
        Pro = 0;
        Hun = 0;
        WhW = 0;
        BlW = 0;
        DeK = 0;
        Gua = 0;
        CurrentCount = 0;
    },
    StartGame : StartThisGame
}
//要用module.export內的內容需要加上"this"
var Roles = ["平民","狼人","女巫","預言家","獵人","白狼王","黑狼王","惡靈騎士","守衛"]
var RoleCount = [];
var curr = 0;
var NumNameRolePair = [];
var Count = 0; //多少人
function StartThisGame() {
    var RoleNumPair = [this.Cit,this.Wol,this.Wit,this.Pro,this.Hun,this.WhW,this.BlW,this.DeK,this.Gua];
    //ci平民 wo狼人 wi女巫 pr預言家 hu獵人 ww白狼王 bw黑狼王 de惡靈騎士 gu守衛
    for (let i of RoleNumPair) {
        //i是角色人數
        console.log(`i = ${i}`)
        if(i != 0){
            for (let index = 1; index < i + 1; index++) {
                Count++;
                console.log(Count + "aaa")
                RoleCount.push(Roles[curr])
            }
        }
        curr++;//current 是現在在分配的角色 是int因為對應到Roles[]
    }
    console.log(this.Names)
    console.log(`Names length   ${this.Names.length}`)
    if (RoleCount.length != this.Names.length) {
        return "人數錯誤";
    }
    for(let i of RoleCount){
        //隨機分配
        var Person = this.Names[getRandomInt(this.Names.length)-1]//-1因為array是從0開始不是1
        NumNameRolePair.push({Role:i, PlayerName: Person.UserName})
        Person = this.Names.filter((I)=>{return I !== Person})//移除重複
    }
    return NumNameRolePair;
}

function getRandomInt(max) {
   var Ran = Math.ceil(Math.random() * max);
   if (Ran === 0) {
       Ran = 1;
   }
   return Ran;//最小是1
}