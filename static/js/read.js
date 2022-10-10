var local;

fetch('./static/data/data3.json')
    .then(response => response.json())
    .then(data => {
        local.setItem('wellData', JSON.stringify(data))
        console.log(local.getItem('WellData'));
        // console.log('This is from read.js:');
        // console.log(JSON.stringify(data));
    })
    .catch(console.error);
