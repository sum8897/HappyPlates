import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonDatetime } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { format, parseISO } from 'date-fns';


@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.scss'],
})
export class CartpageComponent implements OnInit {

  showPicker=false;
  dateValue=format(new Date(),'yyyy-mm-dd')+'T09:00:00.000Z';
  formateString='';
  @ViewChild(IonDatetime) datetime:IonDatetime;
  constructor(public user: UserService,
              public auth: AuthService,
              public alertController: AlertController,
              public router:Router) {
              this.user.menu();
              this.getcartItem();
              this.setToday();
  }

  ngOnInit() { }
  ionViewWillEnter(){

  }
  increaseItem(data) {
   let itemPrePrice=data.qtty*data.amount
    data.qtty++;
    data.peritemTotal
    let itemPrice=data.qtty*data.amount;
    let result=itemPrice-itemPrePrice
    this.tottal_Amount=this.tottal_Amount+result;
    console.log(result);
    console.log(this.tottal_Amount)
  }
  decreaseItem(data:any) {
   
    if (data.qtty ==1) {
      data.qtty=1;
      this.deleteAlertConfirm(data)

    }
    if (data.qtty >1) {
      let itemPrePrice=data.qtty*data.amount
      data.qtty--;
      let itemPrice=data.qtty*data.amount;
      let result=itemPrePrice-itemPrice
      console.log(data);
      this.tottal_Amount=this.tottal_Amount-result;
      console.log(result);
      console.log(this.tottal_Amount)
    }
  }

  async deleteAlertConfirm(data:any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do You want to Delete this Item... ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          cssClass: 'primary',
          handler: () => {
            console.log('Confirm Okay');
            this.removeCartItem(data);
          }
        }
      ]
    });

    await alert.present();
  }
  removeCartItem(data_item) {
    console.log(data_item);
    this.user.present('deleting...');
    this.auth.deleteCartItem(data_item.id).subscribe((data) => {
      this.user.dismiss();
      console.log(data);
      this.tottal_Amount=this.tottal_Amount-data_item.amount*data_item.qtty;
      console.log(this.tottal_Amount);
    }, err => {
      this.user.dismiss();
      console.log(err)
    })
    const items = this.cartDataList.filter(item => item.id === data_item.id);
    const index = this.cartDataList.indexOf(items[0]);
    if (index > -1) {
      this.cartDataList.splice(index, 1);
    }
    console.log(this.cartDataList);
    this.cart_length=this.cartDataList.length;
    console.log(this.cart_length)
    // if(this.cartArray=[]){
    //   console.log('No Item available in your cart..');
    // }
  }

  cartDataRes: any;
  cartDataList: any;
  tottal_Amount: any;
  cart_length;
  getcartItem() {
    this.auth.getCart().subscribe((data) => {
      this.cartDataRes = data;
      this.cartDataList = this.cartDataRes.data;
      console.log(this.cartDataList);
      this.cart_length=this.cartDataList.length;
      this.tottal_Amount=this.cartDataRes.totalamount
      console.log(this.tottal_Amount)
      console.log(this.cartDataList.length)

    }, err => {
      console.log(err.error)
    })
  }

  setToday(){
    this.formateString = format(parseISO(format(new Date (),'yyyy-MM-dd')+'T09:00:00.000Z'),
                        'HH:mm,mmM d,yyyy');
                        console.log(this.formateString)
  }
  dateChanged(value:any){
this.dateValue=value;
this.formateString=format(parseISO(value),'HH:mm,mmM d, yyyyy');
this.showPicker=false;
  }
  close(){
    this.datetime.cancel(true);
  }
  select(){
    this.datetime.confirm(true);
  }
  instructions:any;
  async placeOrder() {
    const alert = await this.alertController.create({
      header: 'Please enter your info',
      mode: 'ios',
      inputs: [
        {
          placeholder: 'Please Enter Description...',
          name: 'name1',
          type: 'text'
        },
   
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('dismiss')
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (alertData) => {
            console.log(alertData.name1);
            if(alertData.name1===" " || alertData.name1==[]){
              this.instructions=alertData.name1;
              console.log('Please Enter SomeThings...');
              
            }else{
              this.placeOrder1();
            }
        }
        },
      ],
    });

    await alert.present();
  }

  check_data:any;
  placeOrder1() {
    if(this.instructions==[]){
   alert('Please add instructions/Description...');
    }
    else{
      console.log(this.user.user_location);
      this.check_data = {
        instructions: this.instructions,
        deliverystatus: "1",
        contactNumber: this.user.user_mobile,
        address: this.user.user_location,
        country: this.user.user_country_id,
        city: this.user.user_city_id,
        state: this.user.user_state_id,
        deliverydate: "2022-10-20",
        addresslat: 3443.44,
        addresslong: 434.444
      }
      console.log(this.check_data)
      this.user.present('');
      this.auth.checkoutApi(this.check_data).subscribe((data) => {
        this.user.dismiss();
        this.router.navigateByUrl('/nav/order-history')
        this.user.showToast('Your order successfully placeed. We will Notify Soon');
      }, err => {
        this.user.dismiss();
      })
    }
  
  }


  cartArray = [
    {
      id: 1,
      name: 'Spcicy Prawns with Sweet Dipping',
      price: 500,
      mrp: 700,
      count: 1,
    },
    {
      id: 2,
      name: 'Spcicy Prawns with Sweet Dipping',
      price: 100,
      mrp: 300,
      count: 1,
    },
    {
      id: 3,
      name: 'Spcicy Prawns with Sweet Dipping',
      price: 250,
      mrp: 600,
      count: 1,
    },
    {
      id: 4,
      name: 'Spcicy Prawns with Sweet Dipping',
      price: 850,
      mrp: 375,
      count: 1,
    },
  ]

}
