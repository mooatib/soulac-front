import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { IsLoggedGuard } from './guards/is-logged.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterFormComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [IsLoggedGuard],
    children: [
      {
        path: '',
        component: UserDashboardComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
