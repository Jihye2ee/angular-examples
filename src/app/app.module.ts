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
import { LoginComponent } from './login/login.component';
import { AuthService } from './common/services/auth.service';
import { StudiesComponent } from './studies/studies.component';
import { StudiesService } from './common/services/studies.service';
import { ExcelService } from './common/services/excel.service';
import { AutoSearchComponentComponent } from './auto-search-component/auto-search-component.component';
import { OptionComponent } from './auto-search-component/option/option.component';
import { AutocompleteComponent } from './auto-search-component/complete/auto-complete.component';
import { FilterPipe } from './auto-search-component/filer.pipe';
import { AutocompleteContentDirective } from './auto-search-component/auto-complete-content.directive';
import { AutocompleteDirective } from './auto-search-component/auto-complete.directive';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent },
    {path: 'home', component: HomeComponent },
    {path: 'workers', component: WebWorkerComponent},
    {path: 'studies', component: StudiesComponent},
    {path: 'auto', component: AutoSearchComponentComponent},
];
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UserTableComponent,
        NewUserComponent,
        WebWorkerComponent,
        LoginComponent,
        StudiesComponent,
        AutoSearchComponentComponent,
        OptionComponent,
        AutocompleteComponent,
        FilterPipe,
        AutocompleteContentDirective,
        AutocompleteDirective
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
    providers: [
        AuthService,
        StudiesService,
        ExcelService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
