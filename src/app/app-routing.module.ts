import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { UpdateDoctorComponent } from './update-doctor/update-doctor.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'doctors', component: DoctorListComponent},
  {path: 'patients', component: PatientListComponent},
  {path: 'create-doctor', component: CreateDoctorComponent},
  {path: 'create-patient', component: CreatePatientComponent},
  {path: 'update-doctor/:id', component: UpdateDoctorComponent},
  {path: 'update-patient/:id', component: UpdatePatientComponent},
  {path: 'show-doctor', component: DoctorDetailsComponent},
  {path: 'show-patient', component: PatientDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
