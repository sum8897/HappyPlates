import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-viewallchef',
  templateUrl: './viewallchef.component.html',
  styleUrls: ['./viewallchef.component.scss'],
})
export class ViewallchefComponent implements OnInit {

  constructor(public auth: AuthService,
             public user: UserService,
             public router: Router) { 
               this.latestEvents();
             }

  ngOnInit() {}
  latestEventRes;
  latestEventData;
  latestEventAllData:any=[];
  date;
  latestEvents(){
    
    this.auth.getAllEvents().subscribe(data=>{
      this.latestEventRes=data;
      this.latestEventData=this.latestEventRes.data;
      console.log(this.latestEventData);
      for(let i=0;i<this.latestEventData.length;i++){
            this.latestEventAllData[i]=
              {
                id: this.latestEventData[i].id,
                date: (new Date(this.latestEventData[i].date).toString().slice(4,15)),
                month: (new Date(this.latestEventData[i].date).toString().slice(4,8)),
                date_year: (new Date(this.latestEventData[i].date).toString().slice(8,15)),
                event_image: this.latestEventData[i].event_image,
                intro: this.latestEventData[i].intro,
                mediaId: this.latestEventData[i].mediaId,
                status:this.latestEventData[i].status,
                location: this.latestEventData[i].location,
                title: this.latestEventData[i].title
              }
            
      }
      console.log(this.latestEventAllData)
    },err=>{
      console.log(err)
    })
  }
}
