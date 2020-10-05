import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent implements OnInit {

  @Input() icon:string;
  @Input() text: string;
  @Output() onClick = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  iconButtonClicked() {
    this.onClick.emit()
  }

}
