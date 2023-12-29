import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerValue: any;
  errors: any;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required, Validators.email],
      password: ["", Validators.required],
      password_confirmation: ["", Validators.required]
    });
  }
  ngOnInit(): void {}

  submitRegister() {
    this.registerValue = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      password_confirmation: this.registerForm.value.password_confirmation
    };

    this.authService.register(this.registerValue).subscribe({
      error: err => {
        if (err) {
          this.errors = err.error.errors;
        }
      }
    });

    this.registerForm.reset();
  }
}
