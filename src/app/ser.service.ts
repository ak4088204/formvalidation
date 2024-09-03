import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SerService {
  val:any;
  upd:any=0;
  index:any=-1;
  same:any;

  constructor() { }
}
