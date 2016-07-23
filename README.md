# pokemon-go-api
Pokemon Go API for nodejs

THIS IS A WIP (Work in progress) feel free to help.

## Install
```
npm i -S github:stoffern/pokemon-go-api
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

# To-Do:
- [x] Login as pokemon trainer + token
- [x] Login over google + token
- [x] API connector
- [X] Make all calls available in functions
- [ ] Add proxy options to requests
- [X] Run to pokestops
- [X] Farm specific area for pokestops
- [X] Human walking logic
- [X] Catch Pokemon automatically
- [ ] Drop items when bag is full
- [ ] Scan your inventar for XYZ CP pokemon and release them
- [ ] Pokemon catch filter
- [ ] Hatch eggs
- [ ] Incubate eggs
- [ ] Evolve pokemons
- [ ] Use candy
- [x] Clean code
- [ ] Fully automate this script



## Available functions (more to come)


### FortRecallPokemon()  //More to come
### FortDeployPokemon()  //More to come
### FortDetails()  //More to come
### FortSearch()  //More to come
### CatchPokemon()  //More to come
### EncounterPokemon()  //More to come
### ReleasePokemon()  //More to come
### UseItemPotion()  //More to come

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

##Player functions

### Poke.player.coords()
- Returns array of coords: [latitude, longitude]

### Poke.player.coords()
- Returns array of coords

### Poke.player.profile()
- Returns player profile

### Poke.player.createdDate()
- Returns account creation date (dddd, MMMM Do YYYY, h:mm:ss a)

### Poke.player.pokeStorage()
- Returns poke storage amount

### Poke.player.itemsStorage()
- Returns items storage amount

### Poke.player.currency()
- Returns currencies

### Poke.player.setLocation(location)
- Sets user location
Input:
```
***location***: (required) Has to be a object of location:
```
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


