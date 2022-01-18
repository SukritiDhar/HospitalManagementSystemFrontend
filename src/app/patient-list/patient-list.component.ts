import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients!: Patient[];

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
    this.getPatients();
  }

  private getPatients()
  {
    this.patientService.getPatientList().subscribe(data => {
      this.patients= data
    });
  }

  patientDetails(ptId: number)
  {
    this.router.navigate(['patient-details', ptId]);
  }

  updatePatient(ptId: number)
  {
    this.router.navigate(['update-patient', ptId]);
  }

  deletePatient(ptId: number)
  {
    this.patientService.deletePatient(ptId).subscribe(data => {
      console.log(data);
      this.getPatients();
    });
  }

}
