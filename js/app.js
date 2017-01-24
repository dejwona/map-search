$(function() {

  var land = $('.land');
  var $container = $('.container');
  var $countryForm = $container.find('.countryForm');
  var $error = $countryForm.find('.error');
  var $get_title = $countryForm.find('.get_title');
  var $info = $container.find('.info');
  var $ul = $info.find('.listCountry');
  var $close = $info.find('.close');
  var $svg = $container.find('.map');
  var $zoom = $container.find('.zoom');
  var $in = $zoom.find(".in");
  var $out = $zoom.find(".out");
  var $home = $zoom.find(".home");
  var $form = $container.find('.countryForm');
  var $titleInput = $form.find('.get_title');
  var name;
  name = $titleInput.val();
  var $listItem;
  var itemHTML;


    /* Insert Movies to DOM input*/
  function loadCountries(country) {
    var api = 'https://restcountries.eu/rest/v1/name/';
    $.ajax({
            url: api + country
        }).done(function(response){
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
        })
  }
  /* Insert Movies to DOM click*/
  function loadCountriesCode(code) {
    var apiCode = 'https://restcountries.eu/rest/v1/alpha/';
    $.ajax({
            url: apiCode + code
        }).done(function(response){
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
    $('.land').each(function(){
    });
     $(this).css({fill:'rgb(169, 178, 185)'}); //jasny szary
    });

    land.on('mouseout', function(event){
         if($(this).css('fill') == 'rgb(161, 7, 7)') {
           $(this).css({fill:'rgb(161, 7, 7)'});
         } else {
           $(this).css({fill:'rgb(136, 143, 148)'});
         };

    });

    land.on('click', function(event){
      $error.css('display', 'none');
      $get_title.attr('value', 'Country');
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
    land.css({fill:'rgb(136, 143, 148)'});
    animateInfo();   
  })
  $get_title.on('focus', function(e){
     $get_title.attr('value', ' ');
  })
  $get_title.on('blur', function(e){
     $get_title.attr('value', 'Country');
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



  function colorMap() {

    $('.land').each(function(){

      var title = $(this).attr('title');
      name = $titleInput.val();
      //console.log(title);
      if (title == name) {
        //console.log(name);
          $(this).css({fill:'rgb(161, 7, 7)'}); // red
          console.log($(this));
      } else {
          $(this).css({fill:'rgb(136, 143, 148)'});
      }
    })
  }
  colorMap();



// form pobranie wartosci z inputa i zaladowanie z api danych
  function sendData(name) {
    var api = 'https://restcountries.eu/rest/v1/name/';

        $form.on('submit', function(e) {
            e.preventDefault();
            name = $titleInput.val();

            $.ajax({
                url: api + name,
                type: 'GET',
                dataType: 'json'
            }).done(function(response) {
              console.log(response);
                loadCountries(response[0].name);
                colorMap();

                //$titleInput.val('');
            }).fail(function(error) {
                $error.css('display','block');
                $titleInput.val('');
            })
        });
  }
  sendData();

// zoom
var panZoomInstance = svgPanZoom('#map', {
    center: true,
    minZoom: 0.1
  });

  // zoom out
  panZoomInstance.zoom(1)

  $(window).resize(function(){
          panZoomInstance.resize();
          panZoomInstance.fit();
          panZoomInstance.center();
  })


$in.on('click', function(e){
  panZoomInstance.zoomIn();
});

$out.on('click', function(e){
  panZoomInstance.zoomOut();
});

$home.on('click', function(e){
  panZoomInstance.resetZoom();
});



});
