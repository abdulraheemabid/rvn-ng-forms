import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationInterceptor } from './interceptors/notification/notification.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner/spinner.interceptor';
import { DataExtractionInterceptor } from './interceptors/data-extraction/data-extraction.interceptor';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { RvnComponentsModule } from '@abdulraheemabid/rvn-pkg-ng-core';
import { BoolDefinitionRendererComponent, BoolInputRendererComponent, BoolValueRendererComponent, RvnServicesModule } from '@abdulraheemabid/rvn-pkg-ng-forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RvnComponentsModule,
    RvnServicesModule.forRoot(
      { restBaseUrl: environment.restBaseUrl },
      //Example: override typemeta config for any type
      // {
      //   bool: {
      //     typeDisplayName: "Boolean",
      //     inputRenderers: [
      //       { UIControl: "TOGGLE", renderer: BoolInputRendererComponent },
      //     ],
      //     valueRenderers: [{ renderer: BoolValueRendererComponent }],
      //     definitionRenderer: BoolDefinitionRendererComponent
      //   }
      // } as any
    ),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DataExtractionInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
