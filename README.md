# roblox-gameinstance-searcher
Simple node.js program that can tell you (in small games, see [limit](#limit) section) the game instance of a player in a place and has been tested to find game instances on games with around 1k players.

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

# Join the found game
If the program was able to find a game, it should look something like this in the console: 
```
Found user on an instance with GUID e70b7207-a49d-4b18-a0db-f99639d10a1d, join script: Roblox.GameLauncher.joinGameInstance(4314032456, "e70b7207-a49d-4b18-a0db-f99639d10a1d")
```
* To join, copy the join script (`Roblox.GameLauncher.joinGameInstance(4314032456, "e70b7207-a49d-4b18-a0db-f99639d10a1d")` in this case) 
* Go to the place page in roblox
* If supported in your browser, type in the search bar (with the place page focused): `javascript:theJoinScript`, example: `javascript:Roblox.GameLauncher.joinGameInstance(4314032456, "e70b7207-a49d-4b18-a0db-f99639d10a1d")`
* If not, open the developer tools and execute the join script from there.

# Limit

## Game Instances
There is a limit of 125 max instances that the program can go through, this is because after this number the Roblox API will no longer give more game instances even if there are more. So the program will work as long as there are less than 125 game instances in the place.

## Players
If a player in a game instance has the same avatar as the requested user, there is no way to determine if the user is correct, so there may be more than one place found.
