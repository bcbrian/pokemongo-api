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
```json
profile{
  creation_time: 'Number'
  username: 'String'
  team: 'Number'
  tutorial: 'Number/Boolean'
  poke_storage: 'String'
  item_storage: 'String'
  daily_bonus{
    NextCollectTimestampMs: 'Number'
    NextDefenderBonusCollectTimestampMs: 'Number'
  }
  currency{
    type: 'String'
    amount: 'Number'
  }
}
```

