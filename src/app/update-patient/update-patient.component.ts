import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {

  ptId!: number;
  drId!: number;
  patient: Patient= new Patient();
  doctor: Doctor= new Doctor();
  doctors!: Doctor[];

  constructor(private patientService: PatientService, private doctorService: DoctorService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ptId= this.route.snapshot.params['id'];
    this.patientService.getPatientById(this.ptId).subscribe(data => {
      this.patient= data;
    }, error => console.log(error));
    this.getDoctors();
  }

  private getDoctors()
  {
    this.doctorService.getDoctorList().subscribe(data => {
      this.doctors= data
    });
  }

  onSubmit()
  {
    this.patientService.updatePatient(this.ptId, this.patient).subscribe(data => {
      this.goToPatientList();
    },
    error => console.log(error));
  }

  goToPatientList()
  {
    this.router.navigate(['/patients']);
  }

}
