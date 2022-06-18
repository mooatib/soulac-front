import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateSoulacaisForm } from 'src/app/models/soulacais/soulacais-form.model';
import { UserForm } from 'src/app/models/user/user-form.model';
import { User } from 'src/app/models/user/user.model';
import { SoulacaisService } from 'src/app/services/soulacais/soulacais.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private service: UserService,
    private soulacaisService: SoulacaisService,
    private router: Router
  ) {}

  userForm: UserForm;
  loginForm: FormGroup;
  user: User;
  soulacais: CreateSoulacaisForm = new CreateSoulacaisForm();

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('none', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async login(): Promise<void> {
    this.userForm = this.loginForm.getRawValue();
    this.service
      .login(this.userForm)
      .then(() => {
        this.soulacaisService.getLoggedSoulacais();
      })
      .finally(() => {
        console.log(
          'BEFORE REDIRECT',
          this.soulacaisService.getLoggedInSoulacais(),
          localStorage.getItem('soulacais')
        );
        this.router.navigate(['/']);
      });
  }

  register(): void {
    this.router.navigate(['/register']);
  }
}
