import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {

  patient: Patient= new Patient();
  doctor: Doctor= new Doctor();
  doctors!: Doctor[];

  constructor(private patientService: PatientService,private doctorService: DoctorService, private router: Router) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  private getDoctors()
  {
    this.doctorService.getDoctorList().subscribe(data => {
      this.doctors= data
    });
  }

  savePatient()
  {
    this.patientService.createPatient(this.patient).subscribe( data => {
      console.log(data);
      this.goToPatientList();
    },
    error=> console.log(error));
  }

  goToPatientList()
  {
    this.router.navigate(['/patients']);
  }

  onSubmit(){
    this.savePatient();
  }

}
