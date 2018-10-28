import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RemindersDialog } from './reminders-dialog/reminders-dialog.component';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'scale(0)', opacity: 0 }),
          animate('0.2s ease-in-out', style({ transform: 'scale(1)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'scale(1)', opacity: 1 }),
          animate('0.2s ease-in-out', style({ transform: 'scale(0)', opacity: 0 }))
        ])
      ]
    )
  ]
})
export class RemindersComponent implements OnInit {
  reminders: Reminder[] = [];
  constructor(private dialog: MatDialog) { }
  addNew() {
    const dialogRef = this.dialog.open(RemindersDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result == 'cancel') {
        } else {
          console.log(result);
          this.reminders.push(result);
        }
      }
    });
  }
  markAsDone(reminder: Reminder) {

  }
  ngOnInit() {
  }

}
export interface Reminder {
  desc: string;
  title: string;
  dueDate?: Date | any;
}
