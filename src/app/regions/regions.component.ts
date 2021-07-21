import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  final_form: FormGroup;
  response;
  imageURL;
  prediction_class;
  true_prediction_class;
  max_proba;
  price;
  image_id;
  true_predict;
  cat_default_value;
  cat_default;
  data_from_server;

  constructor(private router: Router, private formBuilder: FormBuilder, private apiExternal: ApiCommService) {

  }

  ngOnInit(): void {
     this.form = this.formBuilder.group({
      profile: ['', Validators.required],
      price: "",
      clothing_description: ['', Validators.required],
    });

    this.final_form = this.formBuilder.group({
      category: "",
      category_ok: ""
    });
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('profile').setValue(file);
    }
  }

  showMe:boolean=false;

  onCategoryChangeYes(event) {
    this.showMe = false;
    console.log("Yes")
  }

  onChangeofOptions(event) {
    // console.log("event " + event);
    this.final_form.get('category').setValue(event)
  }

  onCategoryChangeNo(event) {
    this.showMe = true;
    this.final_form.get('category').setValue(this.prediction_class)
    console.log("No")
  }

  // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('profile').value);
    formData.append('price', this.form.get('price').value);
    formData.append('clothing_description', this.form.get('clothing_description').value);

    this.apiExternal.upload_image(formData).subscribe(
      (res) => {
        this.response = res;
        this.image_id = res.res_serialized.id;
        this.price = res.res_serialized.price;
        this.prediction_class = res.prediction_class;
        this.true_prediction_class = res.prediction_class;
        this.max_proba = res.max_proba;
        this.imageURL = `${this.DJANGO_SERVER}${res.res_serialized.file}`;
        console.log(res.res_serialized);
        console.log(res);
        console.log(this.imageURL);
        console.log("image_id " + this.image_id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

onFinalSubmit(){
    console.log("Final Submit")
    console.log("Category ->" + this.final_form.get('category').value)

  const finalFormData = new FormData();

   this.cat_default = this.final_form.get('category').value
  if(!this.cat_default){
    this.cat_default_value = this.true_prediction_class
  }
  else{
    this.cat_default_value = this.cat_default
  }

   if(this.true_prediction_class == this.cat_default_value){
      this.true_predict = 1
    }else{
      this.true_predict = 0
    }
    console.log("true_predict "+ this.true_predict)

  console.log("Category ->" + this.cat_default_value)

    finalFormData.append('prediction_class', this.true_prediction_class);
    finalFormData.append('image_id', this.image_id);
    finalFormData.append('true_predict', this.true_predict);
    finalFormData.append('corrected_prediction', this.cat_default_value);
    finalFormData.append('accuracy_of_prediction', this.max_proba);

    console.log("finalFormData "+ finalFormData)
    // console.log("true_predict "+ finalFormData.value)


  this.apiExternal.clothing_saved(finalFormData).subscribe((data) => {
      this.data_from_server = data.saved
      console.log("Data from server" + this.data_from_server)
      if(this.data_from_server){
        alert("Cloth Uploaded successfully!")
      }
    })
}


}
