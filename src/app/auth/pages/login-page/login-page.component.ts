import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.css' ]
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder
  ){}
  
  public user: User = {
    id: 0,
    user: '',
    email: ''
  };

  public adminForm = this.formBuilder.group({
    username: ['', [Validators.required,]],
    password: ['', Validators.required]
  });

  onLogin(): void {
    console.log('onLogin');
    if ( this.adminForm.invalid ) return;
    this.authService.login(this.adminForm.controls.username.value!, this.adminForm.controls.password.value!).subscribe(result => {
      console.log('User logged: ' + result);
      this.router.navigate(['/']);
    }, error => {
      this.showSnackbar(error);
      console.log('Error in login: ' + error);
    });
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 5000,
    })
  }

  getArrayErrors(formControl: any):any[]{
    let errors:any[] = []
    const controlErrors: ValidationErrors = formControl.errors;
    if (controlErrors != null) { 
      Object.keys(controlErrors).forEach((keyError:any) => {
        console.log('Key control: ' + keyError);
        switch (keyError) {
          case 'required':
            errors.push('Value is required');
            break;
          case 'max':
            errors.push('Maximun length is invalid');
            break;
          case 'min':
            errors.push('Minimun length is invalid');
            break;
          case 'pattern':
            errors.push('Fomat is invalid');
            break;
          default:
            errors.push('Value is invalid');
            break;
        }
      });
    }
    return errors;
  }

}
