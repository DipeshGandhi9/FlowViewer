import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './../app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  title = 'Welcome !';
  errors = "";
  pumps = [];
  private timer;

  constructor(private appService : AppService) {
    this.getHourlyFlowData();
  }

  ngOnInit() {
    /*Load Pump status on every 30sec.*/
    this.timer = setInterval(() => {
      //this.getLatestFlowData();
      this.getHourlyFlowData();
    }, 30000);
  }

  ngOnDestroy():void {
    clearInterval(this.timer);
  }

  getHourlyFlowData(){
    this.errors = "";
    this.appService.loadChData()
      .subscribe(
      (data) => {
        console.log(data);
        var newData = JSON.parse(data["_body"]);
        if(this.pumps.length > 0 ){
          this.pumps = null;
        }
        this.pumps = newData;

        console.log(this.pumps);
      },
      (error) => {
        this.errors = "Fail to load pump data.";
      }
    );
  }

  //getLatestFlowData(){
  //  this.errors = "";
  //  this.appService.loadLatestChData()
  //    .subscribe(
  //    (data) => {
  //      //console.log(data);
  //      var newData = JSON.parse(data["_body"]);
  //      var firstRow;
  //      if(this.pumps.length > 0 ){
  //        firstRow = this.pumps[0];
  //      }
  //
  //      if(firstRow && newData && newData.length > 0 && firstRow.SampleTime < newData[0].SampleTime){
  //        this.pumps.splice(0,0,newData[0]);
  //      }
  //
  //    },
  //    (error) => {
  //      this.errors = "Fail to load pump data.";
  //    }
  //  );
  //}
}
