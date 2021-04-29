import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './components/demo/demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoRoutingModule } from './demo-routing.module';
import { RvnCoreModule } from '../@shared/rvn-core/core.module';



@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    DemoRoutingModule,
    RvnCoreModule
  ]
})
export class DemoModule { }
