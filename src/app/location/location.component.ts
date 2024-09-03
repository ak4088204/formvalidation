import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { SerService } from '../ser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
item:any
lo:FormGroup
uo:any
constructor(private ser:SerService,private dat:FormBuilder,private router:Router){
this.item=ser.val
this.uo=ser.upd

this.lo=this.dat.group({
  address:['',Validators.required],
  city:['',Validators.required],
  state:['',Validators.required],
  pincode:['',Validators.required],
  country:['',Validators.required]
})

if(ser.upd==1){
  console.log("update")
  let sa=ser.same;
  this.lo.patchValue({
    address:sa.address,
    city:sa.city,
    state:sa.state,
    pincode:sa.pincode,
    country:sa.country
  })
}
}



sub(){
  let collect=this.ser.val;
  collect.address=this.lo.controls['address'].value
  collect.city=this.lo.controls['city'].value
  collect.state=this.lo.controls['state'].value
  collect.pincode=this.lo.controls['pincode'].value
  collect.country=this.lo.controls['country'].value

  if(localStorage.getItem('new')){
    let a= JSON.parse(localStorage.getItem('new') as string)
    a.push(collect)
    localStorage.setItem('new',JSON.stringify(a))
  }
  else{
    let empty=[collect]
    localStorage.setItem('new',JSON.stringify(empty))
  }

  this.router.navigate(['/']);

}


updatapage2(){
  let collect=this.ser.val;
  collect.address=this.lo.controls['address'].value
  collect.city=this.lo.controls['city'].value
  collect.state=this.lo.controls['state'].value
  collect.pincode=this.lo.controls['pincode'].value
  collect.country=this.lo.controls['country'].value

  let g= JSON.parse(localStorage.getItem('new') as string)
  g[this.ser.index]=collect;
  localStorage.setItem('new',JSON.stringify(g))
  alert("Updated");
  this.ser.upd=0;
  this.router.navigate(['/']);


}
}
