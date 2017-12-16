import { EmailsService, Email } from '../emails.service';
import { SafeHtml } from '@angular/platform-browser';
import { SharedInjectable } from '../shared';
import { Component, Input } from '@angular/core';
@Component({
	selector: 'app-message',
	templateUrl: './message.component.html'
})
export class MessageComponent {
	@Input() email: Email;
	snoozeOpts = [
		{
			icon: "brightness_5",
			title: "Tomorrow",
			id: "tomorrow"
		},
		{
			icon: "weekend",
			title: "This weekend",
			id: "this_weekend"
		},
		{
			icon: "next_week",
			title: "Next week",
			id: "next_week"
		},
		{
			icon: "looks",
			title: "Some day",
			id: "some_day"
		}
	]
	constructor(private shared: SharedInjectable, private emailsService: EmailsService) { }
	snoozeItem(snooze: any) {
		this.emailsService.snoozeEmail(this.email.index, snooze.id);
	}
}