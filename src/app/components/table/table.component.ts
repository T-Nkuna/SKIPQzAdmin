import { Component, OnInit , Input,OnChanges,SimpleChanges,SimpleChange, ElementRef} from '@angular/core';

export interface RowAction {
  text: string;
  icon: string;
  rowclick: (rowRecord: any) => void;
  popupTrigger?: boolean;
  popupContent?: ElementRef;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() rows:any[]=[];
  @Input() actions: RowAction[] = [];
  @Input() trackByPropertyName: string = "";
  popupTriggerType = 'click'
  columnNames = [];
  
  constructor() { }

 

  ngOnInit() {
    this.columnNames = this.rows.length > 0 ? Object.keys(this.rows[0]) : [];
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if ("rows" in changes && this.columnNames.length == 0) {
      this.columnNames = changes["rows"].currentValue.length > 0 ? Object.keys(changes['rows'].currentValue[0]) : [];
    }

    if ('actions' in changes) {
      //this.actions = changes['actions'].currentValue;
    }
  }

  recordToValues(rec: any) {
    return Object.values(rec);
  }

  getPadding() {
    return ({ padding: "1em" });
  }

  trackByProperty= (index, rec)=> {
    return rec[this.trackByPropertyName];
  }

}
