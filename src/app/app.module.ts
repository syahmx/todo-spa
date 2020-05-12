import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreComponent } from './core/core.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MainComponent } from './core/main/main.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { HomeComponent } from './core/main/home/home.component';
import { ListComponent } from './core/main/list/list.component';
import { TodosComponent } from './core/main/list/todos/todos.component';
import { RemindersComponent } from './core/main/list/reminders/reminders.component';
import { IsTruePipe } from './pipes/is-true.pipe';
import { IsNotTruePipe } from './pipes/is-not-true.pipe';
import { SortReminderPipe } from './pipes/sort-reminder.pipe';
import { SortTaskPipe } from './pipes/sort-task.pipe';
import { EditModalComponent } from './core/main/list/edit-modal/edit-modal.component';
import { CheckExpiryPipe } from './pipes/check-expiry.pipe';
import { AddModalComponent } from './core/main/list/add-modal/add-modal.component';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';
import { NoListComponent } from './core/main/no-list/no-list.component';

export function tokenGetter() {
  return localStorage.getItem('token')
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    CoreComponent,
    MainComponent,
    SidebarComponent,
    HomeComponent,
    ListComponent,
    TodosComponent,
    RemindersComponent,
    IsTruePipe,
    IsNotTruePipe,
    SortReminderPipe,
    SortTaskPipe,
    EditModalComponent,
    CheckExpiryPipe,
    AddModalComponent,
    ConfirmModalComponent,
    NoListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth/']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    EditModalComponent,
    AddModalComponent,
    ConfirmModalComponent
  ]
})
export class AppModule { }
