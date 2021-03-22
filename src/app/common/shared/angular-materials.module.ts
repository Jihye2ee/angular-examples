import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCommonModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';

const modules = [
    MatSliderModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatCommonModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule
];
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ...modules
    ],
    exports: [
        ... modules
    ]
})
export class AngularMaterialsModule {}
