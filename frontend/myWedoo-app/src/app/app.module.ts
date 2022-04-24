import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AmountService } from './services/amount.service';
import { RequestInterceptor } from './services/interceptor/http-interceptor.service';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { DesiredAmountDetailComponent } from './components/desired-amount-detail/desired-amount-detail.component';
import { DesiredAmountComponent } from './components/desired-amount/desired-amount.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';


  const MaterialModules = [
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule
  ]

@NgModule({
  declarations: [
    AppComponent,
    DesiredAmountComponent,
    DesiredAmountDetailComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ...MaterialModules
  ],
  providers: [
    AmountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
