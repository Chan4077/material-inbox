import { SharedInjectable } from '../../shared';
import { Email } from '../../emails.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent {
  @Input() emails: Email[];
  snoozeOpts = [
    {
      icon: 'brightness_5',
      title: 'Tomorrow'
    },
    {
      icon: 'weekend',
      title: 'This weekend'
    },
    {
      icon: 'next_week',
      title: 'Next week'
    },
    {
      icon: 'looks',
      title: 'Some day'
    }
  ];
  constructor(private shared: SharedInjectable) { }
  snoozeItem(snooze: any) {
    const snackBarRef = this.shared.openSnackBar({
      msg: `Snoozed until ${snooze.title}`,
      action: 'Undo',
      additionalOpts: { duration: 6000 }
    });
    snackBarRef.onAction().subscribe(() => {
      this.shared.openSnackBar({ msg: 'Snooze was reverted' });
    });
  }
  stopPropogation(event: KeyboardEvent | MouseEvent) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    }
  }
}
