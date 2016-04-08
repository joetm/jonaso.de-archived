/*global $, console, document, window, alert */

var app = {},
    places,
    words,
    countries = [],
    i = 0,
    num_places = 0,
    num_countries = 0,
    years_abroad = 0,
    map = {};


app.finished = false;
$(app).on('ajax:done', function () {
    // console.log('custom ajax:done event');
    app.finished = true;
    //only set up animations after app is fully loaded
    new WOW().init();
    // console flair
    /*
    console.log("\
         ________________________________\
        |                                |\
________|                                |_______\
\\       |           jonaso.de            |      /\
 \\      |                                |     /\
 /      |________________________________|     \\\
/__________)                          (_________\\\
");
    */
});//$(app).on('ajax:done'


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

function browserSupportsCSSProperty(propertyName) {
    'use strict';

    var elm = document.createElement('div'),
        i,
        propertyNameCapital,
        domPrefixes;

    propertyName = propertyName.toLowerCase();
    if (elm.style[propertyName] !== undefined) {
        return true;
    }
    propertyNameCapital = propertyName.charAt(0).toUpperCase() + propertyName.substr(1);
    domPrefixes = 'Webkit Moz ms O'.split(' ');
    for (i = 0; i < domPrefixes.length; i++) {
        if (elm.style[domPrefixes[i] + propertyNameCapital] != undefined) {
            return true;
        }
    }
    return false;
}//browserSupportsCSSProperty



$(function (){

    //load the data
    $.ajax({
        url: "data/data.json",
        dataType: "json",
        cache: false
    })
        .done(function(data) {

            places = data.places;
            num_places = places.length;
            words = data.words;

            var start, end, diff;

            for (i = 0; i < num_places; i = i + 1) {
                if (!contains(countries, places[i].country)) {
                    countries.push(places[i].country);
                }//if
                // calculate the time abroad (extra-Germany)
                if (places[i].start && places[i].end) {
                    start = new Date(places[i].start).getTime();
                    if (places[i].end !== 'today') {
                        end = new Date(places[i].end).getTime();
                    } else {
                        end = new Date().getTime();
                    }
                    diff = (end - start) / 1000
                    // console.log('diff', diff);
                    years_abroad += diff;
                }
            }//for
            // console.log(countries);
            //number of countries visited
            num_countries = countries.length;
            $('#map .num_countries').text(num_countries);

            if (!years_abroad) {
                $('#map span#years_abroad').parent().hide();
            } else {
                years_abroad = +((years_abroad / 31536000).toFixed(2)); // in years
                // console.log('years_abroad', years_abroad);
                $('#map span#years_abroad').text(years_abroad);
            }

            init_map();

            //tag cloud
            $('#tagcloud').jQCloud(words, {
                removeOverflowing:false,
                autoResize:true
            });

        })//done
        .fail(function(xhr, err) {
            if (err === 'parsererror') {
                console.log('malformed json in data.json');
            } else {
                console.log('ajax failed', err);
            }
        });//fail

});


// get the CV template
var minicv_tpl_request = $.get('./views/minicv.htm');
// get the CV data
var minicv_request = $.ajax({
    method: "GET",
    url: './data/mini-cv.json',
    dataType: "json",
    headers: {
        'Accept': 'application/json'
    },
    beforeSend: function(xhr) {
        xhr.overrideMimeType('application/json');
    }
})
// when minicv data and template are ready
$.when(minicv_request, minicv_tpl_request).done(function (data, template) {
        if (!data || data[0] === undefined) {
            // TODO: error handling
            return;
        }

        data = data[0]
        // console.log('minicvdata', data);

        template = template[0];
        // console.log('template', template);

        var $el = $('#cv .timeline'),
            itemNo = 0,
            htmlContent = '';

        // Mustache.parse(template);
        var tplWiz = {
            parsedTpl: doT.template(template),
            renderTemplate: function (item) {
                itemNo++;
                // item = item.toJSON();
                if (itemNo % 2 !== 0) {
                    item.li_class = ' timeline-inverted';
                    item.timeline_body_alternation = 'slideInRight';
                } else {
                    item.li_class = '';
                    item.timeline_body_alternation = 'slideInLeft';
                }
                // return Mustache.render(template, item);
                // console.log('item', item);
                return this.parsedTpl(item);
            }
        };

        $.each(data, function (index, item) {
            htmlContent += tplWiz.renderTemplate(item);
        });
        // console.log('htmlContent', htmlContent);

        $el.prepend(htmlContent);

        $(app).trigger('ajax:done');

    });


function init_map() {
    //map
    L.Icon.Default.imagePath = './js/vendor/leaflet/images';
    var grayIcon = L.icon({
        iconUrl: './js/vendor/leaflet/images/marker-icon-gray.png',
        shadowUrl: './js/vendor/leaflet/images/marker-shadow.png',
        iconSize:     [18, 30], // size of the icon
        shadowSize:   [30, 30], // size of the shadow
        iconAnchor:   [9, 30], // point of the icon which will correspond to marker's location
        shadowAnchor: [9, 30],  // the same for the shadow
        popupAnchor:  [9, -3] // point from which the popup should open relative to the iconAnchor
    });
    var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
        latlng = L.latLng(51,4),
        i = 0,
        first = true,
        map = L.map('location-map', {
            center: latlng,
            zoom: 4,
            layers: [tiles]
        });
    var popup,
        marker,
        markers = [];
    //add markers
    for (i=0; i < num_places; i++) {
        popup = L.popup({closeButton: false}).setContent('<b>'+places[i]['city']+'</b><br />'+places[i]['country']);
        if (first) {
            first = false;
            marker = L.marker([places[i]['lat'], places[i]['lng']], {riseOnHover:true})
                .addTo(map)
                .bindPopup(popup)
                .openPopup();
        } else {
            marker = L.marker([places[i]['lat'], places[i]['lng']], {icon: grayIcon, riseOnHover:true})
                .addTo(map)
                .bindPopup(popup);
        }
        marker.on('mouseover', function (e) {
            alert('mouseover marker');
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            alert('mouseout marker');
            this.closePopup();
        });
        markers.push(marker);
    }
    // map hover
    $('#location-map').on('mouseover', function(e) {
        // close all popups
        $.each(markers, function (index, marker) {
            marker.closePopup();
        });
    });
}


$(function() { //$(document).ready(function () {

    $('#komasurfer-link').attr('href', 'http://koma' + 'surfer.com/' + 'portfolio/');

    //lazyload
    //try{
        $("img.lazy").lazyload({
            threshold : 200
        });
    //} catch (ignore) {}

    //copyright date
    $('footer .copyright').append(' ' + new Date().getFullYear());

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
    /*form submission*/
    $('#simple_form-field-submit').click(function(e) {
        e.preventDefault();

        if (securitytoken && dateline) {
            $.ajax({
                dataType: 'text',
                url: "http://komasurfer.com/contact.php",
                data: {
                    'token': securitytoken,//need that token
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
    });//$('#simple_form-field-submit').click


});//$(function(){
