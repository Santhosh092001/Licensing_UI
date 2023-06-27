import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

export const routes: Routes = [
  // {
  //   path: 'pages',
  //   loadChildren: () => import('./pages/pages.module')
  //     .then(m => m.PagesModule),
  // },
  // {
  //   path:'authentication',
  //   loadChildren: () => import('./authentication/authentication.module').then(x => x.AuthenticationModule)
  // },
  // {
  //   path:'dialogs',
  //   loadChildren: () => import('./dialogs/dialogs.module').then(x => x.DialogsModule)
  // },
  // { 
  //   path: '',
  //   redirectTo: 'authentication',
  //   pathMatch: 'full' 
  //   },


    // {
    //   path: 'pages',
    //   loadChildren: () => import('./pages/pages.module')
    //     .then(m => m.PagesModule),
    // },
    // {
    //   path: 'auth',
    //   component: NbAuthComponent,
    //   children: [
    //     {
    //       path: '',
    //       loadChildren: () => import('./authentication/authentication.module').then(x => x.AuthenticationModule)

    //     },
    //     {
    //       path: 'login',
    //       loadChildren: () => import('./authentication/authentication.module').then(x => x.AuthenticationModule)
    //     },
    //     {
    //       path: 'register',
    //       component: NbRegisterComponent,
    //     },
    //     {
    //       path: 'logout',
    //       component: NbLogoutComponent,
    //     },
    //     {
    //       path: 'request-password',
    //       component: NbRequestPasswordComponent,
    //     },
    //     {
    //       path: 'reset-password',
    //       component: NbResetPasswordComponent,
    //     },
    //   ],
    // },
    // { path: '', redirectTo: 'authentication', pathMatch: 'full' },
    // { path: '**', redirectTo: 'authentication' },
    {
      path:'authentication',
      loadChildren: () => import('./Modules/authentication/authentication.module').then(x => x.AuthenticationModule)
    },
    {
      path:'pages',
      loadChildren: () => import('./Modules/pages/pages.module').then(x => x.PagesModule)
    },
    {
      path: '',
      redirectTo: 'authentication',
      pathMatch: 'full'
    }
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
