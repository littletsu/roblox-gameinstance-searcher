const fetch = require('node-fetch');
const username = process.argv[2];
const placeId = process.argv[3];
const maxInstancesToGoThrough = process.argv[4] || 1;
const robloSecurity = process.argv[5];
const debug = process.argv[6] || false;
const getJson = async (url, cookie=false) => {
    let headers = {};
    if(cookie) {
        // .ROBLOSECURITY
        headers['Cookie'] = `.ROBLOSECURITY=${robloSecurity};`
    }
    let req = await fetch(url, {headers});
    let json = await req.json();
    return json;
}
const endpointUser = "https://api.roblox.com/users/get-by-username?username=";
const endpointThumbnail = "https://thumbnails.roblox.com/v1/users/avatar-headshot?size=48x48&format=png&userIds=";
const endpointGameInstances = (eplaceId, index=0) => `https://www.roblox.com/games/getgameinstancesjson?placeId=${eplaceId}&startIndex=${index}&_=${Date.now()}`;
const d = (...args) => {
    if(debug) console.log(...args);
}
(async () => {
    let user = await getJson(endpointUser + username);
    if(user.success === false) {
        console.log(user.errorMessage)
    } else {
        // 295551769
        let thumbnail = await getJson(endpointThumbnail + user.Id);
        let userThumbnailURL =  thumbnail.data[0].imageUrl;
        d(`Fetched ${user.Username} avatar headshot: ${userThumbnailURL}`)
        let i = 0;
        const asyncForEach = async () => {
            if(i <= maxInstancesToGoThrough-1) {
                d('Searching into instance ', i, 'Start Index: ', i*10)
                getJson(endpointGameInstances(placeId, i*10), true).then(gameInstances => {
                    if(gameInstances.Collection.length < 1) {
                        finished('Reached instances limit. (' + i + ')')
                    } else {
                        gameInstances.Collection.forEach(gameInstance => {
                            d('Found instance with ', gameInstance.PlayersCapacity)
    
                            gameInstance.CurrentPlayers.forEach(player => {
                                if(player.Thumbnail.Url == userThumbnailURL) {
                                    console.log(`Found user on an instance with GUID ${gameInstance.Guid}, join script: ${gameInstance.JoinScript}`)
                                }
                            })
                        })
                        asyncForEach();
                    }
                    
                })
                
            } else {
                finished();
            }
            i++
        }
        const finished = (m='') => {
            console.log('Done. ' + m)
        }
        asyncForEach();
    }
})()

