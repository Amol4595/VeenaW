import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements OnInit {
   
    map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/streets-v11';
    lat = 13.0569951;
    lng = 80.2092912;
    
 
  constructor() 
  { 
    (mapboxgl as typeof mapboxgl).accessToken  = environment.mapbox.accessToken;
  }

  ngOnInit(): void
  {
    
    this.map = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/streets-v11' ,
      center: [77.1461,12.2602],
      zoom: 5
      });
      
   /*  code */
    this.map.on('load', (event) => {
      this.map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
        if (error) throw error;
        
        type ImageProp = HTMLImageElement
        const imageData  = image as ImageProp;
        this.map.addImage('custom-marker', imageData);
        this.map.addControl(new mapboxgl.NavigationControl());
       this.map.addSource('points', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': [
        {
       
        'type': 'Feature',
        'geometry': {
        'type': 'Point',
        'coordinates': [
          77.5946,12.9716
        ]
        },
        'properties': {
        'title': '2',
        'text':'Banglore',
        'days':'2 nights'
        }
        },
        {
      
        'type': 'Feature',
        'geometry': {
        'type': 'Point',
        'coordinates': [80.2707,13.0287]
        },
        'properties': {
        'title': '3',
        'text':'Chennai', 
        'days':'3 nights'
        }
        },
        {
    
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [74.1240,15.2993 ]
          },
          'properties': {
          'title': '5',
          'text':'Goa ',
          'days':'5 nights'
          }
        },
        {
        
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [75.8577,22.7196 ]
          },
          'properties': {
          'title': '2',
          'text':'Indore ',
          'days':'2 nights'
          }
        },
        
        ]
        }
    });
      this.map.addLayer({
          'id': 'points',
          'type': 'symbol',
          'source': 'points',
          'layout': {
          'icon-image': 'custom-marker',
          'text-field': ['get', 'title'],
          'text-size':17,
          'text-font': [
          'Open Sans Semibold',
          'Arial Unicode MS Bold',
          
          ],
          'text-offset': [0, 1.25],
          'text-anchor': 'top'
          },
          paint: {
            'text-color': '#f16624',
            'text-halo-color': '#fff',
            'text-halo-width': 2
          }
          });
      });


        this.map.on('click', (event) =>
        {
      const res = this.map.queryRenderedFeatures(event.point,{layers:['points']});
      //console.log(res)
      if(res.length)
      {
        const popup = new mapboxgl.Popup({closeButton:false});
        const data = res[0]?.properties?.text;
        const data2= res[0]?.properties?.days;
        popup.setLngLat(event.lngLat).setHTML(`<h2>${data}</h2>
        <span>${data2}</span>`).addTo(this.map);
      }
    })
  })

   this.map.on('load',()=>{
      this.map.loadImage("https://redbootsdotme.files.wordpress.com/2014/03/airplane-mode-on-icon-0926022143.png",(error,image2)=>
      {
        if (error) throw error;
        type ImageProp = HTMLImageElement
        const imageData  = image2 as ImageProp;
        this.map.addImage('aeroplane', imageData);
        this.map.addSource('path', {
          'type': 'geojson',
          'data':
          {  
            'type': 'FeatureCollection',
            'features':[
              {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "LineString",
                  "coordinates": [
                    [75.8577,22.7196 ],
                    [74.1240,15.2993 ],
                  ]
                }
              },

            ]
        }
        })
        
        this.map.addLayer({
          'id': 'aeroplane-layer',
          'type': 'symbol',
          'source': 'path',
          'layout': {
            'symbol-placement': 'line',
            'symbol-spacing': 2,
            'icon-allow-overlap': true,
            'icon-image': 'aeroplane',
            'icon-size': 0.095,
            'visibility': 'visible',
             
          },
          'paint': {
            'icon-color':'#ffffff'
            }
        });
        this.map.addLayer({
          'id': 'path',
          'source': 'path',
          'type': 'line',
          'paint': {
          'line-width': 2,
          'line-color': '#000000',
          'line-dasharray': [2, 1],
          }
          }); 

      })
        
        
      })
      this.map.on('load',()=>{
        this.map.loadImage("https://p.kindpng.com/picc/s/555-5552601_bus-side-bus-side-icon-png-transparent-png.png",(error,image3)=>
        {
          if (error) throw error;
          type ImageProp = HTMLImageElement
          const imageData  = image3 as ImageProp;
          this.map.addImage('arrow', imageData);
          this.map.addSource('route', {
            'type': 'geojson',
            'data':
            {  
              'type': 'FeatureCollection',
              'features':[
                {
                  "type": "Feature",
                  "properties": {},
                  "geometry": {
                    "type": "LineString",
                    "coordinates": [
                      [74.1240,15.2993 ],
                      [77.5946,
                        12.9716
                      ]
                    ]
                  }
                },
                {
                  "type": "Feature",
                  "properties": {},
                  "geometry": {
                    "type": "LineString",
                    "coordinates": [
                      [77.5946,
                        12.9716],
                      [80.2707,
                        13.0287
                      ]
                    ]
                  }
                }
              ]
          }
          })
          
          this.map.addLayer({
            'id': 'arrow-layer',
            'type': 'symbol',
            'source': 'route',
            'layout': {
              'symbol-placement': 'line',
              'symbol-spacing': 2,
              'icon-allow-overlap': true,
              'icon-image': 'arrow',
              'icon-size': 0.09,
              'visibility': 'visible',
               
            },
            'paint': {
              'icon-color':'#ffffff'
              }
          });
          this.map.addLayer({
            'id': 'route',
            'source': 'route',
            'type': 'line',
            'paint': {
            'line-width': 2,
            'line-color': '#000000',
            'line-dasharray': [2, 1],
            }
            }); 
  
        })
        })     
}}
