import { Component, Inject } from '@angular/core'
import { Visitor, VisitorService } from './visitors.service'

@Component({
    selector: 'app-visitors',
    templateUrl: './visitors.component.html',
    styleUrls: ['./visitors.component.sass']
})
export class VisitorsComponent {
    loading = false
    visitors: Visitor[] = []

    constructor(@Inject(VisitorService) private readonly _visitorsService: VisitorService) { }

    ngOnInit() {
        this.getVisitors()
    }

    getVisitors() {
        this.loading = true
        this._visitorsService.list().subscribe({
            next: visitors => this.visitors = visitors,
            error: error => console.log('error fetching visitors list:', error),
            complete: () => this.loading = false
        })
    }
}
