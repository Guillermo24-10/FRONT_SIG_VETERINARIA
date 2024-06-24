import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    _username: string = '';
    _password!: string;


    constructor(
        public layoutService: LayoutService,
        public authService: AuthService,
        public router: Router
    ) { }

    Login() {
        try {
            const data = {
                username: this._username,
                password: this._password
            }
            this.authService.login(data).subscribe((resp) => {
                if (resp.isSuccess) {
                    localStorage.setItem('token_sigvet', resp.token);
                    localStorage.setItem('user_vet', JSON.stringify({
                        'username': resp.user.username,
                        'role_id': resp.user.role_id
                    }));
                    this.router.navigate(["/"]);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}
