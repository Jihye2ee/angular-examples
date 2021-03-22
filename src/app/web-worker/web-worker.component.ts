import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-web-worker',
  templateUrl: './web-worker.component.html',
  styleUrls: ['./web-worker.component.css']
})
export class WebWorkerComponent implements OnInit, OnDestroy {

    sharedWorker: SharedWorker.SharedWorker;

    heavyComputationStatus = '';
    // appLifeSpan$ = timer(0, 3000);

    constructor(
        private ngZone: NgZone,
        private cdr: ChangeDetectorRef
    ) { }
    

    ngOnInit(): void {
        this.sharedWorker = new SharedWorker('./assets/shared-worker.worker.js');
        this.sharedWorker.port.onmessage = ({data}) => {
            console.log('[web-worker onmessage]', data);
            this.heavyComputationStatus = data;
            this.cdr.detectChanges();
        };
        this.sharedWorker.port.start();
    }

    calculate() {
        this.heavyComputationStatus = 'Calculations (inside component) were finished with id ' + Math.round(Math.random() * 100);
    }

    share() {
        this.sharedWorker.port.postMessage(this.heavyComputationStatus);
    }

    ngOnDestroy(): void {
        // this.sharedWorker.
    }

}
