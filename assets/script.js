$(function() {
    // console.log('blah');
    let center = [-36.793013752171206, 175.0887894630432]; 

    let map = L.map('map', {
        zoomControl: false,
        maxZoom:15,
        minZoom:13
    }).setView(center, 13);

    // L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {foo: 'bar'}).addTo(map);


    // L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    //     maxZoom: 18,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(map);


    //  L.tileLayer('https://api.mapbox.com/styles/v1/zaraepi/cj6n0dfpu0asq2smionk3kzm0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFyYWVwaSIsImEiOiJjajZsZ3M5engxczd6MzNyeXVhcmNra2w4In0.uCJg22qFz1JtGhWtOy_6DQ', {
    // maxZoom: 18,
    // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //  }).addTo(map); //using mapbox leaflet link to add to the L.tileLayer. 

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFyYWVwaSIsImEiOiJjajZsZ3M5engxczd6MzNyeXVhcmNra2w4In0.uCJg22qFz1JtGhWtOy_6DQ', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);





    //all focal points -------

    let focalPoints = [{
        latlng: [-36.784679350664206, 174.99993324279785],
        radius: 1700,
        color: 'yellow',
        description: 'Headlands'

    }, {
        latlng: [-36.78839127856238, 175.0458526611328],
        radius: 2600,
        color: 'red',
        description: 'Beaches + Baches'
    }, {
        latlng: [-36.810933940110665, 175.0901412963867],
        radius: 2600,
        color: 'green',
        description: 'Forest Heart'
    }, {
        latlng: [-36.78619163929147, 175.15193939208982],
        radius: 3700,
        color: 'blue',
        description: 'Far End'
    }];

    _(focalPoints).each(function(focalPoint) {

        //vicinity circle 
        L.circle(focalPoint.latlng, {
            radius: focalPoint.radius,
            color: focalPoint.color,
            weight: 1,
            opacity: 0.3
                //fill: false
        }).addTo(map);

        var myIcon = L.divIcon({
            className: 'my-div-icon',
            html: '<div class="text-blah">' + focalPoint.description + '</div>'
        });

        L.marker(focalPoint.latlng, {
            icon: myIcon
        }).addTo(map);



    });

    L.geoJSON(reserves, {
        style: function(feature) {
            return {
                color: "green",
                weight: 1
            };
        },
        onEachFeature: function(feature, layer) {
            //console.log(feature);
            //console.log(layer)


            let popup = L.popup({
                    closeButton: false,
                    closeOnClick: false,
                    className: 'polygon-name',
                    offset: [0, 0]
                })
                .setLatLng(feature.properties.latlng)
                .setContent(feature.properties.name)
                // .addTo(map);


            layer.on('click', function() {
                if (map.hasLayer(popup)) {
                    //hide it
                    map.closePopup(popup);
                } else {
                    //show it
                    map.addLayer(popup);
                }
            });
        }
    }).addTo(map);




    //service markers restaurant-----------

    let services = [{
            latlng: [-36.80134724705748, 175.0649929046631],
            description: 'Wild on Waiheke',
            iconImage: 'assets/restaurant.svg',
            popup: {
                className: 'custom-popup-image',
                content: '<div class="title-services"><h4 class="subtitle-services">Wild on Waiheke</h4><img src="assets/wild.jpg" alt=""><h4 class="subtitle-serv-2">82 Onetangi Rd, Waiheke Island, Auckland 1971</h4><p><br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry</p></div>',
                //latlng: [-36.79370108502259,174.99639272689816]
                //popImage:'<img src="assets/wild.jpg" alt="">'
            }   
        }, {
            latlng: [-36.78839127856238, 175.0690698623657],
            description: 'Casita Miro',
            iconImage: 'assets/restaurant.svg',
            popup: {
                className: 'custom-popup-image',
                content: '<div class="title-services"><h4 class="subtitle-services">Casita Miro </h4><img src="assets/wild.jpg" alt=""><h4 class="subtitle-serv-2">82 Onetangi Rd, Waiheke Island, Auckland 1971</h4><p><br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry</p></div>',
                //content: '<div class="title-services"><h4 class="subtitle-services">Casita Miro</h4><img src="assets/wild.jpg" alt=""><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry</p></div>',
                //content: '<div>Casita Miro <img src="assets/casita.jpg" alt=""><p>some content</p></div>',
                //latlng: [-36.79370108502259,174.99639272689816]
                //popImage:'<img src="assets/casita.jpg" alt="">'
            }   
        }, {
            latlng: [-36.79370108502259, 174.99639272689816],
            description: 'Mudbrick Restaurant and Vineyard',
            iconImage: 'assets/restaurant.svg',
           
            popup: {
            className: 'custom-popup-image',
            content: '<div class="title-services"><h4 class="subtitle-services">Mudbrick Restaurant </h4><img src="assets/wild.jpg" alt=""><h4 class="subtitle-serv-2">82 Onetangi Rd, Waiheke Island, Auckland 1971</h4><p><br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry</p></div>',
            //content: '<div class="title-services"><h4 class="subtitle-services">Mudbrick Restaurant</h4><img src="assets/wild.jpg" alt=""><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry</p></div>',
            //content: '<div>Mudbrick Restaurant <img src="assets/mudbrick.jpg" alt=""><p>some content</p></div>',
            //latlng: [-36.79370108502259,174.99639272689816]
            //popImage:'<img src="assets/mudbrick.jpg" alt="">'
            }
        },{
            latlng: [ -36.814644595827744, 175.1272201538086],
            description: 'Charlie Farleys',
            iconImage: 'assets/restaurant.svg',

            popup: {
                className: 'custom-popup-image',
                content: '<div class="title-services"><h4 class="subtitle-services">Delight Cafe</h4><img src="assets/wild.jpg" alt=""><h4 class="subtitle-serv-2">82 Onetangi Rd, Waiheke Island, Auckland 1971</h4><p><br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry</p></div>',
                //content: '<div class="title-services"><h4 class="subtitle-services">Delight Cafe</h4><img src="assets/wild.jpg" alt=""><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry</p></div>',
              //  content: '<div>Delight Cafe <img src="assets/charly.jpg" alt=""><p>some content</p></div>',
                //latlng: [-36.79370108502259,174.99639272689816]
               // popImage:'<img src="assets/charly.jpg" alt="">'
            }
        },{
            latlng: [   -36.78674155502898, 175.10353088378906],
            description: 'Poderi Crisci',
            iconImage: 'assets/restaurant.svg', 
            popup: {
                className: 'custom-popup-image',
                content: '<div class="title-services"><h4 class="subtitle-services">Poderi Crisci</h4><img src="assets/wild.jpg" alt=""><h4 class="subtitle-serv-2">82 Onetangi Rd, Waiheke Island, Auckland 1971</h4><p><br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry</p></div>',
                 //content: '<div class="title-services"><h4 class="subtitle-services">Poderi Crisci</h4><img src="assets/wild.jpg" alt=""><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry</p></div>',
                //content: '<div>Poderi Crisci <img src="assets/podpod.jpg" alt=""><p>some content</p></div>',
                //latlng: [-36.79370108502259,174.99639272689816]
                //popImage:'<img src="assets/podpod.jpg" alt="">'
            }
        }


    ];


    _(services).each(function(service) {

        let serviceIcon = L.divIcon({
            className: 'restaurant',
            iconAnchor: [-5, 15],
            iconSize: [150, 40],
          //  html: '<div></div><div class="test">' + service.description + '</div>'
            html: '<div></div><div class="test"></div>'


        }); //here you generate the icon



        let marker = L.marker(service.latlng, {icon: serviceIcon}).addTo(map);

        let popup = L.popup({
                        closeButton: false,
                        closeOnClick: false,
                        //closeButton: false,
                       // closeOnClick: true,
                        //autoClose: true,
                        className: service.popup.className,
                        offset: [0,15]
                    })
                    .setLatLng(service.latlng)
                    .setContent(service.popup.content);
                    //.setContent(service.popup.content + service.popup.popImage + service.description )

        marker.on('click', function() {
            if (map.hasLayer(popup)) {
                //hide it
                map.closePopup(popup);
            } else {
                //show it
                map.addLayer(popup);
            }
        });

        // marker.bindPopup('<div class="restaurant-popup-container"><div class="restaurant-popup">' + service.description + '</div><div class="custom-popup-image">'+service.popup.popImage+'</div><div class="restaurant-text">vlachbajfkjb</div></div></div>') //ask trung to style the cescription

        // L.marker(service.latlng,{icon:serviceIcon}).addTo(map);  //use underscore so that you dont need to use loop in this to locate all the cafes
    });
   



   




//----------bus stop-------


    // let busStops = [{
    //     latlng: [-36.79222331176837, 175.086407661438],
    //     description: 'Grey Lynn'
    // }, {
    //     latlng: [-36.79394165006366, 175.08726596832275],
    //     description: 'Northern Express'
    // }];


    // _(busStops).each(function(busStop) {
    //     L.circle(busStop.latlng, {
    //         radius: 1,
    //         color: 'red',
    //     }).addTo(map);

    //     var busStopIcon = L.divIcon({
    //         className: 'bus-stop',
    //         iconAnchor: [-5, 15],
    //         iconSize: [100, 30],
    //         html: '<div></div><div class="test">' + busStop.description + '</div>'

    //     });

    //     let marker = L.marker(busStop.latlng, {
    //         icon: busStopIcon
    //     }).addTo(map);

   

    // });

//---bus stop end-----------


//--------------cafe icon ---------

//cafe icon------------
    let iconCafeLandmarks = [{
            latlng: [-36.78058914782297,175.0081729888916],
            // 175.08587121963498,
            // -36.792987977069316
            description: 'Delight Cafe',
            iconImage: 'assets/coffee.svg',

             popup: {
                className: 'custom-popup-image',
                content: '<div class="title-services cafe"><h4 class="subtitle-services">Delight Cafe</h4><img src="assets/wild.jpg" alt=""><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry</p></div>',
               // content: '<div>Delight Cafe <img class="delight" src="assets/cafe1.jpg" alt=""></div>',
                //latlng: [-36.792524023752335, 175.0859785079956]
                //popImage:'<img class="delight" src="assets/cafe1.jpg" alt="">'
            }
        },
         {
           latlng: [-36.81849249325732,175.14284133911133],
            // 175.08587121963498,
            // -36.792987977069316
            description: 'Hot Shot Espresso',
            iconImage: 'assets/coffee.svg',

             popup: {
                className: 'custom-popup-image',
                content: '<div class="title-services cafe"><h4 class="subtitle-services">Hot Shot Espresso</h4><img src="assets/wild.jpg" alt=""><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry</p></div>',
               // content: '<div>Delight Cafe <img class="delight" src="assets/cafe1.jpg" alt=""></div>',
                //latlng: [-36.792524023752335, 175.0859785079956]
                //popImage:'<img class="delight" src="assets/cafe1.jpg" alt="">'
            }
        }, {
            latlng: [ -36.8015877880853,175.10936737060547],
            // 175.08587121963498,
            // -36.792987977069316
            description: 'Fenice Cafe',
            iconImage: 'assets/coffee.svg',

             popup: {
                className: 'custom-popup-image',
                content: '<div class="title-services cafe"><h4 class="subtitle-services">Fenice Cafe</h4><img src="assets/wild.jpg" alt=""><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry</p></div>',
               // content: '<div>Delight Cafe <img class="delight" src="assets/cafe1.jpg" alt=""></div>',
                //latlng: [-36.792524023752335, 175.0859785079956]
                //popImage:'<img class="delight" src="assets/cafe1.jpg" alt="">'
            }

        }
    ];


    _(iconCafeLandmarks).each(function(iconCafeLandmark) {
        // L.polygon(landmark.latlngs,{color:'salmon',weight:1}).addTo(map);
        let icon = L.icon({
            iconUrl:iconCafeLandmark.iconImage,
            iconSize:[30,30]
        });

      let markerCafe = L.marker(iconCafeLandmark.latlng,{icon:icon}).addTo(map);

        let popup = L.popup({
                closeButton: false,
                closeOnClick: false,
                className: iconCafeLandmark.popup.className,
                offset: [0, 15]
            })
            .setLatLng(iconCafeLandmark.latlng)
           // .setContent(iconCafeLandmark.popup.content + iconCafeLandmark.popup.popImage);
            .setContent(iconCafeLandmark.popup.content);
            //.addTo(map);


        markerCafe.on('click', function() {
            if (map.hasLayer(popup)) {
                //hide it
                map.closePopup(popup);
            } else {
                //show it
                map.addLayer(popup);
            }
        })
    });


//--------------------------cafe icon end------



    //landmarks = whole region using polygon
    // let landmarks = [{
    //     name: 'The Cloud',
    //     latlngs: [

    //         [-36.792524023752335, 175.0859785079956],
    //         [-36.792764592489654, 175.08602142333984],
    //         [-36.79297079366323, 175.08611798286438],
    //         [-36.793194177641624, 175.0863218307495],
    //         [-36.79355502730767, 175.08666515350342],
    //         [-36.79341756096865, 175.08692264556885],
    //         [-36.793039527264426, 175.0867509841919],
    //         [-36.792678675170194, 175.08651494979856],
    //         [-36.792524023752335, 175.0859785079956]

    //     ],
    //     popup: {
    //         className: 'custom-popup',
    //         content: '<div>The Cloud</div>',
    //         latlng: [-36.792524023752335, 175.0859785079956]
    //     }
    // }, {
    //     name: 'Ferry Building',
    //     latlngs: [

    //         [

    //             -36.79444855249859,
    //             175.08469104766846
    //         ],
    //         [

    //             -36.79480080475769,
    //             175.08504509925842
    //         ],
    //         [

    //             -36.79517023831359,
    //             175.08556008338928
    //         ],
    //         [

    //             -36.795032774873015,
    //             175.0858497619629
    //         ],
    //         [

    //             -36.79472348122981,
    //             175.0857639312744
    //         ],
    //         [

    //             -36.794586016987544,
    //             175.08548498153687
    //         ],
    //         [

    //             -36.79444855249859,
    //             175.08469104766846
    //         ]


    //     ],
    //     popup: {
    //         className: 'custom-popup',
    //         content: '<div>Ferry Building</div><div class="test2"></div>',
    //         latlng: [-36.79444855249859, 175.08469104766846]
    //     }
    // }];


    // _(landmarks).each(function(landmark) {
      
    //     let polygon = L.polygon(landmark.latlngs, {
    //         color: 'salmon',
    //         weight: 1
    //     }).addTo(map);

    //     let popup = L.popup({
    //             closeButton: false,
    //             closeOnClick: false,
    //             className: landmark.popup.className,
    //             offset: [0, 0]
    //         })
    //         .setLatLng(landmark.popup.latlng)
    //         .setContent(landmark.popup.content)
    //         .addTo(map);


    //     polygon.on('click', function() {
    //         if (map.hasLayer(popup)) {
    //             //hide it
    //             map.closePopup(popup);
    //         } else {
    //             //show it
    //             map.addLayer(popup);
    //         }
    //     });




    // });

    //--------
    // let trackLatLngs = [
    //       [-36.78171483466245,175.04176497459412],
    //       [-36.78115628982396,175.04195809364316],
    //       [-36.78126799911731,175.04204392433167],
    //       [-36.78130237117481,175.04212975502014],
    //       [-36.78064070636012,175.04531621932983],
    //       [-36.78061492709588,175.04604578018188],
    //       [-36.780761009478574,175.04642128944397],
    //       [-36.78097583600615,175.0469470024109],
    //       [-36.78089849852559,175.0471830368042],
    //       [-36.78074382333036,175.04759073257446],
    //       [-36.78072663717829,175.04811644554138],
    //       [-36.78076960255124,175.04866361618042],
    //       [-36.781001615148995,175.0491678714752],
    //       [-36.781113324667785,175.04928588867188]
    //     ];

    // L.polyline(trackLatLngs,{weight:3, color:'red'}).addTo(map);


//---------------

let tracks = [
    {
        info:'Track 1',
        latlngs: [
          [-36.78081256790011,175.0490069389343],
          [-36.781087545562514,175.04922151565552],
          [-36.781345336225, 175.0494146347046],
          [-36.78165468387542, 175.0495433807373],
          [-36.78198121615179,175.04962921142578],
          [-36.78203277375246,175.04977941513062],
          [-36.78222181799151, 175.04990816116333],
          [-36.782651462255124,175.05007982254028],
          [-36.78311547535443, 175.050208568573],
          [ -36.78325296017764,
            175.05033731460568,
            
          ],
          [ -36.783304516922755,
            175.05080938339233
           
          ],
          [ -36.7833904447542,
            175.0514316558838
           
          ],
          [-36.78344200140682,
            175.05192518234253
            
          ],
          [
            
            -36.78352792908411,
             175.05265474319458
          ],
          [
           
            -36.78352792908411,
            175.05308389663696
          ],
          [
            
            -36.783631042169695,
            175.05364179611203
          ],
          [
           
            -36.783545114608,
             175.05426406860352
          ],
          [
          
            -36.78340763030892,
             175.0549077987671
          ],
          [ -36.783304516922755,
            175.05553007125854
         
          ],
          [
          
            -36.78318421779686,
            175.05625963211057
          ],
          [-36.78299517593179,
            175.0566029548645
       
          ],
          [
            
            -36.782909247657145,
             175.05694627761838
          ],
          [
            
            -36.783098289734184,
            175.05707502365112
          ],
          [ -36.78337325919563,
            175.05741834640503
         
          ],
          [-36.78368259866044,
            175.05769729614258
          
          ],
          [-36.78388882427663,
            175.05799770355225
          
          ],
          [ -36.78424971776957,
            175.05846977233887
          
          ],
          [ -36.784541868399984,
            175.05879163742065
       
          ],
          [
         
            -36.784679350664206,
             175.05904912948608
          ],
        ]
    }
    ,
    {
        info:'Track 2',
        latlngs:[ 
          [-36.83498129111476,175.0884246826172],
          [-36.8342256322464,175.08773803710938],
          [-36.833263873799275,175.08679389953613],
          [-36.83243949979178,175.08687973022458],
          [-36.83168381581405,175.0869655609131],
          [-36.831134222777955,175.08627891540527],
          [-36.831134222777955,175.0850772857666],
          [-36.83106552337082,175.08301734924316],
          [-36.83037852590646,175.08087158203125],
          [-36.83003502486083,175.07932662963867],
          [-36.82989762401074,175.07692337036133],
          [-36.82872970682175,175.074348449707],
          [-36.82783658164749,175.07306098937985],
          [-36.82714955518828,175.07288932800293],
          [-36.82639381895796,175.0736618041992],
          [-36.825981596049814,175.0747776031494],
          [-36.825088438796875,175.0748634338379],
          [-36.82398915401997,175.07563591003415],
          [-36.822889853450945,175.07640838623047],
          [-36.822615025841195,175.0758934020996],
          [-36.82220278257596,175.0736618041992],
          [-36.821309581216305,175.07246017456055],
          [-36.81993540492194,175.07203102111816],
          [-36.81856120395344,175.07125854492188],
          [-36.817599248594554,175.0708293914795],
          [-36.816843418045316,175.0710868835449],
          [-36.816156292887435,175.07134437561035],
          [-36.81560658831996,175.0718593597412],
          [-36.814782024066815,175.0722885131836],
          [-36.814163595048,175.07177352905273],
          [-36.81423230963016,175.0711727142334],
          [-36.813476445834006,175.07014274597168],
          [-36.81265185863528,175.0693702697754],
          [-36.81189597923382,175.06876945495605],
          [-36.811277526899595,175.06799697875977],
          [-36.81079650496334,175.06619453430176],
          [-36.81052163392852,175.0638771057129],
          [-36.809834452023935,175.06293296813965],
          [-36.80935342102083,175.06173133850098]
        ]

    }
];
        



    _(tracks).each(function(track) {

         L.polyline(track.latlngs,{weight:3, color:'red'}).addTo(map);

        // L.polygon(landmark.latlngs,{color:'salmon',weight:1}).addTo(map);
        let icon = L.icon({
            iconUrl:'assets/walkA.svg',
            iconSize:[30,30]
        });

         let iconEnd = L.icon({
            iconUrl:'assets/flag.svg',
            iconSize:[30,30]
        });

        let markerTrack = L.marker(track.latlngs[0],{icon:icon}).addTo(map);

        let lastIndex = track.latlngs.length -1;

        let markerTrackEnd = L.marker(track.latlngs[lastIndex],{icon:iconEnd}).addTo(map);

        let popup = L.popup({
                closeButton: false,
                closeOnClick: false,
                className: 'start-popup',
                offset: [0, 0]
            })
            .setLatLng(track.latlngs[0])
           // .setContent('start')
            .setContent('<div class="start-container">START</div>')
        

        markerTrack.on('click', function() {
            if (map.hasLayer(popup)) {
                //hide it
                map.closePopup(popup);
            } else {
                //show it
                map.addLayer(popup);
            }
        })

        let popupEnd = L.popup({
                closeButton: false,
                closeOnClick: false,
                className: 'end-popup',
                offset: [0, 0]
            })
            .setLatLng(track.latlngs[lastIndex])
            .setContent('<div class="start-container">END</div>')
            //.setContent('End');

        markerTrackEnd.on('click', function() {
            if (map.hasLayer(popupEnd)) {
                //hide it
                map.closePopup(popupEnd);
            } else {
                //show it
                map.addLayer(popupEnd);
            }
        })



        
    });


});





