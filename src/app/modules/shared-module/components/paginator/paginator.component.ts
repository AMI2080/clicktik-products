import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent implements OnInit {
  @Input()
  public total: number = 1;

  @Input()
  public current: number = 1;

  @Output()
  public change: EventEmitter<number> = new EventEmitter<number>();

  public paginationArray: (string | number)[] = [];

  public ngOnInit(): void {
    this.updatePaginationArray();
  }

  public updatePaginationArray() {
    this.paginationArray = [];
    if (this.total <= 5) {
      for (let i = 1; i <= this.total; i++) {
        this.paginationArray.push(i);
      }
      return;
    }

    this.paginationArray.push(1);
    this.paginationArray.push(2);

    if (this.current > 5) {
      this.paginationArray.push('...');
    }

    for (
      let i = Math.max(3, this.current - 1);
      i <= Math.min(this.total - 2, this.current + 1);
      i++
    ) {
      this.paginationArray.push(i);
    }

    if (this.current < this.total - 3) {
      this.paginationArray.push('...');
    }

    this.paginationArray.push(this.total - 1);
    this.paginationArray.push(this.total);
  }

  public changePageTo(page: number | string): void {
    if (typeof page === 'number') {
      this.current = page;
      this.change.emit(page);
      this.updatePaginationArray();
    }
  }
}
