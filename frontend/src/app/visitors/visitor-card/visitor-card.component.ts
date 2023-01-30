import { Component, Inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Visitor, VisitorService } from '../visitors.service'

@Component({
    selector: 'app-visitor-card',
    templateUrl: './visitor-card.component.html',
    styleUrls: ['./visitor-card.component.sass']
})
export class VisitorCardComponent {
    visitor: Visitor | undefined

    constructor(
        @Inject(VisitorService) private readonly _visitorsService: VisitorService,
        private _route: ActivatedRoute
    ) { }

    ngOnInit() {
        this._getVisitor()
    }

    private _getVisitor() {
        this._route.paramMap.subscribe(params => {
            const visitorSubscription = this._visitorsService.getVisitor(+params.getAll('id'), true).subscribe(visitor => {
                this.visitor = visitor
            })
            visitorSubscription.unsubscribe()
        })
    }
}
