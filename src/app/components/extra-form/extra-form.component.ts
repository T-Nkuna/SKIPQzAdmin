import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExtraModel } from 'src/app/models/extra.model';

@Component({
  selector: 'app-extra-form',
  templateUrl: './extra-form.component.html',
  styleUrls: ['./extra-form.component.css']
})
export class ExtraFormComponent implements OnInit {

  @Output() extraSubmit = new EventEmitter<ExtraModel>();
  @Input() extra = new ExtraModel();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.extra.cost = parseFloat(this.extra.cost.toString());
    this.extra.duration = parseFloat(this.extra.duration.toString());
     this.extraSubmit.emit(this.extra);
  }

}
