import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-auto-search-component',
  templateUrl: './auto-search-component.component.html',
  styleUrls: ['./auto-search-component.component.css']
})
export class AutoSearchComponentComponent implements OnInit {

    constructor() { }

    options = [
      { id: 1, label: 'One' },
      { id: 2, label: 'Two' },
      { id: 3, label: 'Three' }
    ];
    control = new FormControl();

    ngOnInit(): void {}

}
