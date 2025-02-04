import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  countdown: number = 5;
  constructor(
    private router: Router
  ){}
  ngOnInit(){
    localStorage.removeItem('Authorization');
    const i=setInterval(() => {
      this.countdown--;
      if (this.countdown<=0){
        clearInterval(i);
        this.router.navigate(['']);
      }
    }, 1000);
  }
}
