import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { JwtClientService } from '../services/jwt-client.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService:JwtClientService) { }

  ngOnInit(): void {
  }

}
