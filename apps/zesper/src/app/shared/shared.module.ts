import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  exports: [MatToolbarModule, MatIconModule]
})
export class SharedModule {}
