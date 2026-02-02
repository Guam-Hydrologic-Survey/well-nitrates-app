/* 
TitleCard.js
*/

export function TitleCard(map) {

    const mapTitle = L.control({position: 'topleft'});

    mapTitle.onAdd =  function(map) {
        this._div = L.DomUtil.create('div', 'mapTitle'); 
        this._div.innerHTML = '<img src="./src/assets/WERI MAppFx Well Nitrates Title Card-White_Bold.png" height="150">';
        return this._div;
    };

    mapTitle.addTo(map);
}