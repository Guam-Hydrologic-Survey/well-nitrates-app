/* 
TitleCard.js
*/

export function TitleCard(map) {

    // Update path to image
    const img_path = "./src/assets/WERI MAppFx Well Nitrates Title Card-White_Bold.png"

    const mapTitle = L.control({position: 'topleft'});

    mapTitle.onAdd =  function(map) {
        this._div = L.DomUtil.create('div', 'mapTitle'); 
        this._div.innerHTML = `<img src="${img_path}" height="150">`;
        return this._div;
    };

    mapTitle.addTo(map);
}