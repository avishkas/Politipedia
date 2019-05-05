import {Component, Input, OnInit} from '@angular/core';
import {GetInfoService} from "../get-info.service";

@Component({
  selector: 'app-topdonors',
  templateUrl: './topdonors.component.html',
  styleUrls: ['./topdonors.component.css']
})


export class TopdonorsComponent implements OnInit {

  @Input() listDonor: string[];

  constructor(private infoService: GetInfoService) { }

  ngOnInit() {
  }

}
