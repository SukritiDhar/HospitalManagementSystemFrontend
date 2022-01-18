import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from './doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  public baseURL= "http://localhost:9099/api/v1/doctors";
  private baseURLShow= "http://localhost:9099/api/v1/doctors/show";

  constructor(private httpClient: HttpClient) { }

  getDoctorList(): Observable<Doctor[]>
  {
    return this.httpClient.get<Doctor[]>(`${this.baseURL}`);
  }

  createDoctor(doctor: Doctor): Observable<Object>
  {
    return this.httpClient.post(`${this.baseURL}`, doctor);
  }

  getDoctorById(drId: number): Observable<Doctor>
  {
    return this.httpClient.get<Doctor>(`${this.baseURL}/${drId}`);
  }

  getDoctorByName(drName: String): Observable<Doctor>
  {
    return this.httpClient.get<Doctor>(`${this.baseURLShow}/${drName}`);
  }

  updateDoctor(drId: number, doctor: Doctor): Observable<Object>
  {
    return this.httpClient.put(`${this.baseURL}/${drId}`, doctor);
  }

  deleteDoctor(drId: number): Observable<Object>
  {
    return this.httpClient.delete(`${this.baseURL}/${drId}`);
  }

}
