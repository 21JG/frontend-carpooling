import {Component, Input, OnInit} from "@angular/core";


@Component({
  selector:'app-map',
  templateUrl: './map.component.html',
  styleUrls:['./map.component.css']
})



export class MapComponent implements OnInit{
  public map: google.maps.Map | undefined;
  public lat: number = 6.14983552114;
  public lng: number = -75.3657935857;
  public zoom: number = 13; // Set an initial zoom level

  public polyline: google.maps.Polyline | undefined; // Path


  @Input()set markers(markers:{ lat: string, lng: string, title: string }[]){
    if(markers)  {
      this.createMap();
      //markers.forEach(route=>{ this.addMarker(route)})
      markers.forEach((route, index) => {
        // Si es el primer o el último marcador, hacerlo visible
        if (index === 0 || index === markers.length - 1) {
          this.addMarker(route);
        } else {
          // Si no es el primero ni el último, agregar el marcador pero hacerlo invisible
          this.addMarker(route, false);
        }
      });
      this.drawPath(markers);
    }
  }

  private createMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 6.14983552114, lng: -75.3657935857 },
      zoom: this.zoom,
    };
    this.map = new google.maps.Map(document.getElementById('minimap'), mapOptions);
  }
  ngOnInit() {
    this.createMap();
    const origin: { lat: string, lng: string, title: string } = { lat: 'some_lat', lng: 'some_lng', title: 'Some Title' };
    const destination: { lat: string, lng: string, title: string } = { lat: 'some_lat', lng: 'some_lng', title: 'Some Title' };
    // this.drawRoute(origin, destination);
    this.drawRoute(
      { lat: 'some_lat', lng: 'some_lng', title: 'Some Title' },
      { lat: 'some_lat', lng: 'some_lng', title: 'Some Title' },
      'some_color', // Provide a default color value or remove this argument if not needed
      'A' // Provide a default marker letter or remove this argument if not needed
    );
  }
  
// Inside your MapComponent

  public addMarker(markerData: { lat: string, lng: string, title: string }, visible: boolean = true): void {
    if (this.map) {
      const lat = parseFloat(markerData.lat);
      const lng = parseFloat(markerData.lng);

      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = new google.maps.Marker({
          position: {lat, lng},
          map: this.map,
          title: markerData.title,
          visible: visible,
        });
      } else {
        console.error('Invalid latitude or longitude:', markerData);
      }
    }
  }

  /**
   * Método encargado de crear la linea por donde ocurrira la ruta segun su lista de marcadores (posiciones).
   * @param markers 
   */
  public drawPath(markers: { lat: string, lng: string, title: string }[]): void {
    const pathCoordinates = markers.map(marker => ({
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng)
    }));

    if (this.map && pathCoordinates.length >= 2) {
      this.polyline = new google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: '#FF0000', // Color de la línea
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      this.polyline.setMap(this.map);
    }
  }


  // public drawRoute(
  //   origin: { lat: string, lng: string, title: string } ,
  //   destination: { lat: string, lng: string, title: string } ,
  // ): void {
  //   if (this.map) {
  //     const directionsService = new google.maps.DirectionsService();
  //     const directionsRenderer = new google.maps.DirectionsRenderer();
  //
  //     directionsRenderer.setMap(this.map);
  //
  //     const request = {
  //       origin: { lat: parseFloat(origin.lat), lng: parseFloat(origin.lng) },
  //       destination: { lat: parseFloat(destination.lat), lng: parseFloat(destination.lng) },
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     };
  //
  //     directionsService.route(request, (result, status) => {
  //       if (status == 'OK') {
  //         directionsRenderer.setDirections(result);
  //       } else {
  //         console.error('Directions request failed:', status);
  //       }
  //     });
  //   }
  // }
  public drawRoute(
    origin: { lat: string, lng: string, title: string },
    destination: { lat: string, lng: string, title: string },
    color: string = 'default_color',
    markerLetter: string = 'A'
  ): void {
    if (this.map) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

      directionsRenderer.setMap(this.map);

      const request = {
        origin: { lat: parseFloat(origin.lat), lng: parseFloat(origin.lng) },
        destination: { lat: parseFloat(destination.lat), lng: parseFloat(destination.lng) },
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status == 'OK') {
          directionsRenderer.setDirections(result);

          // Customize the route color
          directionsRenderer.setOptions({
            polylineOptions: {
              strokeColor: color,
            },
          });
        } else {
          console.error('Directions request failed:', status);
        }
      });
    }
  }

}
