import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReaderComponent } from './reader/reader.component';

@Component({
  selector: 'app-lending',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReaderComponent],
  templateUrl: './lending.component.html',
  styleUrl: './lending.component.less'
})
export class LendingComponent {

}
