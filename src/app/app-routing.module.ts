import { NoListComponent } from './core/main/no-list/no-list.component';
import { HomeComponent } from './core/main/home/home.component';
import { CoreComponent } from './core/core.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './core/main/list/list.component';


const routes: Routes = [
  {
    path: 'auth', component: AuthComponent, children: [
      { path: 'login', component: LoginComponent, },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: 'app', component: CoreComponent, children: [
      { path: 'no-list', component: NoListComponent },
      { path: 'list/:listId', component: ListComponent }
    ]
  },
  { path: '', redirectTo: 'app/list/1', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
