import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Student } from '../../interfaces/student.interface';
import { StudentService } from '../../services/student.service';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

export interface FormGroupControls {
  [key: string]: AbstractControl;
}

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: []
})
export class NewPageComponent implements OnInit {

  public message:String = "";
  public adminForm = this.formBuilder.group({
    id: [''],
    curp: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    lastname: ['', Validators.required],
    created: [new Date(), Validators.required],
    modified: [null],
    deleted: [null],
    birthday: [null, Validators.required],
    active: [true, Validators.required]
  });

  /*
  public studentForm = new FormGroup({
    id:        new FormControl<string>('', ),
    curp:      new FormControl<string>(''),
    name:      new FormControl<string>(''),
    lastname:  new FormControl<string>(''),
    created:   new FormControl<Date>(new Date),
    modified:  new FormControl(),
    deleted:   new FormControl(),
    birthday:   new FormControl(),
    active:    new FormControl<boolean>(true)
  });
  */

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  get currentStudent(): Student {
    const student = this.adminForm.value as Student;
    return student;
  }

  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) return;
    
    this.activatedRoute.params
      .pipe(
        switchMap( ({ curp }) => this.studentService.getStudentByCurp( curp ) ),
      ).subscribe( student => {
        if ( !student ) {
          return this.router.navigateByUrl('/');
        }
        this.adminForm.reset( student );
        return;
      });
  }

  onSubmit():void {
    console.log('onSubmit');
    
    if ( this.adminForm.invalid ) return;
    this.message = "";
    if ( this.currentStudent.id ) {
      this.studentService.updateStudent( this.currentStudent )
        .subscribe( student => {
          this.showSnackbar(`${ student.curp } updated!`);
        }, error => {
          this.message = error.error
        });
      return;
    }

    this.studentService.addStudent( this.currentStudent )
      .subscribe( student => {
        this.router.navigate(['/students']);
        this.showSnackbar(`${ student.curp } created!`);
      }, error => {
        this.message = error.error
      });
  }

  onDeleteStudent() {
    if ( !this.currentStudent.id ) throw Error('Student id is required');
    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.adminForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.studentService.deleteStudentbyCurp( this.currentStudent.curp )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigate(['/students']);
      });
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
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
