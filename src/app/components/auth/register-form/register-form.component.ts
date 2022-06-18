import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateSoulacaisForm } from 'src/app/models/soulacais/soulacais-form.model';
import { UserForm } from 'src/app/models/user/user-form.model';
import { SoulacaisService } from 'src/app/services/soulacais/soulacais.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  constructor(
    private service: UserService,
    private soulacaisService: SoulacaisService,
    private router: Router
  ) {}

  user: UserForm;
  registerForm: FormGroup;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  register(): void {
    this.user = this.registerForm.getRawValue();
    this.service.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
