import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import {ApiCommService} from "../services/api-comm.service";

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {
  responseData: any;
  regionsDta = {"region":"", "code": "", "token": localStorage.getItem('token')}
  tokenData = {"token": localStorage.getItem('token')}

  DJANGO_SERVER = 'http://127.0.0.1:8000'
  form: FormGroup;
  response;
  imageURL;

  constructor(private router: Router, private formBuilder: FormBuilder, private apiExternal: ApiCommService) {
    this.getRegions();
  }

  ngOnInit(): void {
     this.form = this.formBuilder.group({
      profile: ['']
    });
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('profile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('profile').value);

    this.apiExternal.upload_image(formData).subscribe(
      (res) => {
        // this.response = res;
        this.response = res;
        this.imageURL = `${this.DJANGO_SERVER}${res.res_serialized.file}`;
        console.log(res);
        console.log(this.imageURL);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  regions: any;

  addRegion(){
   this.apiExternal.postData(this.regionsDta, 'add_region/').subscribe((response: any) =>{
     this.responseData = response
     this.getRegions()
   })
  }

  getRegions(){
    this.apiExternal.postData(this.tokenData, 'get_regions/').subscribe((data: any) => {
      this.regions = data.regions
    })
  }

}
