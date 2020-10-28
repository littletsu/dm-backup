const commands = require('./commands');
const http = require('./http');
const fs = require('fs');
const endpoint = (channel, before=null, limit=50) => `channels/${channel}/messages?${before ? `before=${before}` : ''}&limit=${limit}`

const displayHelp = (m) => {
    console.log(`${m ? m + '\n\n' : ''}dm-backup: Simple node.js utility to backup a discord DM\nHelp:\n${commands.sort((a,b) => (a.option > b.option) ? 1 : ((b.option > a.option) ? -1 : 0))
        .map(cmd => `\t${cmd.option} ${cmd.requiresArgs ? cmd.displayArgs + ' ' : ''}- ${cmd.description}`).join('\n')}`);
    process.exit();
}

String.prototype.escapeHTML = function() {
    return this.//from w  w  w  .  jav  a2  s.c  o  m
      replace(/&/g, "&amp;").
      replace(/</g, "&lt;").
      replace(/>/g, "&gt;").
      replace(/\"/g, "&quot;");
};

if(process.argv.length <= 2) {
    displayHelp('Too few arguments.')
} else {
    let argsObj = {};
    process.argv.forEach((arg, i) => {
        let argument = arg.toLowerCase();
        let command = commands.find(command => (command.option === argument) || (command.aliases.indexOf(argument) !== -1));
        if(command) {
            if(command.requiresArgs) {
                if(process.argv[i+1] ? process.argv[i+1].startsWith('-') : true) {
                    argsObj[command.setVar] = null;  
                } else {
                    argsObj[command.setVar] = process.argv[i+1] || null;
                }
            } else {
                argsObj[command.setVar] = true;
            }
        }
    })
    if(argsObj.toHtml) {
        let file = JSON.parse(fs.readFileSync(argsObj.path));
        let html = "<!DOCTYPE html>\n<html><head></head><body>";
        file.forEach(m => {
            if(m.type === 0) {
                html+=`${m.timestamp} | ${m.author.username}#${m.author.discriminator}: ${m.content.escapeHTML()}${m.attachments.length !== 0 ? ` <button onclick="${m.attachments.map(att => `window.open('${att.url}')"`).join(';')}\">Open attachment(s)</button>` : ""}<br>`
            }
        })
        html+="</body></html>";
        fs.writeFileSync(argsObj.path + ".html", html);
    } else {
        if(!argsObj.token) return displayHelp('Token is required.');
        http.setToken(argsObj.token);
        let msgs = [];
        const start = async (before=null) => {
            let history = await http.get(endpoint(id, before, 100));
            msgs = msgs.concat(history);
            console.log(history.length, before)
            if(history.length === 100) {
                start(history[history.length-1].id);
            } else {
                console.log(`Fetched ${msgs.length} messages.`)
                let f = new Date();
                fs.writeFileSync(argsObj.path || __dirname + `/${id}-${f.getDate() + "-"+ f.getMonth()+ "-" +f.getFullYear()}.json`, JSON.stringify(msgs))
            }
        }
    
        let id = argsObj.id;
        if(!argsObj.type || argsObj.type === "user") {
            http.post(`users/@me/channels`, {
                recipient_id:id
            }, true).then(dm => {
                if(!dm.id) return displayHelp('Could not find user with ID ' + id + ", " + dm.message);
                id = dm.id;
                start()
            }).catch(err => {
                displayHelp('Unexpected error: ' + err);
            })
            
        } else if(argsObj.type === "channel") {
            start();
        }
    
    }
    
    
    
}