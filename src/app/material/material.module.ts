import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatButtonModule,MatTabsModule,MatFormFieldModule,MatInputModule,MatIconModule,MatProgressBarModule,MatSnackBarModule,
    MatCardModule,MatSidenavModule,MatToolbarModule,MatListModule,MatSelectModule,MatMenuModule,MatDialogModule,MatDatepickerModule,
    MatNativeDateModule,MatExpansionModule,MatChipsModule,MatSlideToggleModule
  ],
  exports:[MatButtonModule,MatTabsModule,MatFormFieldModule,MatInputModule,MatIconModule,MatProgressBarModule,MatSnackBarModule,MatCardModule,
    MatSidenavModule,MatToolbarModule,MatListModule,MatSelectModule,MatMenuModule,MatDialogModule,MatDatepickerModule,MatNativeDateModule,MatExpansionModule,MatChipsModule,MatSlideToggleModule
  ]
})
export class MaterialModule { }
