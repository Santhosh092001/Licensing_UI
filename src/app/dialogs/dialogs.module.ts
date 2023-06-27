import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceDialogComponent } from './choice-dialog/choice-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

const routes : Routes =[
  {
    path:'choicedialog',
    component:ChoiceDialogComponent
  }
];

@NgModule({
  declarations: [
    ChoiceDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NbCardModule,
    NbButtonModule
  ]
})
export class DialogsModule { }
