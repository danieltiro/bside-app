import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: [ './register-page.component.css' ]
})
export class RegisterPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder
  ){}
  
  public adminForm = this.formBuilder.group({
    username: ['', [Validators.required,]],
    password: ['', Validators.required],
    name: ['', [Validators.required,]],
  });

  onRegister(){
    console.log('onRegister');
    if ( this.adminForm.invalid ) return;

    this.router.navigate(['/auth/login']);
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
