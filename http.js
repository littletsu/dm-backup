const fetch = require('node-fetch');
let token = null;

module.exports.setToken = tok => {
    token = tok;
};
module.exports.post = async (endpoint, postData, authRequired = true) => {
    let headers = { 'content-type': 'application/json' };
    if (authRequired) {
        headers = Object.assign({ authorization: token }, headers);
    }

    const req = await fetch(`https://discord.com/api/v8/${endpoint}`, {
        method: 'post',
        body: JSON.stringify(postData),
        headers: headers,
    });
    const json = await req.json();
    return json;
};

module.exports.get = async (endpoint, authRequired = true) => {
    let headers = { 'content-type': 'application/json' };
    if (authRequired) {
        headers = Object.assign({ authorization: token }, headers);
    }

    const req = await fetch(`https://discord.com/api/v8/${endpoint}`, {
        method: 'get',
        headers: headers,
    });
    const json = await req.json();
    return json;
};
