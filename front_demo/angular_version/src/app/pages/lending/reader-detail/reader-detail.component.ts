import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { LibraryService } from '../../../library.service';
import { Reader } from '../../../interfaces/reader.inteface';

@Component({
  selector: 'app-reader-detail',
  standalone: true,
  imports: [DatePipe, NgFor, NgIf],
  templateUrl: './reader-detail.component.html',
  styleUrl: './reader-detail.component.less'
})
export class ReaderDetailComponent implements OnInit {
  reader?: Reader;

  constructor(private libraryService: LibraryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getReader();
    if (!this.reader) {
      this.router.navigate(['/404'])
    }
  }

  getReader(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.libraryService.getReaderById(id).subscribe(reader => this.reader = reader);
  }
}
