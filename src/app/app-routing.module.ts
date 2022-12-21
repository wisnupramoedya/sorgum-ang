import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from './guards/anonymous.guard';
import { AuthorizeGuard } from './guards/authorize.guard';
import { GreenhouseDetailOverviewResolver } from './pages/dashboard/resolvers/greenhouse-detail-overview.resolver';
import { LandIdResolver } from './pages/dashboard/resolvers/land-id.resolver';
import { SensorTypeListResolver } from './resolvers/sensor-type-list.resolver';
import {LandMiniPcComponent} from "./pages/dashboard/pages/land-minipc/land-mini-pc.component";
import {
  UpdateDiseaseMonitorComponent
} from "./pages/dashboard/pages/land-health/update-disease-monitor/update-disease-monitor.component";
import {LandHealthComponent} from "./pages/dashboard/pages/land-health/land-health.component";
import {
  AddDiseaseMonitorComponent
} from "./pages/dashboard/pages/land-health/add-disease-monitor/add-disease-monitor.component";

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
    canActivate:[AuthorizeGuard],
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
        path:'sensor',
        loadComponent: ()=>import('./pages/home/pages/sensor-list/sensor-list.component').then(x=>x.SensorListComponent),
        resolve:{
          sensorTypesData:SensorTypeListResolver,
        }
      },
      {
        path:'plant',
        loadComponent: ()=>import('./pages/home/pages/plant-list/plant-list.component').then(x=>x.PlantListComponent)
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/home/pages/user-list/user-list.component')
          .then(x => x.UserListComponent)
      }
    ]
  },
  {
    path: 'dashboard/:landId',
    // loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) ,
    canActivate:[AuthorizeGuard],
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
          sensorTypesData:SensorTypeListResolver
        }
      },
      {
        path:'region',
        loadComponent: ()=>import('./pages/dashboard/pages/land-region/land-region.component').then(x=>x.LandRegionComponent),
        resolve:{
          landId:LandIdResolver
        }
      },
      {
        path:'minipc',
        loadComponent: ()=>import('./pages/dashboard/pages/land-minipc/land-mini-pc.component').then(x=>x.LandMiniPcComponent),
        resolve:{
          landId:LandIdResolver
        }
      },
      {
        path:'microcontroller',
        loadComponent: ()=>import('./pages/dashboard/pages/land-microcontroller/land-microcontroller.component').then(x=>x.LandMicrocontrollerComponent),
        resolve:{
          landId:LandIdResolver
        }
      },
      {
        path:'sensor',
        loadComponent: ()=>import('./pages/dashboard/pages/land-sensor/land-sensor.component').then(x=>x.LandSensorComponent),
        resolve:{
          landId:LandIdResolver
        }
      },
      {
        path:'parameter',
        loadComponent: ()=>import('./pages/dashboard/pages/parameter/parameter.component').then(x=>x.ParameterComponent)
      },
      {
        path:'actuator',
        loadComponent: ()=>import('./pages/dashboard/pages/land-actuator/land-actuator.component').then(x=>x.LandActuatorComponent)
      },
      {
        path:'camera',
        loadComponent: ()=>import('./pages/dashboard/pages/land-camera/land-camera.component').then(x=>x.LandCameraComponent)
      },
      {
        path: 'healths',
        component: LandHealthComponent,
      },
      {
        path: 'healths/create',
        component: AddDiseaseMonitorComponent
      },
      {
        path: 'healths/:id_health',
        component: UpdateDiseaseMonitorComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
