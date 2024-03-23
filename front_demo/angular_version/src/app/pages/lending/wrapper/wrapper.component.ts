import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.less'
})
export class WrapperComponent {

}
