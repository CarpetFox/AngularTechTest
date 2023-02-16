import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { TableCellComponent } from '../table-cell/table-cell.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() trackBy = '';
  @ContentChildren(TableCellComponent) cells!: QueryList<TableCellComponent>;

  getTracker(index: number, dataItem: any): any {
    if (!this.trackBy) {
      return index;
    }
    return dataItem[this.trackBy];
  }

  getCellStyle(minWidth: number | undefined): any {
    if (!minWidth) return undefined;

    const widthInPixels = `${minWidth}px`;
    return {
      'flex-basis': widthInPixels,
      minWidth: widthInPixels
    };
  }
}
