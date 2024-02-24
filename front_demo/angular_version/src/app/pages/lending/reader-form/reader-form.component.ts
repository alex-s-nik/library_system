import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { type LibraryService } from '../../../library.service';

@Component({
  selector: 'app-reader-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reader-form.component.html',
  styleUrl: './reader-form.component.less'
})
export class ReaderFormComponent {
  constructor (
    private readonly libraryService: LibraryService
  ) { }

  newReaderForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(200)
    ]),
    card: new FormControl('', [
      Validators.required,
      Validators.maxLength(500)
    ])
  });

  create () {
    console.log(this.newReaderForm);
    this.libraryService.createReader({
      name: this.newReaderForm.get('name')!.value!,
      card: this.newReaderForm.get('card')!.value!
    });
  }
}
