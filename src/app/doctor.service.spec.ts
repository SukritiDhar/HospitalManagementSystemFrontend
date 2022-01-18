import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DoctorService } from './doctor.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Doctor } from './doctor';

describe('DoctorService', () => {
  let service: DoctorService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DoctorService]
    });
    service = TestBed.inject(DoctorService);
  });

  beforeEach(() => {
    service= TestBed.get(DoctorService);
    httpTestController= TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestController.verify();
  });

  it('should test HttpClient.get', () => {
    const testPost: Doctor[]= [
      {drId: 1, drName:'Sukriti Dhar', age:21, gender:'female', specialistField:'Diabeties Specialist'},
      {drId: 2, drName:'ABC', age:34, gender:'male', specialistField:'All'}
    ];
    service.getDoctorList().subscribe((posts) => {
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
    const newPost: Doctor= 
      {drId: 1, drName:'Sukriti Dhar', age:21, gender:'female', specialistField:'Diabeties Specialist'};
    service.createDoctor(newPost).subscribe((addedPost) => {
      expect(addedPost).toBe(newPost);
    });
    const req= httpTestController.expectOne(service.baseURL);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(newPost);
  });

  it('should update post and return updated post', () => {
    const newPost: Doctor= 
      {drId: 1, drName:'Sukriti', age:21, gender:'female', specialistField:'Diabeties Specialist'};
    service.updateDoctor(newPost.drId, newPost).subscribe((addedPost) => {
      expect(addedPost).toBe(newPost);
    });
    const req= httpTestController.expectOne(service.baseURL);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(newPost);
  });

  it('should delete post', () => {
    const newPost: Doctor= 
      {drId: 1, drName:'Sukriti', age:21, gender:'female', specialistField:'Diabeties Specialist'};
    service.deleteDoctor(newPost.drId).subscribe((addedPost) => {
      expect(addedPost).toBe(newPost);
    });
    const req= httpTestController.expectOne(service.baseURL);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(newPost);
  });

  it('should test 404 error', () => {
    const errorMsg= 'mock 404 error ocured';
    service.getDoctorList().subscribe(
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
