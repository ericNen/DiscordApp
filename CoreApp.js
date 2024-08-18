const Discordjs = require("discord.js")

module.exports = {
    Judge: null,
    JudgeID: null,
    GameRole : ["平民","狼人","女巫","預言家","獵人","白狼王","黑狼王","惡靈騎士","守衛"],
    CurrentCount : 0,
    Names : [],
    RNN : NumNameRolePair,
    StartGame : StartThisGame
}

var NumNameRolePair = [];

function StartThisGame(NameList) {
    //ci平民 wo狼人 wi女巫 pr預言家 hu獵人 ww白狼王 bw黑狼王 de惡靈騎士 gu守衛
    var RoleCount = [{ci:0},{wo:0},{wi:0},{pr:0},{hu:0},{ww:0},{bw:0},{de:0},{gu:0}];
    var Everyrole = [];
    for (var item of RoleCount) {
        item
    }
    for (let i = 1; i < 7; i++) {
        NumNameRolePair.push({
            Num: i,
            Name: NameList[getRandomInt(6)-1],
            Role: "a"
        })
    }
}

function getRandomInt(max) {
   var Ran = Math.ceil(Math.random() * max);
   if (Ran === 0) {
       Ran = 1;
   }
   return Ran;
}
/*
function SetRole(state) {
    if (state === "normal") {
        console.log("normal");
    }
}
    */