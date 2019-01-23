import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'app/app-routing.module';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  declarations: [
    AppNavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    RouterModule.forChild([])
  ],
  exports: [
    AppNavbarComponent
  ]
})
export class CoreModule { }
