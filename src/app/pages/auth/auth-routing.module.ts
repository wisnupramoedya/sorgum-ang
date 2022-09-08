// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AnonymousGuard } from 'src/app/guards/anonymous.guard';
// import { AuthComponent } from './auth.component';
// import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
// import { OtpForgetPasswordComponent } from './pages/otp-forget-password/otp-forget-password.component';
// import { SigninComponent } from './pages/signin/signin.component';
// import { SignupComponent } from './pages/signup/signup.component';

// const routes: Routes = [
//   { 
//     path: '', 
//     component: AuthComponent,
//     canActivateChild:[AnonymousGuard],
//     children:[
//       {
//         path:'',
//         redirectTo:'sign-in',
//         pathMatch:'full'
//       },
//       {
//         path:'sign-in',
//         component:SigninComponent
//       },
//       {
//         path:'sign-up',
//         component:SignupComponent
//       },
//       {
//         path:'forget-password',
//         component:ForgetPasswordComponent
//       },
//       {
//         path:'reset-password',
//         component:OtpForgetPasswordComponent
//       },
//     ]
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class AuthRoutingModule { }
