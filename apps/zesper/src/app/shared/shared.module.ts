import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';
import { ErrorSnackbarComponent } from './error-snackbar/error-snackbar.component';

const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatSnackBarModule,
  MatButtonModule,
];

@NgModule({
  declarations: [ErrorSnackbarComponent],
  imports: [
    CommonModule,
    ...materialModules,
  ],
  exports: [...materialModules],
  entryComponents: [ErrorSnackbarComponent],
})
export class SharedModule {}
