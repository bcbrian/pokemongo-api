class Map {
  constructor(props) {
  }

  
  getNeighbors(player){
    var latlng = new s2.S2LatLng(playerInfo.latitude, playerInfo.longitude);
    var origin = new s2.S2CellId(latlng).parent(15);
    var walk = [origin];
    var next = origin.next();
    var prev = origin.prev();
    [0,1,2,3,4,5,6,7,8,9].forEach(function(i) {
      walk.push(prev);
      walk.push(next);
      next = next.next();
      prev = prev.prev();
    });
    return walk
  }
}

export default Map