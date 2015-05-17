var countries = [],
    i = 0,
    num_places = places.length;

function contains(a, obj) {
    'use strict';
    var i = a.length;
    while (i) {
        i = i - 1;
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

for (i = 0; i < num_places; i = i + 1) {
    if (!contains(countries, places[i].country)) {
        countries.push(places[i].country);
    }
}
//console.log(countries);
var num_countries = countries.length;
//console.log(num_countries);


var map;
/*
var TILE_SIZE = 256;
//var loc = new google.maps.LatLng(50.897728,-1.408561);

function bound(value, opt_min, opt_max) {
    'use strict';
    if (opt_min != null) value = Math.max(value, opt_min);
    if (opt_max != null) value = Math.min(value, opt_max);
    return value;
}

function degreesToRadians(deg) {
    'use strict';
    return deg * (Math.PI / 180);
}

function radiansToDegrees(rad) {
    'use strict';
    return rad / (Math.PI / 180);
}

function MercatorProjection() {
    'use strict';
    this.pixelOrigin_ = new google.maps.Point(TILE_SIZE / 2, TILE_SIZE / 2);
    this.pixelsPerLonDegree_ = TILE_SIZE / 360;
    this.pixelsPerLonRadian_ = TILE_SIZE / (2 * Math.PI);
}

MercatorProjection.prototype.fromLatLngToPoint = function(latLng, opt_point) {
    var me = this;
    var point = opt_point || new google.maps.Point(0, 0);
    var origin = me.pixelOrigin_;

    point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;

    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.
    var siny = bound(Math.sin(degreesToRadians(latLng.lat())), -0.9999, 0.9999);
    point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) * -me.pixelsPerLonRadian_;
    return point;
};

MercatorProjection.prototype.fromPointToLatLng = function(point) {
    var me = this;
    var origin = me.pixelOrigin_;
    var lng = (point.x - origin.x) / me.pixelsPerLonDegree_;
    var latRadians = (point.y - origin.y) / -me.pixelsPerLonRadian_;
    var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);
    return new google.maps.LatLng(lat, lng);
};

function createInfoWindowContent() {
    'use strict';
    return places[0].city; //'Jon'+'as Op'+'penla'+'ender<br>' + 'Dipl.-Wirtsch.-Ing.';
}


var MY_MAPTYPE_ID = 'custom_style';

function initialize() {
    'use strict';
    var mapOptions = {
        zoom: 3,
        center: loc,
        mapTypeId: MY_MAPTYPE_ID,
        disableDefaultUI: true,
        scrollwheel: false,
        panControl: false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        },
        scaleControl: true
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var featureOpts = [
        {
            stylers: [
                { hue: '#0020AA' },
                { visibility: 'simplified' },
                { gamma: 0.8 }
        ]
    },
    {
        elementType: 'labels',
        stylers: [
            { visibility: 'off' }
        ]
    },
    {
        featureType: 'poi.park',
        stylers: [
            { color: '#DDDDDD' }
        ]
    },
    {
        featureType: 'water',
        stylers: [
            { color: '#EFEFEF' }
        ]
    },
    {
        featureType: 'road',
        stylers: [
            { visibility: 'off' }
        ]
    },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      { hue: '#ffff00' },
      { gamma: 1.4 },
      { saturation: 82 },
      { lightness: 96 }
    ]
  }
    ];
    var customMapType = new google.maps.StyledMapType(featureOpts, {name: 'Custom Style'});
    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);





    var markers = [];
    var i = 0, s = places.length;

    for (i = 0; i < s; i = i + 1) {
        markers.push(new google.maps.LatLng(places[i].lat,places[i].lng));
    }//for


    for (i = 0, s = markers.length; i < s; i++) {
        markers[i] = new google.maps.Marker({
            position: markers[i],
            clickable: false,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 3,
                strokeColor: '#FFC040'
            },
            draggable: false,
            map: map
        });
    }//for

     markers.push(new google.maps.Marker({
        position: loc,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 3,
            strokeColor: '#FF0000'
        },
        draggable: false,
        'map': map
    }));


//    var marker = new google.maps.Marker({
//        position: loc,
//        map: map
//    });

//    var coordInfoWindow = new google.maps.InfoWindow();
//    coordInfoWindow.setContent(createInfoWindowContent());
//    coordInfoWindow.setPosition(loc);
//    coordInfoWindow.open(map);
//    google.maps.event.addListener(map, 'zoom_changed', function() {
//        coordInfoWindow.setContent(createInfoWindowContent());
//        coordInfoWindow.open(map);
//    });

}
*/



//$(function() {
$(document).ready(function () {

    //lazyload
    $("img.lazy").lazyload({
        threshold : 200
    });

    //alternate the timeline so that I do not have to worry about it
    $('ul.timeline li').each(function (index, el) {
        if (index % 2 !== 0) {
            $(el).addClass('timeline-inverted');
        }
    });

    $('footer .copyright').append(' ' + new Date().getFullYear());

    $('#map .num_countries').text(num_countries);

    $('header').height();

/*
    //resize the containers on the main to window size
    function resize_pages(){
        $('header').height($(window).height());
    };
    resize_pages();
    $(window).resize(resize_pages);
*/

    //preview
    //$('section').remove();


    //get token
    var securitytoken = false;
    var dateline = Math.floor(Date.now() / 1000);
    $.ajax({
        dataType: 'text',
        method: "POST",
        url: "./token.php",
        data: {
            d: dateline
        }
    }).done(function(msg) {
        if (msg) {
            securitytoken = msg;
        }
        //alert(msg);
    });

    $('#simple_form-field-submit').click(function(e) {
        e.preventDefault();

        if (securitytoken && dateline) {
            $.ajax({
                dataType: 'text',
                url: "http://komasurfer.com/contact.php",
                data: {
                    'token': securitytoken,
                    'name': $("#simple_form-field-name").val(),
                    'email': $("#simple_form-field-email").val(),
                    'message': $("#simple_form-field-message").val(),
                    'dateline': dateline
                }
            }).done(function() {
                $('#simple_form-success').html("<div class='alert alert-success'>");
                $('#simple_form-success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                $('#simple_form-success > .alert-success').append("<strong>Your message has been sent.</strong>");
                $('#simple_form-success > .alert-success').append('</div>');

                //clear all fields
                //$('#simple_form').trigger("reset");

                $('.form-group').remove();
            });
        }

        return false;
    });


});



/*
google.maps.event.addDomListener(window, 'load', initialize);
*/