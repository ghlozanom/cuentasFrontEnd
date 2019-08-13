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
  MdcSelectModule
} from '@angular-mdc/web';
import { RegistriesComponent } from './components/registries/registries.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { NewAccountsComponent } from './components/new-accounts/new-accounts.component';
import { NewInputComponent } from './components/new-input/new-input.component';
import { OutputComponentComponent } from './components/output-component/output-component.component';
import { NewRegistriesComponent } from './components/new-registries/new-registries.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';

@NgModule({
  declarations: [
    AppComponent,
    RegistriesComponent,
    AccountsComponent,
    NewAccountsComponent,
    NewInputComponent,
    OutputComponentComponent,
    NewRegistriesComponent
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
    MdcSelectModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot( reducers , {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
