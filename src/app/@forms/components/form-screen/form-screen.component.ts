import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'form-screen',
  templateUrl: './form-screen.component.html',
  styleUrls: ['./form-screen.component.scss']
})
export class FormScreenComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.setToolBarHeading("Create New Form");
  }

}
