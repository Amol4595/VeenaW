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
      zoom: 7,
      minZoom: 1.5
    });

    this.map.on("load", () => {
      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                title: "3",
                text: "Delhi ",
                days: "2 nights",
                name: 'circle1',

              },
              geometry: {
                type: "Point",
                coordinates: [77.1025, 28.7041]
              }
            },
            {
              type: "Feature",
              properties: {
                title: "3",
                text: "Agra ",
                days: "1 night",
                name: 'circle1'
              },
              geometry: {
                type: "Point",
                coordinates: [78.0081, 27.1767]
              }
            },
            {
              type: "Feature",
              properties: {
                title: "3",
                text: "Ranthambore",
                days: "1 nights",
                name: 'circle1'
              },
              geometry: {
                type: "Point",
                coordinates: [76.5026, 26.0173]
              }
            },
            {
              type: "Feature",
              properties: {
                title: "3",
                text: "Jaipur",
                days: "3 nights",
                name: 'circle1'
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
                  [75.78737, 26.9124]
                ]
              }
            },
            
          ]
        }
      });

      this.map.addLayer({
        id: "location",
        type: "circle",
        source: "points",
        paint: {
          "circle-color": "black",
          "circle-stroke-width": 10,
          "circle-stroke-color": "black",
          "circle-radius": 2,
          'circle-opacity': 0.5,
         
        }
      });
      
   /*   this.map.addLayer({
        'id': 'location_hover',
        'type': 'circle',
        'source': 'points',     
        'paint': {
            'circle-radius': 2,
            'circle-opacity': 0.5,
            'circle-stroke-color': '#FF6666',
            'circle-stroke-width': 4,
            'circle-color': '#6666FF'
        },
        "filter": ["==", "name", ""]
  });

      this.map.on("mousemove", "location", (e) => {
        this.map.getCanvas().style.cursor = 'pointer';
      this. map.setFilter("location_hover", ["==", "name",e?.features[0]?.properties?.name]);
    });


      this.map.on("mouseleave", "location", () => {
        this.map.getCanvas().style.cursor = '';
        this.map.setFilter("location_hover", ["==", "name", ""]);
    });
*/
      this.map.addLayer({
        id: "points",
        type: "symbol",
        source: "points",
        layout: {
          "text-field": ["get", "text"],
          "text-size": 17,
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
          "line-color": "#00008B",
          "line-width": 3,
          "line-opacity": 0.6,
        
        }
      });

      this.map.on("click", (event) => {
          const res = this.map.queryRenderedFeatures(event.point, { layers: ["location"]});
          const finalRes = res.filter((item) => item?.properties?.days || false);
        
          if (finalRes.length) {
              const popup = new mapboxgl.Popup({ closeButton: false });
              const data  = finalRes[0]?.properties?.text;
              const data2 = finalRes[0]?.properties?.days;
              popup
                .setLngLat(event.lngLat)
                .setHTML(
                  `<h2>${data}</h2>
                <span>${data2}</span>`
                )
                .addTo(this.map);
            }
      });
    });

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
                }
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
            'line-width': 2,
            'line-color': '#000000',
            'line-dasharray': [2, 1],
            }
            });
        }
      );
    });
  }
}
