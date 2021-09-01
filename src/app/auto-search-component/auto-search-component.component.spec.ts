import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

import { AutocompleteDirective } from './auto-complete.directive';

import { AutoSearchComponentComponent } from './auto-search-component.component';
import { FilterPipe } from './filer.pipe';

describe('AutoSearchComponentComponent', () => {
  let component: AutoSearchComponentComponent;
  let appAutoComplete: AutocompleteDirective;
  let fixture: ComponentFixture<AutoSearchComponentComponent>;

  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      declarations: [ 
        AutoSearchComponentComponent,
        AutocompleteDirective,
      ],
      imports: [
        FormsModule
      ],
    })
    .compileComponents();
  }));

//   beforeEach(async () => {
//     const NG_CONTROL_PROVIDER = {
//         provide: NgControl,
//         useClass: class extends NgControl {
//         control = new FormControl();
//         viewToModelUpdate() {}
//     },
//   };

//   await TestBed.configureTestingModule({
//     declarations: [AutoSearchComponentComponent],
//     imports: [FormsModule],
//   })
//     .overrideComponent(AutoSearchComponentComponent, {
//       add: { providers: [NG_CONTROL_PROVIDER] },
//     })
//     .compileComponents();
// });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSearchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
