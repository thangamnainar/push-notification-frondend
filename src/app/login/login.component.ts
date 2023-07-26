import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from 'src/api.service';
import { tick } from '@angular/core/testing';
import { environment } from "../../environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  title = 'push-notification-frontend';
  message:any = null;
  token !: string

  constructor(
    private apiService:ApiService,
    private router:Router
  ) { };

  ngOnInit(){
    this.requestPermission();
    this.listen();
    // this.apiService.sendNotification().subscribe((res) => {
    //   console.log('res',res);
    // })

  }

  login(value: any) {
    console.log('value',value);
    this.apiService.login(value).subscribe({
      next: (response:any) => {
        let userId = response.data
        // let token = 'c_boLVYmdM5IV8VsgfAvhw:APA91bGQrPtDAQpUkp_ThZt5-U16TFAjGECpQR6YYLnLfOajAxIxqG7Y6k38rIjReshlJfr9MWynCpJNTBPOZtnCMox2CnWXV27_0jomHT3M7KXu6i7Gu_g48AP5tNm90pNtbRHU8iv9';
        this.apiService.sendToken({notificationToken:this.token,userId:userId.id}).subscribe({
          next:(response) => {
            console.log('response',response);
          },error(err) {
            console.log('err',err);
          },
        })
        console.log('reponse', response);
        if(response.status){
          // this.visible=false;
        }
        this.router.navigate(['home'])
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }



  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log('currentTokencurrentToken',currentToken);
           this.token = currentToken
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }


  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
      this.displayNotification(payload)
    });
    
  }

  displayNotification(payload: any): void {
    if (Notification.permission === 'granted') {
      const { title, body } = payload.notification;
      const options: NotificationOptions = {

        body,
        // Add more options as needed

      };
      // Display the notification

      new Notification(title, options);

    }

  }

}
