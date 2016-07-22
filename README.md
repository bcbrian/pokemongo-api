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
const api = await Poke.login(username, password, location, provider)
let profile = await api.GetPlayer() //this returns a object with the user profile


//To call API Direct (Only for advanced usage)
let res = await Poke.Call([ { request: 'GET_PLAYER' } ]) //get profile

```


## Available functions (more to come)

### GetPlayer()

Returns the Player Object: 
```js
  profile{
    creation_time
    username
    team
    tutorial
    poke_storage
    item_storage
    daily_bonus{
      NextCollectTimestampMs
      NextDefenderBonusCollectTimestampMs
    }
    currency{
      type
      amount
    }
  }
```

