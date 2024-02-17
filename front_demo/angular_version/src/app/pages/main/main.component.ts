import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.less'
})
export class MainComponent {

}
