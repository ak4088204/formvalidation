import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl,FormArray } from '@angular/forms';
import { SerService } from '../ser.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  fm:FormGroup;
  up=0;
  items:any;
  constructor(private cre:FormBuilder,private ser:SerService,private router:Router){
  this.fm=this.cre.group({
    first:['',Validators.required],
    last:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    phone:['',Validators.required]

  })
  if(localStorage.getItem('new')){
    this.items=JSON.parse(localStorage.getItem('new') as string);
  }
  else{
    this.items=[];
  }

  setInterval(()=>{
    if(localStorage.getItem('new')){
      this.items=JSON.parse(localStorage.getItem('new') as string);
    }
    else{
      this.items=[];
    }
  },1000)
  }

  sub(){
    if(localStorage.getItem('new')){
      let a= JSON.parse(localStorage.getItem('new') as string)
      for(let i=0;i<a.length;i++){
        if(a[i].email==this.fm.controls['email'].value){
          alert("Email Already Exist")
          return
        }
      }

      // a.push(this.fm.value)
      // localStorage.setItem('new',JSON.stringify(a))
      this.ser.val=this.fm.value
      this.router.navigate(['/loc']);
    }
    else{
      // let item=[this.fm.value]
      // localStorage.setItem('new',JSON.stringify(item));
      this.ser.val=this.fm.value
      this.router.navigate(['/loc']);

    }
  }

  update(i:any){
   let a=this.items;
   this.fm.patchValue({
    first:a[i].first,
    last:a[i].last,
    email:a[i].email,
    phone:a[i].phone
   })
   this.up=1
   this.ser.index=i;
  }

  updata(){

    let a= JSON.parse(localStorage.getItem('new') as string)
    for(let i=0;i<a.length;i++){
      if(a[i].email==this.fm.controls['email'].value){
        // a[i]=this.fm.value
        // localStorage.setItem('new',JSON.stringify(a))
        // alert("Updated");
        // this.fm.patchValue({
        //   first:"",
        //   last:"",
        //   email:"",
        //   phone:""
        //  })
         this.up=0
         this.ser.val=this.fm.value
         this.ser.same=a[i];
         this.ser.upd=1;
         this.router.navigate(['/loc']);
        return
      }
    }
    alert("Email does not exist in the database")
  }

del(i:any){
let a=this.items;
a.splice(i,1)
localStorage.setItem('new',JSON.stringify(a))
}

}
