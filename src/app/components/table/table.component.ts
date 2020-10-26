import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit , Input,OnChanges,SimpleChanges,SimpleChange, ElementRef, TemplateRef} from '@angular/core';
import { NbDialogService , NbDialogRef} from '@nebular/theme';

export interface RowAction<T> {
  text: string;
  icon: string;
  rowclick: (rowRecord: T, dialog?:NbDialogRef<any>) => void;
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
  @Input() excludedColumns:Array<string> = [];
  popupTriggerType = 'click'
  columnNames = [];
  openedDialog:NbDialogRef<any>;
  constructor(private _dialogService:NbDialogService) {
   }

 

  ngOnInit() {
    this.columnNames = this.rows.length > 0 ? Object.keys(this.rows[0]) : [];
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if ("rows" in changes && this.columnNames.length == 0) {
      this.columnNames = (changes["rows"].currentValue.length > 0 ? Object.keys(changes['rows'].currentValue[0]) : []);
    }

    if ('actions' in changes) {
      //this.actions = changes['actions'].currentValue;
    }
  }

  recordToValues(rec: T) {
    return rec?Object.values(rec):[];
  }

  recordToEntries(rec:T)
  {
    return rec? Object.entries(rec).map(entry=>({key:entry[0],value:entry[1]})):[]
  }

  getPadding() {
    return ({ padding: "1em" });
  }

  trackByProperty= (index, rec)=> {
    return rec && this.trackByPropertyName in rec?rec[this.trackByPropertyName]:null;
  }

  onActionClick(rowEle:T,popupTrigger:boolean,popupContent:TemplateRef<any>,rowClick:(rec:T,dialog?:NbDialogRef<any>)=>void){
    
    if(popupTrigger){
     this.openedDialog =  this._dialogService.open(popupContent);
     rowClick(rowEle,this.openedDialog);
    }
    else
    {
      rowClick(rowEle);
    }
    
  }

  isExcluded(columnName:string)
  {
    return this.excludedColumns.includes(columnName);
  }
}
