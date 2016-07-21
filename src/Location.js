class Location {
  constructor(props) {
  }

  
  _getNear(prop){
    ms = []
    prop.map( cell =>{
      cell.b.map( block =>{
        block.c.map( obj =>{
          obj.s.map(stop =>{
            ms.push(stop.name,stop.lat,stop.lon,this._getDistance(stop.lat,stop.lon,COORDS_LATITUDE,COORDS_LONGITUDE))
          })
        })
      })
    })
    return ms;
  }
  _getNearP(prop){
    ms = []
    prop.map( cell =>{
      cell.b.map( block =>{
        block.c.map( obj =>{
          obj.p.map( stop =>{
            ms.push((stop.t.type,stop.lat,stop.lon,stop.name,stop.hash,this._getDistance(stop.lat,stop.lon,COORDS_LATITUDE,COORDS_LONGITUDE)))
          })
          obj.s.map( stop =>{
            if (stop.p.type) 
              ms.push((stop.p.type,stop.lat,stop.lon,stop.name,stop.p.u2,this._getDistance(stop.lat,stop.lon,COORDS_LATITUDE,COORDS_LONGITUDE)))
          })
        })
      })
    })
    return ms;
  }
  
  _getDistance(lat1, lon1,lat2, lon2){
    return GeoLib.getDistance({
      longitude: lon1,
      latitude: lat1,
    }, {
      longitude: lon2,
      latitude: lat2,
    })
  }
}

export default Location