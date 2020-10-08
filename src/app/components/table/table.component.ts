import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit , Input,OnChanges,SimpleChanges,SimpleChange, ElementRef, TemplateRef} from '@angular/core';
import { NbDialogService } from '@nebular/theme';

export interface RowAction<T> {
  text: string;
  icon: string;
  rowclick: (rowRecord: T) => void;
  popupTrigger?: boolean;
  popupContent?: TemplateRef<any>;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> implements OnInit, OnChanges {

  @Input() rows:T[]=[];
  @Input() actions: RowAction<T>[] = [];
  @Input() trackByPropertyName: string = "";
  popupTriggerType = 'click'
  columnNames = [];
  
  constructor(private _dialogService:NbDialogService) { }

 

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
    return rec?Object.values(rec):[];
  }

  getPadding() {
    return ({ padding: "1em" });
  }

  trackByProperty= (index, rec)=> {
    return rec && this.trackByPropertyName in rec?rec[this.trackByPropertyName]:null;
  }

  onActionClick(rowEle:T,popupTrigger:boolean,popupContent:TemplateRef<any>,rowClick:(rec:T)=>void){
    rowClick(rowEle);
    if(popupTrigger){
      this._dialogService.open(popupContent);
    }
    
  }

}
