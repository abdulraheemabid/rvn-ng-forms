import { RvnComponentsModule } from '@abdulraheemabid/rvn-pkg-ng-core';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoComponent } from './components/demo/demo.component';
import { DemoRoutingModule } from './demo-routing.module';



@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    DemoRoutingModule,
    RvnComponentsModule,
    ReactiveFormsModule
  ]
})
export class DemoModule { }
