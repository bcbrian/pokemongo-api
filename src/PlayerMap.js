import s2 from 's2geometry-node'

class PlayerMap {
  constructor(props) {
  }

  getNeighbors(player){
    let
    {latitude, longitude} = player,
    origin = new s2.S2CellId(new s2.S2LatLng(latitude, longitude)).parent(15),
    walk = [origin.id()],
    next = origin.next(),
    prev = origin.prev(),
    i = 10;

    while(i--){
      walk.push(prev.id())
      walk.push(next.id())
      next = next.next()
      prev = prev.prev()
    }

    return walk
  }

}

export default PlayerMap
