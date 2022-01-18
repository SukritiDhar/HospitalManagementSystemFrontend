import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  doctors!: Doctor[];

  constructor(private doctorService: DoctorService, private router: Router) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  private getDoctors()
  {
    this.doctorService.getDoctorList().subscribe(data => {
      this.doctors= data
    });
  }

  doctorDetails(drId: number)
  {
    this.router.navigate(['doctor-details', drId]);
  }

  updateDoctor(drId: number)
  {
    this.router.navigate(['update-doctor', drId]);
  }

  deleteDoctor(drId: number)
  {
    this.doctorService.deleteDoctor(drId).subscribe(data => {
      console.log(data);
      this.getDoctors();
    });
  }

}
