$(function() {

  var land = $('.land');
  var $container = $('.container');
  var $countryForm = $container.find('.countryForm');
  var $get_title = $countryForm.find('.get_title');
  var $info = $container.find('.info');
  var $ul = $info.find('.listCountry');
  var $close = $info.find('.close');
  var $svg = $container.find('.map');
  var $zoom = $container.find('.zoom');
  var $in = $zoom.find(".in");
  var $out = $zoom.find(".out");
  var $home = $zoom.find(".home");
  var $listItem;
  var itemHTML;

    /* Insert Movies to DOM input*/
  function loadCountries(country) {
     var api = 'https://restcountries.eu/rest/v1/name/';
     $.ajax({
            url: api + country
        }).done(function(response){         
          console.log(response);
              $listItem = '<li>' + '<h2 class="countryVal">' + 'Country:' + '</h2>' + 
              '<h2>' + response[0].name + '</h2>' + 
              '<p>' + '<h4 class="countryVal">' + 'Capital:' + '</h4>' + response[0].capital + '</p>' +
              '<p>' + '<h4 class="countryVal">' + 'Region:' + '</h4>' + response[0].region + '</p>' +
              '<p>' + '<h4 class="countryVal">' + 'Subregion:' + '</h4>' + response[0].subregion + '</p>' + 
              '<p>' + '<h4 class="countryVal">' + 'Population:' + '</h4>' + response[0].population + '</p>' + 
              '<p>' + '<h4 class="countryVal">' + 'Currencies:' + '</h4>' + response[0].currencies + '</p>' + 
              '</li>';
          
              $ul.html($listItem);
              
      }).fail(function(error) {
            console.log(error);
        })
  }
    /* Insert Movies to DOM click*/
    function loadCountriesCode(code) {
     var apiCode = 'https://restcountries.eu/rest/v1/alpha/';
     $.ajax({
            url: apiCode + code
        }).done(function(response){         
          console.log(response);
              $listItem = '<li>' + '<h2 class="countryVal">' + 'Country:' + '</h2>' + 
              '<h2>' + response.name + '</h2>' + 
              '<p>' + '<h4 class="countryVal">' + 'Capital:' + '</h4>' + response.capital + '</p>' +
              '<p>' + '<h4 class="countryVal">' + 'Region:' + '</h4>' + response.region + '</p>' +
              '<p>' + '<h4 class="countryVal">' + 'Subregion:' + '</h4>' + response.subregion + '</p>' + 
              '<p>' + '<h4 class="countryVal">' + 'Population:' + '</h4>' + response.population + '</p>' + 
              '<p>' + '<h4 class="countryVal">' + 'Currencies:' + '</h4>' + response.currencies + '</p>' + 
              '</li>';
          
              $ul.html($listItem);
              
      }).fail(function(error) {
            console.log(error);
        })
  }
  // funkcja klikniecia w mape (kolorowanie)
  function landLand() {
    land.on('mouseover', function(event){
      //console.log(this);
    $('.land').each(function(){
    });
     $(this).css({fill:'rgb(169, 178, 185)'}); //jasny szary
    });  

    land.on('mouseout', function(event){
        // color of map
        console.log($(this).css('fill'));
         if($(this).css('fill') == 'rgb(161, 7, 7)') {
           $(this).css({fill:'rgb(161, 7, 7)'});
         } else {
           $(this).css({fill:'rgb(136, 143, 148)'});
         };

    });

    land.on('click', function(event){

    	console.log(this.id);
      loadCountriesCode(this.id);

      $('.land').each(function(){
        // color of map
        $(this).css({fill:'#888f94'});

      });
      $(this).css({fill:'rgb(161, 7, 7)'}); // red
      animateInfo();          
    });     
  }
 
  landLand();

  $get_title.on('change', function(e){
    animateInfo();
  })


  function animateInfo() {
    if ($info.css('left') === "-300px") {
        $info.animate({ "left": "+=300px" }, "slow" );
    } else {
        $info.attr('left','300px');
    } 
  }


// animation
$close.on('click', function() {
  $info.animate({ "left": "-=300px" }, "slow" );
})


// form pobranie wartosci z inputa i zaladowanie z api danych
function sendData(name) {
  var api = 'https://restcountries.eu/rest/v1/name/';
  var $form = $container.find('.countryForm');
  var $titleInput = $form.find('.get_title');
  var $error = $form.find('.error');
  var name;

        $form.on('submit', function(e) {
            e.preventDefault();
            name = $titleInput.val();
            //console.log(name);

            $.ajax({
                url: api + name,
                type: 'GET',
                dataType: 'json'
            }).done(function(response) {
              console.log(response);             
                loadCountries(response[0].name);
                $titleInput.val('');

            }).fail(function(error) {
                //console.log(error);
                $error.css('display','block');
            })
        });
    }
    sendData();

// zoom

var panZoomMap = svgPanZoom('.map');
panZoomMap.resize(); // update SVG cached size and controls positions

panZoomMap.updateBBox(); // Update viewport bounding box
panZoomMap.contain(); // fit works as expected


//'200 -20 900 700'
$svg.attr('viewBox', '-400 -440 1900 1000');


$in.on('click', function(e){
  panZoomMap.zoomIn();  
});

$out.on('click', function(e){
  panZoomMap.zoomOut();
});

$home.on('click', function(e){
  panZoomMap.resetZoom();
});



});
