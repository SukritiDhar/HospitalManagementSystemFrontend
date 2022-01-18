import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  patients: Patient= new Patient();
  constructor(private route: ActivatedRoute, private patientService: PatientService) { }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.getPatientById();
  }

  getPatientById() {
    this.patientService.getPatientById(this.patients.ptId).subscribe(data => { 
      if(data)
      {
        this.patients = data;
      }
      else
      {
        this.patients.ptName="No such patient there in database";
        this.patients.visitedDoctor="";
        this.patients.dateOfVisit="";
      }
    });
  }

}
