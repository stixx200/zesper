import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRouterModule } from './core/router.module';
import { SharedModule } from './shared/shared.module';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrdersComponent } from './orders/orders.component';
import { GraphQLModule } from './apollo.config';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth/auth.service';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    LoginComponent,
    PageNotFoundComponent,
    OrdersComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    GraphQLModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
