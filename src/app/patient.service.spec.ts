import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PatientService } from './patient.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Patient } from './patient';

describe('PatientService', () => {
  let service: PatientService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientService]
    });
    service = TestBed.inject(PatientService);
  });

  beforeEach(() => {
    service= TestBed.get(PatientService);
    httpTestController= TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestController.verify();
  });

  it('should test HttpClient.get', () => {
    const testPost: Patient[]= [
      {ptId: 1, ptName:'Akash Ganguly', visitedDoctor:'Sukriti Dhar', dateOfVisit:'15/01/2022'},
      {ptId: 2, ptName:'XYZ', visitedDoctor:'ABC', dateOfVisit:'10/01/2022'}
    ];
    service.getPatientList().subscribe((posts) => {
      expect(testPost).toBe(posts, 'should checked mocked data');
    });
    const req= httpTestController.expectOne(service.baseURL);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(testPost);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add post and return added post', () => {
    const newPost: Patient= 
    {ptId: 1, ptName:'Akash Ganguly', visitedDoctor:'Sukriti Dhar', dateOfVisit:'15/01/2022'};
    service.createPatient(newPost).subscribe((addedPost) => {
      expect(addedPost).toBe(newPost);
    });
    const req= httpTestController.expectOne(service.baseURL);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(newPost);
  });

  it('should test 404 error', () => {
    const errorMsg= 'mock 404 error ocured';
    service.getPatientList().subscribe(
      (data) => {
        fail('failing with 404 error');
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toEqual(errorMsg);
      }
        );
        const req= httpTestController.expectOne(service.baseURL);
        req.flush(errorMsg, {status: 404, statusText: 'Not found'});
  });

});
