import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Reminder } from '../reminders.component';

@Component({
	selector: 'app-reminders-dialog',
	templateUrl: './reminders-dialog.component.html'
})
export class RemindersDialog implements OnInit {
	reminder: Reminder;
	today = new Date();
	constructor(private dialogRef: MatDialogRef<RemindersDialog>) { }
	cancel() {
		this.dialogRef.close("cancel");
	}
	/**
	 * @todo Add actual functionality
	 */
	save() {
		this.dialogRef.close(this.reminder);
	}
	ngOnInit() {
		this.reminder = {
			title: "",
			desc: "",
			dueDate: ""
		}
	}

}
