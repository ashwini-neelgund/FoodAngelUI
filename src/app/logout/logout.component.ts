import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtClientService } from '../services/jwt-client.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service: JwtClientService,
    private router: Router) { }

  ngOnInit(): void {
    this.service.logout();
    this.router.navigate(['login']);
  }

}
