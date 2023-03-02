import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { VisitorService } from '../visitors.service'

@Component({
  selector: 'app-visitor-form',
  templateUrl: './visitor-form.component.html',
  styleUrls: ['./visitor-form.component.sass']
})
export class VisitorFormComponent {
    constructor(
        @Inject(VisitorService) private readonly _visitorsService: VisitorService,
        @Inject(Router) private readonly _router: Router
    ) {}
    newVisitorForm = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.maxLength(200)
        ]),
        info: new FormControl('', [
            Validators.required,
            Validators.maxLength(500)
        ])
    })
    create() {
        this.newVisitorForm.disable()
        this._visitorsService.create({
            name: this.newVisitorForm.get('name')!.value!,
            info: this.newVisitorForm.get('info')!.value!
        }).subscribe({
            next: () => this._router.navigate(['/visitors']),
            error: error => console.log('error adding visitor!', error),
            complete: () => this.newVisitorForm.enable()
        })
    }
}
