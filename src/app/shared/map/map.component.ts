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
  public zoom: number = 15; // Set an initial zoom level


  @Input()set markers(markers:{ lat: string, lng: string, title: string }[]){
    if(markers)  {
      this.createMap();
      markers.forEach(route=>{ this.addMarker(route)})

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

  }
// Inside your MapComponent
  public addMarker(markerData: { lat: string, lng: string, title: string }): void {
    if (this.map) {
      const lat = parseFloat(markerData.lat);
      const lng = parseFloat(markerData.lng);

      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = new google.maps.Marker({
          position: {lat, lng},
          map: this.map,
          title: markerData.title
        });
      } else {
        console.error('Invalid latitude or longitude:', markerData);
      }
    }
  }






}
