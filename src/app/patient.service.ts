import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from './patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  baseURL= "http://localhost:9099/api/v1/patients";
  output: any;

  constructor(private httpClient: HttpClient) { }

  getPatientList(): Observable<Patient[]>
  {
    return this.httpClient.get<Patient[]>(`${this.baseURL}`);
  }

  createPatient(patient: Patient): Observable<Object>
  {
    return this.httpClient.post(`${this.baseURL}`, patient);
  }

  getPatientById(ptId: number): Observable<Patient>
  {
    return this.httpClient.get<Patient>(`${this.baseURL}/${ptId}`);
  }

  updatePatient(ptId: number, patient: Patient): Observable<Object>
  {
    return this.httpClient.put(`${this.baseURL}/${ptId}`, patient);
  }

  deletePatient(ptId: number): Observable<Object>
  {
    return this.httpClient.delete(`${this.baseURL}/${ptId}`);
  }

  getPatientAttended(visitedDoctor: String): Observable<any>
  {
    return this.httpClient.get(`${this.baseURL}/count/${visitedDoctor}`);
  }

}