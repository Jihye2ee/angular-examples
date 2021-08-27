import { Component, ElementRef, Input } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { mapTo } from "rxjs/operators";

@Component({
    selector: 'app-option',
    template: `
        <div class="option">
            <ng-content></ng-content>
        </div>
    `
})
export class OptionComponent {
    @Input() value: string;  
    click$: Observable<string>;  
    
    constructor(private host: ElementRef) {}  
    
    ngOnInit() {  
        this.click$ = fromEvent(this.element, 'click').pipe(mapTo(this.value));  
    }  
    
    get element() {  return this.host.nativeElement; }  
}