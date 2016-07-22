# pokemon-go-api
Pokemon Go API for nodejs

THIS IS A WIP (Work in progress) feel free to help.

## Install
```
npm i -S pokemongo-api-js
```


## Example

```js
import Poke from pokemongo-api-js
```

```js
const Poke = new PokeAPI()
const api = await Poke.login(username, password, location, provider)
let profile = await Poke.GetPlayer() //this returns a object with the user profile


//To call API Direct (Only for advanced usage)
let res = await Poke.Call([ { request: 'GET_PLAYER' } ]) //get profile

```


## Available functions (more to come)

### GetPlayer()
- Returns the Player Object.

```js
profile{
  creation_time: {Number}
  username: {String}
  team: {Number}
  tutorial: {Number/Boolean}
  poke_storage: {String}
  item_storage: {String}
  daily_bonus{
    NextCollectTimestampMs: {Number}
    NextDefenderBonusCollectTimestampMs: {Number}
  }
  currency{
    type: {String}
    amount: {Number}
  }
}
```


### GetInventory()
- Retrives the inventory object.

```js
  inventory_delta{
    pokemon_data : {object}
    item : {object}
    pokedex_entry : {object}
    player_stats : {object}
    player_currency : {object}
    player_camera : {object}
    inventory_upgrades : {object}
    applied_items : {object}
    egg_incubators : {object}
    pokemon_family : {object}

  }
```


### SetLocation(location)
- Set new current location of player.

Input:
***location***: (required) Has to be a object of location:
```js
{
  type: 'name',
  name: 'Times Square'
}
```
OR
```js
{
  type: 'coords',
  latitude: 0,
  longitude: 0,
  altitude: 0,
}
