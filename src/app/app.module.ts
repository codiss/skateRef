import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RampBuilderComponent } from './ramp-builder/ramp-builder.component';
import { RampFormEnglishComponent } from './ramp-builder/ramp-form-english.component';
import { RampFormMetricComponent } from './ramp-builder/ramp-form-metric.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavMenuComponent } from './main-page/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { TrickFinderComponent } from './trick-finder/trick-finder.component';

@NgModule({
  declarations: [
    AppComponent,
    RampBuilderComponent,
    RampFormEnglishComponent,
    RampFormMetricComponent,
    MainPageComponent,
    NavMenuComponent,
    HomeComponent,
    TrickFinderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'ramp-builder', component: RampBuilderComponent},
      { path: '', redirectTo: 'ramp-builder', pathMatch: 'full'},
      { path: '**', redirectTo: 'ramp-builder', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
