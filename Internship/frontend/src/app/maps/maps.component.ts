
import { Component, OnInit } from "@angular/core";
import * as mapboxgl from "mapbox-gl";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.css"]
})

export class MapsComponent implements OnInit {
  map: mapboxgl.Map;
  style = "mapbox://styles/mapbox/light-v10";
  constructor() {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
  }

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      container: "map",
      style: this.style,
      center: [77.0685, 28.7186],
      zoom: 3.5,
      minZoom: 1.9
    });

    this.map.on("load", () => {
      this.map.setLayoutProperty('settlement-label', 'visibility', 'none')
      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              id: 1,
              properties: {
                title: "3",
                text: "Delhi ",
                days: "2 nights",
                id:1
      
              },
              geometry: {
                type: "Point",
                coordinates: [77.1025, 28.7041]
              }
            },
            {
              type: "Feature",
              id:2,
              properties: {
                title: "3",
                text: "Agra ",
                days: "1 night",
                name: 'circle1',
                id:2
              },
              geometry: {
                type: "Point",
                coordinates: [78.0081, 27.1767]
              }
            },
            {
              type: "Feature",
              id:3,
              properties: {
                title: "3",
                text: "Ranthambore",
                days: "1 nights",
                name: 'circle2',
                id:3
               
              },
              geometry: {
                type: "Point",
                coordinates: [76.5026, 26.0173]
              }
            },
            {
              type: "Feature",
              id:4,
              properties: {
                text: "Jaipur",
                days: "3 nights",
                id:4,
               
              },
              geometry: {
                type: "Point",
                coordinates: [75.78737, 26.9124]
              }
            },
            
           
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [
      
                  [78.0081, 27.1767],
                  [76.5026, 26.0173],
                  [75.78737, 26.9124],
                  
                ]
              }
            },
            
            
          ]
        }
      });

    this.map.addLayer({
        id: "circle_layer",
        type: "circle",
        source: "points",
       
        paint: {
          "circle-color": "black",
          "circle-stroke-width": 15,
          "circle-stroke-color": "black",
          "circle-radius": 0,
          'circle-opacity': 1,
            
        }
      })
      
    this.map.addLayer({
        id   : 'circle_layer_hover',
        type : 'circle',
        source : 'points',     
        paint : {
           'circle-radius': 0,
           'circle-opacity': 1,
           'circle-stroke-color': 'red',
           'circle-stroke-width': 15,
           'circle-color': 'red'
       },
       filter: ["==", "id", ""],
 });
    const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
          });

    this.map.on("mousemove", "circle_layer", (e:any) => {
    this.map.getCanvas().style.cursor = 'pointer';
    const res = e.features;
    const finalRes = res.filter((item:any) => item?.properties?.id || false);
    this.map.setFilter("circle_layer_hover", ["==", "id",finalRes[0]?.properties?.id]);
    const coordinates = finalRes[0].geometry.coordinates.slice();
    const data  = finalRes[0]?.properties?.text;
    const data2 = finalRes[0]?.properties?.days;
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
    popup.setLngLat(coordinates).setHTML(
        `<h2>${data}</h2>
        <span>${data2}</span>`
        ).addTo(this.map);
     
    
    });

    this.map.on("mouseleave", "circle_layer", () => {
    this.map.getCanvas().style.cursor = '';
    this.map.setFilter("circle_layer_hover", ["==", "id", ""]);
    popup.remove();
   });
    this.map.addLayer({
        id: "points",
        type: "symbol",
        source: "points",
        layout: {
          "text-field": ["get", "text"],
          "text-size": 12,
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 1.25],
          "text-anchor": "top"
        },
        paint: {
          "text-color": "#fa051d",
          "text-halo-color": "#fff",
          "text-halo-width": 2
        }
      });

    this.map.addLayer({
        id: "line",
        type: "line",
        source: "points",
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        
          },
        paint: {
          "line-color": "#2F4F4F",
          "line-width": 3,
          "line-opacity": 0.6,
        
        }
      });
    });
    this.map.on('load',() =>{

    })

    this.map.on("load", () => {
      this.map.loadImage(
        "https://redbootsdotme.files.wordpress.com/2014/03/airplane-mode-on-icon-0926022143.png",
        (error, image2) => {
          if (error) throw error;
          type ImageProp = HTMLImageElement;
          const imageData = image2 as ImageProp;
          this.map.addImage("aeroplane", imageData);
          this.map.addSource("path", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: [
                      [77.1025, 28.7041],
                      [78.0081, 27.1767]
                    ]
                  }
                },
               
        
                
              ]
            }
          });
          
    this.map.addLayer({
        id: "aeroplane-layer",
        type: "symbol",
        source: "path",
        layout: {
          "symbol-placement": "line",
          "symbol-spacing": 2,
          "icon-allow-overlap": true,
          "icon-image": "aeroplane",
          "icon-size": 0.095,
           visibility: "visible"
            }
          });
    this.map.addLayer({
          'id': 'path',
          'source': 'path',
          'type': 'line',
          'paint': {
          'line-width': 2.5,
          'line-color': '#2F4F4F',
          'line-dasharray': [2, 1],
            }
            });
        }
      );
    });
  }
}