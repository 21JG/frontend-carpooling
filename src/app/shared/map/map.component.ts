import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  @Output() mapClick: EventEmitter<any> = new EventEmitter<any>();
  public map: google.maps.Map | undefined;
  public lat: number = 6.14983552114;
  public lng: number = -75.3657935857;
  public zoom: number = 13;

  public startMarker: google.maps.Marker | undefined;
  public endMarker: google.maps.Marker | undefined;
  public polyline: google.maps.Polyline | undefined; // Path

  @Input() set markers(markers: { lat: string, lng: string, title: string }[]) {
    if (markers) {
      this.createMap();
      markers.forEach((route, index) => {
        if (index === 0 || index === markers.length - 1) {
          this.addMarker(route);
        } else {
          this.addMarker(route, false);
        }
      });
      this.drawPath(markers);
    }
  }

  private createMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: this.lat, lng: this.lng },
      zoom: this.zoom,
    };
    this.map = new google.maps.Map(document.getElementById('minimap'), mapOptions);
  }

  ngOnInit() {
    this.createMap();
    this.map?.addListener('click', (event) => this.onMapClick(event));
  }

  public addMarker(markerData: { lat: string, lng: string }, visible: boolean = true): void {
    if (this.map) {
      const lat = parseFloat(markerData.lat);
      const lng = parseFloat(markerData.lng);

      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: this.map,
          visible: visible,
        });
      } else {
        console.error('Invalid latitude or longitude:', markerData);
      }
    }
  }


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



  onMapClick(event: google.maps.MouseEvent) {
    const latitude = event.latLng?.lat();
    const longitude = event.latLng?.lng();

    if (latitude && longitude) {
      this.mapClick.emit({ lat: latitude, lng: longitude });
    }
  }



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
