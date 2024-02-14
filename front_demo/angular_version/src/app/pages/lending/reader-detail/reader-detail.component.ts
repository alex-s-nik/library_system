import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ReaderService } from '../../../reader.service';
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

  constructor(private readerService: ReaderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getReader();
  }

  getReader(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.readerService.getReaderById(id).subscribe(reader => this.reader = reader);
  }
}
