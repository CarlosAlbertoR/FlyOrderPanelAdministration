import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  Types: any = ['Restaurante', 'Bar', 'Café', 'Discoteca'];

  constructor() { }

  ngOnInit() {
  }

}