# dm-backup
Simple node.js utility to backup a discord DM (or channel), tested to work in DMs with over 100k messages and ~5k attachments.


# Requirements
* NPM & Node v12+
* Git

# Cloning
```bash
git clone https://github.com/qinatsu/dm-backup.git
cd dm-backup
npm install
# Now you can access "node index".
```
# Usage
## 1. Get messages and save them into a JSON file
### This process might take some time, don't close the program until it's done.
```bash
node index -token "m.yUs3r.T0ken" -id "235088799074484224"
```

-token | Your user token, required to access the channels and DMs<br>
-id  | ID of the user or channel that you want a backup of.<br><br>

This will result in a file with the format: ID-dd-mm-yyyy.json.

## 2. Turn the JSON file into a browsable HTML file
```bash
node index -tohtml -location 235088799074484224-26-9-2020.json
```

-location | Location of the JSON file.<br><br>

This will result in a file with the format: location.html

# To Do
* Ability to backup attachments too.
* Better optimization of the output.
* HTML output that looks better.