import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  doctor: Doctor= new Doctor();
  outputdoc: any;
  outputpat: any;
  drs!: Doctor[];
  doctorshow!: String;

  constructor(private route: ActivatedRoute, private doctorService: DoctorService, private patientService: PatientService) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  private getDoctors()
  {
    this.doctorService.getDoctorList().subscribe(data => {
      this.drs= data
    });
  }

  onSubmit()
  {
    this.getDoctorByName();
    this.getPatientAttended();
  }

  getDoctorByName() {
    this.doctorService.getDoctorByName(this.doctor.drName).subscribe(data => { 
      this.outputdoc = data 
    });
  }

  getPatientAttended() {
    this.patientService.getPatientAttended(this.doctor.drName).subscribe(data => {
      this.outputpat = data['count']
    });
  }

}
