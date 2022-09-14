import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from './guards/anonymous.guard';
import { AuthorizeGuard } from './guards/authorize.guard';
import { GreenhouseDetailOverviewResolver } from './pages/dashboard/resolvers/greenhouse-detail-overview.resolver';

const routes: Routes = [
  {
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
  },
  { 
    path: 'auth', 
    // loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    canActivate:[AnonymousGuard ],
    loadComponent: ()=>import('./pages/auth/auth.component').then(x=>x.AuthComponent),
    children:[
      {
        path:'',
        redirectTo:'sign-in',
        pathMatch:'full'
      },
      {
        path: 'sign-in',
        loadComponent: ()=>import('./pages/auth/pages/signin/signin.component').then(x=>x.SigninComponent)
      },
      {
        path: 'sign-up',
        loadComponent: ()=>import('./pages/auth/pages/signup/signup.component').then(x=>x.SignupComponent)
      },
      {
        path: 'forget-password',
        loadComponent: ()=>import('./pages/auth/pages/forget-password/forget-password.component').then(x=>x.ForgetPasswordComponent)
      },
      {
        path: 'reset-password',
        loadComponent: ()=>import('./pages/auth/pages/otp-forget-password/otp-forget-password.component').then(x=>x.OtpForgetPasswordComponent)
      },
    ]
  },
  { 
    path: 'home', 
    // loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) ,
    // canActivate:[AuthorizeGuard]
    loadComponent:()=>import('./pages/home/home.component').then(x=>x.HomeComponent),
    children:[
      {
        path:'',
        redirectTo:'land',
        pathMatch:'full'
      },
      {
        path:'land',
        loadComponent: ()=>import('./pages/home/pages/land-list/land-list.component').then(x=>x.LandListComponent)
      },
      {
        path:'microcontroller',
        loadComponent: ()=>import('./pages/home/pages/microcontroller-list/microcontroller-list.component').then(x=>x.MicrocontrollerListComponent)
      },
      {
        path:'plant',
        loadComponent: ()=>import('./pages/home/pages/plant-list/plant-list.component').then(x=>x.PlantListComponent)
      }
    ]
  },
  { 
    path: 'dashboard/:ghId', 
    // loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) ,
    // canActivate:[AuthorizeGuard]
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(x=>x.DashboardComponent),
    children:[
      {
        path:'',
        redirectTo:'overview',
        pathMatch:'full'
      },
      {
        path:'overview',
        loadComponent: ()=>import('./pages/dashboard/pages/overview/overview.component').then(x=>x.OverviewComponent),
        resolve:{
          data:GreenhouseDetailOverviewResolver
        }
      },
      {
        path:'parameter',
        loadComponent: ()=>import('./pages/dashboard/pages/parameter/parameter.component').then(x=>x.ParameterComponent)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
