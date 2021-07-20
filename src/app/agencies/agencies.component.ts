import { Component, OnInit } from '@angular/core';
import {ApiCommService} from "../services/api-comm.service";

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.css']
})
export class AgenciesComponent implements OnInit {

  constructor(private apiExternal: ApiCommService) {
    this.getAgence();
    this.getTowns();
  }

  ngOnInit(): void {
  }

  agencesData: any;
  agences: any;
  towns: any;
  agenceData = {
        "token" : localStorage.getItem('token'),
        "agency": "",
        "code": "",
        "address": "",
        "telephone": "",
        "email": "",
        "town": ""
  }
  tokenData = {"token" : localStorage.getItem('token')}

  selectTown(val){
    // console.log('val is ' + val.target.value)
    this.agenceData.town = val.target.value
  }

  addAgence(){
    this.apiExternal.postData(this.agenceData, 'add_agence/').subscribe((dataAgence:any) => {
      this.agencesData = dataAgence.agence
      this.getAgence()
    })
  }

  getAgence(){
    this.apiExternal.postData(this.tokenData, 'get_agence/').subscribe((dataAgence: any) =>{
      this.agences = dataAgence.agence
    })
  }

  getTowns(){
    this.apiExternal.postData(this.tokenData, 'get_towns/').subscribe((dataTown: any) => {
      this.towns = dataTown.towns
    })
  }

}
