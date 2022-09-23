import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {

  constructor(private modalController: ModalController,
     public auth: AuthService,
    public user: UserService,
    public router: Router) { 
      this.latestEvents();
      this.user.menu();
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

 async openEventDetails(ev:any){
   console.log('event open'+ JSON.stringify(ev.id))
  const modal = await this.modalController.create({
    component: EventDetailsComponent,
    componentProps: {ev_data: ev.id}
  });
  return await modal.present();
  }

  eventData2021=[
    {
      id: 1,
      name: 'Ahmedabad Food Festival 2021',
      date: '29, May 2021',
      location:'Ahmedabad',
    },
    {
      id: 2,
      name: 'National Streat Food Festival Delhi',
      date: '20, Jun 2021',
      location:'Ahmedabad',
    },
    {
      id: 3,
      name: 'ROyal Cuisine Food Festival Delhi',
      date: '29, May 2021',
      location:'Delhi',
    },
  ]
  eventData2020=[
    {
      id: 1,
      name: 'Ahmedabad Food Festival 2021',
      date: '29, Jan 2020',
      location:'Ahmedabad',
    },
    {
      id: 2,
      name: 'National Streat Food Festival Delhi',
      date: '20, Jan 2020',
      location:'Ahmedabad',
    },
    {
      id: 3,
      name: 'ROyal Cuisine Food Festival Delhi',
      date: '19, Fab 2020',
      location:'Delhi',
    },
  ]
}

