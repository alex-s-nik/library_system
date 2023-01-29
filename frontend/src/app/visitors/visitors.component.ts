import { Component, Inject } from '@angular/core'
import { Visitor, VisitorService } from './visitors.service'

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.sass']
})
export class VisitorsComponent {
  visitors: Visitor[] = []

  constructor(@Inject(VisitorService) private readonly _visitorsService: VisitorService) { }

  ngOnInit() {
    this.getVisitors()
  }

  getVisitors() {
    const visitorsSubscription = this._visitorsService.visitors$.subscribe(visitors => {
      this.visitors = visitors
    })
    visitorsSubscription.unsubscribe()
  }
}
