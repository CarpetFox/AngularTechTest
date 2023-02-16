import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent {
  @Input() header = '';
  @Input() minWidth: number | undefined = undefined;
  @ContentChild(TemplateRef) template: TemplateRef<any> | undefined;
  
  getTemplateReference(): TemplateRef<any> | null {
    return this.template || null;
  }
}
