import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from './../../../common/services/validation/validation.service';
import { GroupsService } from "./../../../common/services/groups/groups.service";
import _ from "lodash";
import { BroadcastService } from '../../../common/services/broadcast/broadcast.service';


@Component({
  selector: 'group-add',
  templateUrl: './group-add.component.html',
  providers: [GroupsService]
})
export class GroupAddComponent implements OnInit {

  dataForm: any;
  data: any = {};
  id: any;
  featuresArray: any = [];

  statusList: { name: string; value: string; }[];

  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _groupsService: GroupsService,
    private _broadcastService: BroadcastService
  ) {
  }

  ngOnInit() {

    this.dataForm = this.formBuilder.group({
      'group_name': ['', [Validators.required, ValidationService.nameValidator]],
      'active': ['active', [Validators.required]],
    });

    this.statusList = [
      { name: "Active", value: "active" },
      { name: "Inactive", value: "inactive" }
    ];

    this.getFeatures();
  }

  getFeatures = () => {
    this.data.features = { "patient_management": 0, "vital_management": 0, "document_management": 0, "casenote_management": 0, "medication_compliance": 0, "telemedicine_management": 0, "activity_management": 0, "team_management": 0, "associate_management": 0, "report": 0 };

    let self = this;

    _.forEach(this.data.features, function (val, key) {
      self.featuresArray.push({
        name: key,
        val: parseInt(val)
      });
    });
  }

  formatName = (val) => {
    val = val.replace("_", " ");
    return this.titleCase(val);
  }

  titleCase = (str) => {
    str = str.toLowerCase().split(' ');

    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].split('');
      str[i][0] = str[i][0].toUpperCase();
      str[i] = str[i].join('');
    }
    return str.join(' ');
  }

  updateFetaureAccess = (name, access, flag) => {
    _.forEach(this.featuresArray, function (val, key) {
      if (val.name == name) {
        if (flag == 0) {
          val.val = access - 1;
        } else {
          val.val = access;
        }
      }
    });
  }

  submitData = () => {

    let temp = {};
    let isAllowed= false;
    _.forEach(this.featuresArray, function (val, key) {
      if(val.val >0){
         isAllowed = true
      }
      temp[val.name] = val.val;
    });
    if(!isAllowed){
      this._broadcastService.broadcastAlert('error', 'Please select atleast one feature');
      return
    }

    let dataToSend = {
      "group_name": this.dataForm.value.group_name,
      "active": this.dataForm.value.active,
      "features": temp
    };

    this._groupsService.addGroup(dataToSend)
      .subscribe(result => {
        this._broadcastService.broadcastAlert('success', result.message);
        this._router.navigate(['dashboard/groups/']);
      }, err => {
         const message = err.message ? err.message : '';
        this._broadcastService.broadcastAlert('error', message);
      });
  }

  onCancel = () => {
     this._router.navigate(['dashboard/groups/']);
  }
}
