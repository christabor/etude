var canvas,
message = $('#message'),
coords = [],
map_options = {},
style = [],
styled_map,
map,
zoom_level = 12,
random_geo_offset = 6,
total_zombies = 0,
marker;

function getLocationError(coords) {
    // a generic required error for native getLocation method
    return 'Error, location couldn\'t be found';
}

function setMapEvents(map, marker) {
    google.maps.event.addListener(map, 'center_changed', function() {

        // pan back to the center of marker
        window.setTimeout(function() {
            map.panTo(marker.getPosition());
        }, 1000);
    });
    return;
}

function getLocationSuccess(coords) {
    // add controls and events
    $('#controls').fadeIn(500).on('click', function(){
        spreadInfection(map, coords, 5);
    });

    // get canvas element and setup coords
    canvas = document.getElementById("map-canvas");
    coords = {
        lat: coords.coords.latitude,
        lng: coords.coords.longitude
    };

    // add style object
    style = [{
        stylers: [{
            hue: "#ff0000"
        }, {
            saturation: 100
        }, {
            lightness: 6
        }, {
            invert_lightness: !0
        }]
    }, {
        elementType: "geometry",
        stylers: [{
            visibility: "simplified"
        }]
    }, {
        elementType: "labels.icon"
    }, {
        featureType: "transit",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }];
    styled_map = new google.maps.StyledMapType(style, {
        name: 'Styled Map'
    });

    // set roadmap options
    map_options = {
        center: new google.maps.LatLng(coords.lat, coords.lng),
        zoom: zoom_level,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // update map
    google.maps.visualRefresh = true;
    map = new google.maps.Map(canvas, map_options);
    marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map,
        title: 'Click to zoom'
    });

    map.mapTypes.set('map_style', styled_map);
    map.setMapTypeId('map_style');
    setMapEvents(map, marker);

    // update messages
    message.find('.messages')
    .html('Zombie invasion <br />has begun on <br /><strong><hr />' + new Date() + '</strong> at: <br /><hr />Latitude: ' + coords.lat + ' <br />Longitude: ' + coords.lng + '<hr />')
    .parent()
    .show(200)
    .delay(1200)
    .animate({'left': '200px'}, 1000);

//test
randomizeCoords(coords);

return;
}

function updateZombies() {
    // increment total zombie count
    total_zombies += 1;

    // update message
    message
    .find('.zombies')
    .hide()
    .text(total_zombies * 55)
    .fadeIn(20);
    return;
}

function triggerInfectionWarning() {
    // indicates the infection has spread further
    var warning = $('<div id="infection-warning"></div>').text('The infection has spread!');
    $('body').append(warning);

    // remove after a bit, a simple alert type message
    setTimeout(function(){
        $('body')
        .find('#infection-warning')
        .fadeOut(500, function(){
            $(this).remove();
        });
    }, 500);
    return;
}

function adjustZoom(level) {
    // adjust global zoom level
    zoom_level = level;

    // defer to zoom level and set in google maps
    map.setZoom(zoom_level);
    return;
}

function checkInfectionSpread() {
    // Checks to see how dense the zombie infection is,
    // and adjusts the @random_geo_offset to be have
    // a wider range as the numbers increase
    if(total_zombies === 20) {
        adjustZoom(11);
        random_geo_offset = 6;
        triggerInfectionWarning();
    } else if(total_zombies === 50) {
        random_geo_offset = 7;
        adjustZoom(8);
        triggerInfectionWarning();
    } else if(total_zombies === 100) {
        random_geo_offset = 11;
        adjustZoom(5);
        triggerInfectionWarning();
    } else if(total_zombies === 250) {
        random_geo_offset = 13;
        adjustZoom(3);
        triggerInfectionWarning();
    } else {
        return;
    }
    return;
}

function randomizeCoord(coord) {
    // split to a string,
    // randomize the last two digits,
    // since google maps is very precise,
    // we can't go much further than that.
    coord = String(coord).split('');


    // loop through the newly split array,
    // convert the last N digits to random numbers by looping
    for(var i = 1; i <= random_geo_offset; i++) {

        // avoid IndexErrors
        if(coord.length - 1) {
            coord[coord.length - i] = String(Math.round(Math.random() * 10));
        }
    }

    // convert back to number
    coord = coord.join('');
    coord = parseFloat(coord, 10);
    return coord;
}

function randomizeCoords(coords) {
    // defer to individual randomize method
    // to make lat/lng coords
    var lat = randomizeCoord(coords.lat),
    lng = randomizeCoord(coords.lng);

    coords = {
        lat: lat,
        lng: lng
    };
    return coords;
}

function addMapImageMarker(map, img, coords) {
    // add actual image icon using maps api
    var map_coords = new google.maps.LatLng(coords.lat, coords.lng),
    marker = new google.maps.Marker({
        position: map_coords,
        animation: google.maps.Animation.DROP,
        map: map,
        icon: img
    });
    // update zombie count and check if it's gone
    // to the next threshold
    updateZombies();
    return;
}

function spreadInfection(map, coords, amount) {
    // add zombie icons @amount times and semi-randomize
    // the last few digits so it clusters around the target zone
    for(var i = 0; i <= amount; i++) {
        (function(i){

            // time out so that it doesn't
            // all happen at once, a cooler effect
            setTimeout(function(){
                addMapImageMarker(map, 'zombie-icon.png', randomizeCoords(coords));

                    // check infection level before
                    checkInfectionSpread();
                }, i * 100);
        })(i);
    }
    return;
}

function initialize() {
    // trigger geolocation api
    getLocation(getLocationSuccess, getLocationError);
    return;
}

google.maps.event.addDomListener(window, 'load', initialize);
