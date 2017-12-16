import { Email, EmailsService } from '../emails.service';
import { SharedInjectable } from '../shared';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
	constructor(private dom: DomSanitizer, private emailsService: EmailsService, private shared: SharedInjectable) { }
	get isDevMode() {
		return this.shared.checkDevMode();
	}
	get emails() {
		return this.emailsService.getEmails();
	}
	clearAll() {
		this.emailsService.clearAll();
	}
	populateData() {
		this.emailsService.generateDummyContent();
	}
	ngOnInit() {
		this.populateData();
	}
}
