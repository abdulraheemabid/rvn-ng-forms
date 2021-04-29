import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error/error.interceptor';
import { NotificationInterceptor } from './interceptors/notification/notification.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner/spinner.interceptor';
import { RequestTransformerInterceptor } from './interceptors/request-transformer/request-transformer.interceptor';
import { RvnServicesModule } from './@shared/rvn-services/services.module';
import { environment } from 'src/environments/environment';
import { RvnComponentsModule } from './@shared/rvn-core/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    RvnComponentsModule,
    RvnServicesModule.forRoot({
      restBaseUrl: environment.restBaseUrl
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestTransformerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
