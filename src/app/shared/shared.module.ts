import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MapComponent} from "./map/map.component";
import {AgmCoreModule} from "@agm/core";


@NgModule({
  declarations:[
    MapComponent
  ],
  exports:[
    MapComponent
  ],
  imports:[
    CommonModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBGw40obkq0anZtQ55y7Dl12bns85J-wXw'
    }),
  ]
})
export class SharedModule{}
