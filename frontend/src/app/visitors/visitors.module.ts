import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { VisitorsComponent } from './visitors.component'
import { VisitorInfoComponent } from './visitor-info/visitor-info.component'
import { VisitorService } from './visitors.service'
import { VisitorFormComponent } from './visitor-form/visitor-form.component'

@NgModule({
    declarations: [
        VisitorsComponent,
        VisitorInfoComponent,
        VisitorFormComponent,
    ],
    imports: [
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        CommonModule
    ],
    providers: [
        VisitorService,
    ]
})
export class VisitorsModule { }
