# roblox-gameinstance-searcher
Simple node.js program that can tell you (in small games, see limit section) the game instance of a player in a place.

# How does it work
It gets the thumbnail of the requested user, goes through the game instances of the requested place, and compares the thumbnails of the user until one is matched.

# Usage
* Clone the repo: `git clone https://github.com/qinatsu/roblox-gameinstance-searcher.git`
* Install the npm packages: `npm install`
* Run the program with the required args:
```sh
node searchUsernameInGameInstance [username] [placeId] [maxGameInstances] "[loginCookie]" [debug] 
```

`[username]` - Replace with the name of the player you are looking for<br>
`[placeId]` - The place that the program is going to look for the player. Comes after https://www.roblox.com/games/ and ends until /<br>
`[maxGameInstances]` - The number of game instances the program is going to search the player on until it stops.<br>
`[loginCookie]` - .ROBLOSECURITY cookie. It will not be stored anywhere and is just required to be able to use the roblox API<br>
`[debug] (Default: none)` - If specified, the program will log debug information.

# Limit
There is a limit of 125 max instances that the program can go through, this is because after this number the Roblox API will no longer give more game instances even if there are more. So the program will work as long as there are less than 125 game instances in the place.
