import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../common/services/auth.service';

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
        private router: Router,
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        // if ('serviceWorker' in navigator) {
        //     navigator.serviceWorker.addEventListener('message', function(event) {
        //         console.log('event: ', event);
        //     });

        //     navigator.serviceWorker.register('assets/scripts/service-worker.js').then((registration) => {
        //         console.log('service worker register', registration);
        //         return navigator.serviceWorker.ready;
        //     });
        // }
        var myWorker = new Worker("./assets/scripts/service-worker.js");
        myWorker.onmessage = function(e) {
            // result.textContent = e.data;
            console.log('Login Message received from worker');
        }

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
            this.router.navigate(['home']);
        })
        // this.http.post(
        //     'http://localhost:3000/auth/login', 
        //     { 'username': this.id, 'password': this.password }
        // ).subscribe(res => {
        //     console.log('[login success]', res);
        // });

    }

    onSignup() {
        this.authService.signup(this.signInForm.value).subscribe(res => {
            // console.log('[login success]', res);
            // this.route.navigate(['home']);
        })
    }

    isRememberedIdExist() {
        return true;
    }

    onRembermeChanged(event) {

    }

    openNew() {
        const width = window.screen.width;
        const height = window.screen.height;
        const options = 'resizable=1, scrollbars=1, fullscreen=0, '
            + 'width=' + width + ', height=' + height + ','
            + 'screenX=100 , left=100, screenY=0, top=0, v-toolbar=0, menubar=0, status=0';
        window.open('#/home', 'home', options);
    }
    
    openStudyList() {
        this.router.navigate(['studies']);
    }

}
