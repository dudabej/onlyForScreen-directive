import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScreenWidthModule } from './responsive-screen/screen-width.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ScreenWidthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
