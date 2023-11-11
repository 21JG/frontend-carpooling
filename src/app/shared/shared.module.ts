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
      apiKey: ''
    }),
  ]
})
export class SharedModule{}
