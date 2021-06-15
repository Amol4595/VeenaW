import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';

  @Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
  export class MapsComponent implements OnInit {

    map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/light-v10';
    constructor() { 
    (mapboxgl as typeof mapboxgl).accessToken  = environment.mapbox.accessToken;
  }

  ngOnInit(): void {

    this.map = new mapboxgl.Map({
    container: 'map', 
    style: this.style ,
    center: [77.0685,28.7186],
        zoom: 7,
        minZoom: 1.5,
    });

    this.map.on('load',()=>
    {
      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.addSource('points', {
        type: "geojson",
        data: {
          type : 'FeatureCollection',
          features : [{

              type : "Feature",
              properties: {
                
                title : '2',
                text  : 'Delhi ',
                days  : '2 nights'
              },
              geometry: {
                type : "Point",
                coordinates : [ 77.1025 , 28.7041 ]
              }
            },
            {
              type: "Feature",
              properties: {
      
                title : '1',
                text  : 'Agra ',
                days  : '1 night'
              },
              geometry : {
                type   : "Point",
                coordinates : [ 78.0081 , 27.1767 ]
                
              }
            },
            {
              type : "Feature",
              properties : {
                
                title : '1',
                text  : 'Ranthambore',
                days  : '1 nights'
              },
              geometry : {
                type: "Point",
                coordinates : [ 76.5026 , 26.0173 ]
              }
            },
             {
              type : "Feature",
              properties : {
               
                title : '3',
                text  : 'Jaipur', 
                days  : '3 nights'
              },
              geometry : {
                type : "Point",
                coordinates : [ 75.78737 , 26.9124 ]
              }
            },  
            {
              type : "Feature",
              properties : {},
              geometry : {
                type : "LineString",
                coordinates : [ 
                  [ 77.1025 , 28.7041 ],
                  [ 78.0081 , 27.1767 ]
                ]
              }
            },
            {
              type : "Feature",
              properties : {},
              geometry : {
                type : "LineString",
                coordinates : [
                  [78.0081,27.1767 ],
                  [76.5026,26.0173]
                ]
              }
            },
            {
              type : "Feature",
              properties : {},
              geometry : {
                type : "LineString",
                coordinates : [
                  [ 76.5026 , 26.0173],
                  [ 75.78737 , 26.9124]
                ]
              }
            }, 
          ]
        }
  });
      
      
    this.map.addLayer({
      id     : 'location',
      type   : 'circle',
      source : 'points',
      filter : ['==', '$type', 'Point'],
      paint  : {
       'circle-color': 'black',
       'circle-stroke-width':10,
       'circle-stroke-color':'black',
       'circle-radius': 2  
      }
  });
     
      
    this.map.addLayer({
      id     : 'line',
      type   : 'line',
      source : 'points',
      paint: {
       'line-color': '#00008B',
       'line-width': 2,
      }
  });

    this.map.on('click', (event) =>{
    const res = this.map.queryRenderedFeatures(event.point,{layers:['location']});
    console.log(res);
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
         type : 'geojson',
         data :
        {  
           type : 'FeatureCollection',
           features :[
            {
               type : "Feature",
               properties : {},
               geometry : {
                 type : "LineString",
                 coordinates : [
                  [ 77.1025 , 28.7041 ],
                  [ 78.0081 , 27.1767 ]
                ]
              }
            },
          ]
        }
    })
      
      this.map.addLayer({
         id : 'aeroplane-layer',
         type: 'symbol',
         source : 'path',
         layout : {
          'symbol-placement'   : 'line',
          'symbol-spacing'     : 2,
          'icon-allow-overlap' : true,
          'icon-image' : 'aeroplane',
          'icon-size'  : 0.095,
          'visibility' : 'visible',
        },
         paint : {
          'icon-color':'#ffffff'
          }
      });
    })
  })
 }
}
