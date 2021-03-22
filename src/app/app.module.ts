import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularMaterialsModule} from './common/shared/angular-materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserTableComponent } from './user-table/user-table.component';
import { NewUserComponent } from './user-table/add-user/new-user.component';
import { HttpClientModule } from '@angular/common/http';
import { WebWorkerComponent } from './web-worker/web-worker.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path: 'workers', component: WebWorkerComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserTableComponent,
    NewUserComponent,
    WebWorkerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    BrowserAnimationsModule,
    AngularMaterialsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
