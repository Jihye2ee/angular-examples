import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    signInForm: FormGroup;
    
    id = '';
    password = '';

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private route: Router,
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.signInForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl(),
        });

        this.signInForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        console.log('[onsubmit]', this.signInForm.value);
        this.id = this.signInForm.value.id;
        this.password = this.signInForm.value.password;

        // const user = {
        //     "username": this.id,
        //     "password": this.password
        // };

        this.authService.signin(this.signInForm.value).subscribe(res => {
            console.log('[login success]', res);
            this.route.navigate(['home']);
        })
        // this.http.post(
        //     'http://localhost:3000/auth/login', 
        //     { 'username': this.id, 'password': this.password }
        // ).subscribe(res => {
        //     console.log('[login success]', res);
        // });

    }

    isRememberedIdExist() {
        return true;
    }

    onRembermeChanged(event) {

    }

}
