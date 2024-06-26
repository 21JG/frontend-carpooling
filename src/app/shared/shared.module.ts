import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MapComponent} from "./map/map.component";
import {AgmCoreModule} from "@agm/core";


@NgModule({
  declarations:[
    MapComponent
  ],
  imports:[
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
  ],
  exports:[
    MapComponent,
    CommonModule
  ]
})
export class SharedModule{}
