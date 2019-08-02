import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { 
  MdcFabModule,
  MdcIconModule,
  MdcMenuModule,
  MdcButtonModule,
  MdcListModule,
  MdcSnackbarModule,
  MdcDialogModule,
  MdcFormFieldModule,
  MdcCardModule,
  MdcTextFieldModule,
  MdcTypographyModule,
  MdcIconButtonModule,
} from '@angular-mdc/web';
import { RegistriesComponent } from './components/registries/registries.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdcFabModule,
    MdcIconModule,
    MdcMenuModule,
    MdcButtonModule,
    MdcListModule,
    MdcSnackbarModule,
    MdcDialogModule,
    MdcCardModule,
    MdcFormFieldModule,
    MdcTextFieldModule,
    MdcTypographyModule,
    MdcIconButtonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
