import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule, JsonpModule} from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { MainComponent } from './main/main.component';
import { MainDetailComponent } from './main-detail/main-detail.component'



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MainDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent },
      { path: 'main/:id', component: MainDetailComponent }
    ])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
