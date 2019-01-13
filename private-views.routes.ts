import { Routes, RouterModule } from '@angular/router';
import { PrivateViewsComponent } from "./private-views.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PatientListComponent } from './dashboard/patient-list/patient-list.component';
import { PatientEditComponent } from './dashboard/patient-edit/patient-edit.component';
import { PatientAddComponent } from './dashboard/patient-add/patient-add.component';
import { CareProvidersListComponent } from './dashboard/care-providers-list/care-providers-list.component';
import { CareProviderEditComponent } from './dashboard/care-provider-edit/care-provider-edit.component';
import { CareProviderAddComponent } from './dashboard/care-provider-add/care-provider-add.component';
import { OrganizationComponent } from './dashboard/organization/organization.component';
import { GroupsComponent } from './dashboard/groups/groups.component';
import { GroupEditComponent } from './dashboard/group-edit/group-edit.component';
import { GroupAddComponent } from './dashboard/group-add/group-add.component';
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';
import { AuthGuard } from '../common/services/authorization/authorization.service';

const privateROUTES: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'organization', canActivate: [AuthGuard], component: OrganizationComponent },
      { path: 'patient-list', canActivate: [AuthGuard], component: PatientListComponent },
      { path: 'patient-edit/:id', canActivate: [AuthGuard], component: PatientEditComponent },
      { path: 'patient-add', canActivate: [AuthGuard], component: PatientAddComponent },
      { path: 'care-providers-list', canActivate: [AuthGuard], component: CareProvidersListComponent },
      { path: 'care-provider-edit/:id', canActivate: [AuthGuard], component: CareProviderEditComponent },
      { path: 'care-provider-add', canActivate: [AuthGuard], component: CareProviderAddComponent },
      { path: 'groups', canActivate: [AuthGuard], component: GroupsComponent },
      { path: 'group-edit/:id', canActivate: [AuthGuard], component: GroupEditComponent },
      { path: 'group-add', canActivate: [AuthGuard], component: GroupAddComponent },
      { path: 'change-password', canActivate: [AuthGuard], component: ChangePasswordComponent }
    ]
  },
  { path: '**', redirectTo: '/login' , pathMatch: 'full' }
];

export const privateViewsProviders: any[] = [

];

export const privateRoute =  RouterModule.forChild(privateROUTES);

