const Discord = require("discord.js");
const fetch = require("node-fetch")
const config = require("./config.json");

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
})

const prefix = "*";

client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();


    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    } 
    
    else if (command === "sum") {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.reply(`The sum of all the arguments you provided is ${sum}!`);
    } 
    
    else if (command === "price") {
        return fetch("https://api.coinpaprika.com/v1/tickers/pgo-pengolincoin/")
            .then(res => {
                return res.json()
            })
            .then(data => {
                //console.log(data)
                const pgoPrice = parseFloat(data.quotes.USD.price)
                message.reply(`PGO Price: $${pgoPrice}`);
            })
    }

    else if (command === "vol24h") {
        return fetch("https://api.coinpaprika.com/v1/tickers/pgo-pengolincoin/")
            .then(res => {
                return res.json()
            })
            .then(data => {
                //console.log(data)
                const vol24h = parseFloat(data.quotes.USD.volume_24h)
                message.reply(`PGO volume 24h: $${vol24h}`);
            })
    }

    else if (command === "mc") {
        return fetch("https://api.coinpaprika.com/v1/tickers/pgo-pengolincoin/")
            .then(res => {
                return res.json()
            })
            .then(data => {
                //console.log(data)
                const mc = parseFloat(data.quotes.USD.market_cap)
                message.reply(`PGO Market Cap: $${mc}`);
            })
    }

    else if (command === "cs") {
        return fetch("https://api.coinpaprika.com/v1/tickers/pgo-pengolincoin/")
            .then(res => {
                return res.json()
            })
            .then(data => {
                //console.log(data)
                const cs = parseFloat(data.circulating_supply)
                message.reply(`PGO Circulating Supply: ${cs}`);
            })
    }

    else if (command === "ms") {
        return fetch("https://api.coinpaprika.com/v1/tickers/pgo-pengolincoin/")
            .then(res => {
                return res.json()
            })
            .then(data => {
                //console.log(data)
                const ms = parseFloat(data.max_supply)
                message.reply(`PGO Max/Total supply: ${ms}`);
            })
    }

    else if (command === "mn") {
        return fetch("https://blockexplorer.pengolincoin.xyz/api/getmasternodecount")
            .then(res => {
                return res.json()
            })
            .then(data => {
                //console.log(data)
                const pgoMn = parseFloat(data.total)
                message.reply(`PGO Master Nodes: ${pgoMn}`);
            })
    }

    else if (command === "diff") {
        return fetch("https://blockexplorer.pengolincoin.xyz/api/getdifficulty")
            .then(res => {
                return res.json()
            })
            .then(data => {
                //console.log(data)
                const pgoDiff = parseFloat(data)
                message.reply(`PGO Difficulty: ${pgoDiff}`);
            })
    }

    else if (command === "bc") {
        return fetch("https://blockexplorer.pengolincoin.xyz/api/getblockcount")
            .then(res => {
                return res.json()
            })
            .then(data => {
                //console.log(data)
                const pgoBc = parseFloat(data)
                message.reply(`PGO Block Count: ${pgoBc}`);
            })
    }

    else if (command === "help") {
        message.reply(`
            CoinPaprika and PGO Blockexplorer API info - Use the following commands (with * prefix) :
            *price: get PGO price
            *vol24h: PGO volume 24h in $
            *mc: PGO Market Cap in $
            *cs: PGO Circulating Supply
            *ms: PGO Max/Total Supply
            *mn: PGO Total Master Nodes #
            *diff: PGO Network Difficulty
            *bc: PGO Block Count (Height)
        `);
    }

});

client.login(config.BOT_TOKEN);