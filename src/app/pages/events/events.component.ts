import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

 async openEventDetails(ev){
   console.log('event open')
  const modal = await this.modalController.create({
    component: EventDetailsComponent,
    cssClass: 'my-custom-class',
    componentProps: {
  eventData: ev
    }
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

