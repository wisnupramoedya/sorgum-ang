// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { DashboardComponent } from './dashboard.component';
// import { OverviewComponent } from './pages/overview/overview.component';
// import { ParameterComponent } from './pages/parameter/parameter.component';
// import { GreenhouseDetailOverviewResolver } from './resolvers/greenhouse-detail-overview.resolver';

// const routes: Routes = [
//   { 
//     path: ':ghId', 
//     component: DashboardComponent ,
//     children:[
//       {
//         path:'',
//         redirectTo:'overview',
//         pathMatch:'full'
//       },
//       {
//         path:'overview',
//         component:OverviewComponent,
//         resolve:{
//           data:GreenhouseDetailOverviewResolver
//         }
//       },
//       {
//         path:'parameter',
//         component:ParameterComponent,
//       }
//     ]
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class DashboardRoutingModule { }
