import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading = false;
  private loadingSubscription : Subscription;

  constructor(private authService : AuthService, private uiService : UIService) { }

  ngOnDestroy(): void {
    if(this.loadingSubscription){
      this.loadingSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(loadingState => {
      this.isLoading = loadingState;
    })
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required])
    });
  }

  OnSubmit(){
    this.authService.login({
      email : this.loginForm.value.email,
      password : this.loginForm.value.password
    })
  }

}
