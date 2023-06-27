import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, SPINNER } from 'ngx-ui-loader'

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FullComponent } from './layouts/full/full.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './shared/material-module';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor:'#FFFFFF',
  textPosition: 'center-center',
  pbColor: 'red',
  bgsColor: 'red',
  fgsColor: 'red',
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BestSellerComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoginComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [HttpClientModule, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
