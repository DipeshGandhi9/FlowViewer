import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './../app.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-main-detail',
  templateUrl: './main-detail.component.html',
  styleUrls: ['./main-detail.component.css']
})
export class MainDetailComponent implements OnInit, OnDestroy {
  errors = "";
  pumps = [];
  private UnitID;
  private detailTimer;

  constructor(private appService : AppService, route: ActivatedRoute) {
    this.UnitID = route.snapshot.params['id'];
    //console.log( this.UnitID );
    this.getHourlyFlowData();
  }

  ngOnInit() {
    /*Load Pump status on every 30sec.*/
    this.detailTimer = setInterval(() => {
      this.getLatestFlowData();
    }, 30000);
  }

  ngOnDestroy():void {
    clearInterval(this.detailTimer);
  }

  getHourlyFlowData(){
    this.errors = "";

    this.appService.loadChDetail(this.UnitID)
      .subscribe(
      (data) => {
        console.log(data);
        this.pumps = JSON.parse(data["_body"]);
        console.log(this.pumps);
      },
      (error) => {
        this.errors = "Fail to load pump data.";
      }
    );
  }

  getLatestFlowData(){
    this.errors = "";
    this.appService.loadLatestChData(this.UnitID)
      .subscribe(
      (data) => {
        console.log(data);
        var newData = JSON.parse(data["_body"]);
        var firstRow;
        if(this.pumps.length > 0 ){
          firstRow = this.pumps[0];
        }

        if(firstRow && newData && newData.length > 0 && firstRow.SampleTime < newData[0].SampleTime){
          this.pumps.splice(0,0,newData[0]);
        }

      },
      (error) => {
        this.errors = "Fail to load pump data.";
      }
    );
  }
}
