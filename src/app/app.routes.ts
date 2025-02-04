import { Routes } from '@angular/router';
import { LandingPageComponent } from './landingpage/landingpage.component';
import { LoginpanelComponent } from './loginpanel/loginpanel.component';
import { LogoutComponent } from './logout/logout.component';
import { authGuard } from './services/auth.guard';
import { RegisterComponent } from './register/register.component';
import { noAuthGuard } from './services/no-auth.guard';
import { AccountsComponent } from './accounts/accounts.component';
import { AddaccountComponent } from './addaccount/addaccount.component';
import { SchedulerComponent } from './scheduler/scheduler.component';

export const routes: Routes = [
    {path:'login',component:LoginpanelComponent, canActivate: [noAuthGuard]},
    {path:'register',component:RegisterComponent, canActivate: [noAuthGuard]},
    {path:'logout',component:LogoutComponent, canActivate: [authGuard]},
    {path:'accounts',component:AccountsComponent, canActivate: [authGuard]},
    {path:'addaccount',component:AddaccountComponent, canActivate: [authGuard]},
    {path:'scheduler',component:SchedulerComponent, canActivate: [authGuard]},
    {path:"",component:LandingPageComponent},
    {path:"**",redirectTo:""}
];
