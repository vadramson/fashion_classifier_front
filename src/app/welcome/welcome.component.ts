import { Component, OnInit } from '@angular/core';
import {ApiCommService} from "../services/api-comm.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name: string;
  email: string;
  dataSource: any;
  sys_file_url: any;
  constructor(private external: ApiCommService, private router: Router) {
      this.getImages()
      this.sys_file_url = this.external.getFile_url()
      this.name = localStorage.getItem('name')
      this.email = localStorage.getItem('email')
  }
  responseData: any;
  images_from_server: any;
  authenticated = 'Unauthorized';

  authenticationData = {"username":"", "password":""}

  ngOnInit(): void {
  }

  datasent = {"some":"data"}

  getImages(){
    this.external.postData(this.datasent, 'get_uploaded_images/').subscribe((data: any) => {
      this.images_from_server = data.fashion_images
      console.log("Data from server" + this.images_from_server)
    })
  }

  login(){
    this.external.postData(this.authenticationData, 'login_user/').subscribe((response: any) =>
    {
      // console.log(response)
      localStorage.setItem('token', response.token)
      localStorage.setItem('name', response.Name)
      localStorage.setItem('email', response.email)
      localStorage.setItem('authenticated', 'Authorized')
      this.authenticated = localStorage.getItem('authenticated')
      this.router.navigate([''])
    }
    )
  }

}
