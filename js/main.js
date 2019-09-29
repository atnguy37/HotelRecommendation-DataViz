var mapOptions;
var selectedCity;

var markerEncoding = {
    1: "assets/pin1c.png",
    2: "assets/pin2c.png",
    3: "assets/pin3c.png",
    4: "assets/pin4c.png",
    5: "assets/pin5c.png"
};

const listOfThings = document.getElementById("citylist");
listOfThings.addEventListener("click", function(event) {
    $("#class1").css("color","lightgray");
    $("#class2").css("color","lightgray");
    $("#class3").css("color","lightgray");
    $("#class4").css("color","lightgray");
    $("#class5").css("color","lightgray");
    $("#class6").css("color","#E8711B");
    var list = $(".citycontainer li");
    for (let i = 0; i < list.length; i++) {
        if (event.target.dataset.id === list[i].dataset.id) {
            if (event.target.className === 'inactive') {
                event.target.className = 'active'
            } else {
                event.target.className = 'inactive'
            }
            // scity = $("li.selected").html();
            // console.log(scity);
            selectedCity = event.target.innerHTML;
            // alert(event.target);
            // console.log(selectedCity);
            setMarker(null);
            // setMapCenter(event.target.outerText);
            // setMapMarker(event.target.outerText);
        } else {
            list[i].className = 'inactive'
        }
    }
});

function setMarker(selectedClass) {
    setMapCenter();
    setMapMarker(selectedClass);
}

function setMapCenter() {
    $.getJSON("data/city_location.json", function (data) {
        // console.log(data);
        // console.log(selectedCity);
        var latlong = data[selectedCity];
        // console.log(latlong);
        mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(latlong[0], latlong[1]),
            styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}]
        };
        var mapElement = document.getElementById('map');
        map = new google.maps.Map(mapElement, mapOptions);
    });
}

function setMapMarker(hotelClass) {
    ClearAllSubSection();
    city = selectedCity;
    $.getJSON("data/maps.json", function (data) {
        locations = data[city];
        var infowindow = new google.maps.InfoWindow({});
        var marker, count;

        if (hotelClass) {
            for (count in locations) {
                if (hotelClass === locations[count][3]) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(locations[count][1], locations[count][2]),
                        map: map,
                        icon: markerEncoding[locations[count][4]]
                    });

                    // marker.setIcon('assets/marker.png');

                    google.maps.event.addListener(marker, 'mouseover', (function (marker, count) {
                        return function () {
                            infowindow.setContent(locations[count][0]);
                            infowindow.open(map, marker);
                        }
                    })(marker, count));

                    google.maps.event.addListener(marker, 'mouseout', (function (marker, count) {
                        return function () {
                            infowindow.close(map, marker);
                        }
                    })(marker, count));

                    google.maps.event.addListener(marker, 'click', (function (count) {
                        return function () {
                            // console.log(count);
                            markerClicked(count,city);
                        }
                    })(count));

                }
            }
        } else {
            for (count in locations) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[count][1], locations[count][2]),
                    map: map,
                    icon: markerEncoding[locations[count][4]]
                });

                // marker.setIcon('assets/marker.png');

                google.maps.event.addListener(marker, 'mouseover', (function (marker, count) {
                    return function () {
                        infowindow.setContent(locations[count][0]);
                        infowindow.open(map, marker);
                    }
                })(marker, count));

                google.maps.event.addListener(marker, 'mouseout', (function (marker, count) {
                    return function () {
                        infowindow.close(map, marker);
                    }
                })(marker, count));

                google.maps.event.addListener(marker, 'click', (function (count) {
                    return function () {
                        markerClicked(count,city);
                        // console.log(count);
                    }
                })(count));

            }
        }

    });
}

// Set a CLass setting
$(".star-button").css("color","lightgray");
$(".star-button").click(function () {
    let index = this.value ;
    switch (index) {
        case "1":
            // $(".star-icon").css("color","#d3d3d3");
            $("#class1").css("color","#E8711B");
            $("#class2").css("color","lightgray");
            $("#class3").css("color","lightgray");
            $("#class4").css("color","lightgray");
            $("#class5").css("color","lightgray");
            $("#class6").css("color","lightgray");
            setMarker(1);
            break;
        case "2":
            $("#class1").css("color","#E8711B");
            $("#class2").css("color","#E8711B");
            $("#class3").css("color","lightgray");
            $("#class4").css("color","lightgray");
            $("#class5").css("color","lightgray");
            $("#class6").css("color","lightgray");
            setMarker(2);
            break;

        case "3":
            $("#class1").css("color","#E8711B");
            $("#class2").css("color","#E8711B");
            $("#class3").css("color","#E8711B");
            $("#class4").css("color","lightgray");
            $("#class5").css("color","lightgray");
            $("#class6").css("color","lightgray");
            setMarker(3);
            break;

        case "4":
            $("#class1").css("color","#E8711B");
            $("#class2").css("color","#E8711B");
            $("#class3").css("color","#E8711B");
            $("#class4").css("color","#E8711B");
            $("#class5").css("color","lightgray");
            $("#class6").css("color","lightgray");
            setMarker(4);
            break;

        case "5":
            $("#class1").css("color","#E8711B");
            $("#class2").css("color","#E8711B");
            $("#class3").css("color","#E8711B");
            $("#class4").css("color","#E8711B");
            $("#class5").css("color","#E8711B");
            $("#class6").css("color","lightgray");
            setMarker(5);
            break;

        case "6":
            $("#class1").css("color","lightgray");
            $("#class2").css("color","lightgray");
            $("#class3").css("color","lightgray");
            $("#class4").css("color","lightgray");
            $("#class5").css("color","lightgray");
            $("#class6").css("color","#E8711B");
            setMarker(null);
            break;
    }
});

function markerClicked(hotelId, city) {
    // alert(city);
    // console.log(hotelId);
    ClearAllSubSection();
     $('.Radar').hide();
    GetHotelName(hotelId);
    HeatMapGenerator(hotelId);
    TimeSeriesGenerator(hotelId);
    appendButton(hotelId, city);
    comment(hotelId);
    showCloud(hotelId);
     VisibleAllSubSection();
}

function ClearAllSubSection(){
    //  $('.heatmap').empty();
    // $('.timeseriesClass').empty();
    // $('.CompareHotels').empty();

    $('.heatmap').hide();
    $('.timeseriesClass').hide();
    $('.CompareHotels').hide();    
    $('.radarChart').hide();
    $('.container').hide();
    $('.wordCloud').hide();

    $("#MatchWinner").empty();
    $("#radarChart").empty();
    $(".container").empty();
$('.wordCloud').empty();
    $('.Radar').hide();


}

function VisibleAllSubSection(){
    $('.heatmap').show();
    $('.timeseriesClass').show();
    $('.CompareHotels').show();
    $('.container').show();
    $('.wordCloud').show();
    //  
    // $('.Radar').show();
}

