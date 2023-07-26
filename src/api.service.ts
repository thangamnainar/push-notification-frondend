import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(
    private http:HttpClient
  ) { }
  
  login(data:any){
    console.log('datadatadata',data);

    return this.http.post('http://localhost:3000/notification/login',data);
  }

  sendToken(data:any){
    console.log('data',data);
    return this.http.post('http://localhost:3000/notification/saveToken',data)
  }

  sendNotification(){
   return this.http.post('http://localhost:3000/notification/sendNotification',{userId:2}) 
  }
}
