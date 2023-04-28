import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  terms = new FormControl(false);

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerFormGroup = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(12)]],
      confirm_password: ['', [Validators.required, Validators.minLength(12)]],
    });
  }
}
