import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable()
export class EmailsService {
	emails: Email[] = [];
	constructor(private dom: DomSanitizer, private snackBar: MatSnackBar) { }
	/**
	 * Gets all emails marked as done
	 * @returns {Email[]}
	 */
	getDoneEmails(): Email[] {
		let doneEmails: Email[] = [];
		for (var i = 0; i < this.emails.length; i++) {
			if (this.emails[i].isMarkedAsDone) {
				doneEmails.push(this.emails[i]);
			}
		}
		return doneEmails;
	}
	/**
	 * Gets all snoozed emails
	 * @returns {Email[]}
	 */
	getSnoozedEmails(): Email[] {
		let snoozedEmails: Email[] = [];
		for (var i = 0; i < this.emails.length; i++) {
			if (this.emails[i].isSnoozed) {
				snoozedEmails.push(this.emails[i]);
			}
		}
		return snoozedEmails;
	}
	/**
	 * Gets all emails
	 * @returns {Email[]}
	 */
	getEmails(): Email[] {
		return this.emails;
	}
	/**
	 * Creates a new email
	 * @param {Email} email The email to create
	 */
	newEmail(email: Email) {
		this.emails.push(email);
	}
	/**
	 * Clear all emails
	 */
	clearAll() {
		this.emails = [];
	}
	/**
	 * Snoozes the email
	 * @todo Finish implementation
	 */
	snoozeEmail(index: number, snoozeBy?: "tomorrow" | "this_weekend" | "next_week" | "some_day") {
		this.emails[index].isSnoozed = true;
		if (snoozeBy) {
			switch (snoozeBy) {
				case "tomorrow":
					this.snoozeEmailSnackBar("tomorrow");
					break;
				case "this_weekend":
					this.snoozeEmailSnackBar("this_weekend");
					break;
				case "next_week":
					this.snoozeEmailSnackBar("next_week");
					break;
				case "some_day":
					this.snoozeEmailSnackBar("some_day");
					break;
				default:
					throw new ReferenceError("Invalid param");
			}
		} else {
			/**
			 * @todo Finish statement
			 */
		}
	}
	private snoozeEmailSnackBar(type: "tomorrow" | "this_weekend" | "next_week" | "some_day") {
		let snackBarRef: MatSnackBarRef<SimpleSnackBar>;
		switch (type) {
			case "tomorrow":
				snackBarRef = this.snackBar.open("Snoozed until tomorrow", "Undo", { duration: 7000, extraClasses: ["mat-elevation-z2"], horizontalPosition: "start" });
				break;
			case "this_weekend":
				snackBarRef = this.snackBar.open("Snoozed until this weekend", "Undo", { duration: 7000, extraClasses: ["mat-elevation-z2"], horizontalPosition: "start" });
				break;
			case "next_week":
				snackBarRef = this.snackBar.open("Snoozed until next week", "Undo", { duration: 7000, extraClasses: ["mat-elevation-z2"], horizontalPosition: "start" });
				break;
			case "some_day":
				snackBarRef = this.snackBar.open("Snoozed until some day", "Undo", { duration: 7000, extraClasses: ["mat-elevation-z2"], horizontalPosition: "start" });
				break;
			default:
				throw new ReferenceError("Invalid param");
		}
		snackBarRef.onAction().subscribe(() => {
			this.snackBar.open("Snooze was reverted", null, { duration: 6000, horizontalPosition: "start", extraClasses: ["mat-elevation-z2"] });
		});
	}
	/**
	 * Generates some fake content
	 * @todo Remove this method and/or deprecate it
	 */
	generateDummyContent() {
		let firstEmail = {
			index: 0,
			avatar: "A",
			from: "Aaron Lim",
			to: "me",
			message: "What's the meaning of life? Is it to study, or to sleep? Why is life like this? (Random qns lol)",
			subject: "The meaning of life"
		};
		let secondEmail = {
			index: 1,
			avatar: "M",
			from: "Marketing Labs",
			to: "me",
			message: "Your delivery is reversed for next Wednesday. Get ready for it!",
			subject: "Delivery for 19 Oct 2017"
		}
		let newLineEmail = {
			index: 2,
			avatar: "L",
			from: "Lorem ipsum",
			to: "me",
			message: "Let's see if new lines work...\n\n\nTest\n\nTest stuff",
			subject: "Testing 123"
		}
		let htmlEmailContent = `<h1>This is header 1</h1>
		<h2>This is header 2</h2>
		<h3>This is header 3</h3>
		<h4>This is header 4</h4>
		<h5>This is header 5</h5>
		<h6>This is header 6</h6>
		<p>This is paragraph</p>
		<hr>
		<br>
		<pre><code>console.log("TEST")</code></pre>
		<samp>Test</samp>
		<kbd>Keyboard</kbd>
		<button onclick="alert('HTML is great!')">I'm a button</button>
		<button onclick="alert('HTML is great!')" class="mat-button" mat-button>
			<span class="mat-button-wrapper">I'm a button</span>
			<div class="mat-ripple mat-button-ripple" matripple></div>
			<div class="mat-button-focus-overlay"></div>
		</button>
		<div>I'm a div element.</div>
		<a href="https://example.com">click me</a>`;
		let htmlEmail = {
			index: 3,
			avatar: "L",
			from: "Lorem ipsum",
			to: "me",
			isHtml: true,
			message: this.dom.bypassSecurityTrustHtml(htmlEmailContent),
			subject: "HTML content"
		}
		this.emails.push(firstEmail);
		this.emails.push(secondEmail);
		this.emails.push(newLineEmail);
		this.emails.push(htmlEmail);
	}

}

export interface Email {
	/**
	 * The index of the email
	 */
	index: number;
	/**
	 * The subject of the email
	 */
	subject: string;
	/**
	 * The person who sent the email
	 */
	from: string;
	/**
	 * The person who received the email
	 */
	to: string;
	/**
	 * The message of the email
	 */
	message: string | SafeHtml;
	/**
	 * The date that the email was sent
	 */
	date?: Date | any;
	/**
	 * The avatar of the person who sent the email
	 */
	avatar: string;
	/**
	 * Whether the message is in HTML
	 */
	isHtml?: boolean;
	/**
	 * Whether the email is snoozed
	 */
	isSnoozed?: boolean;
	/**
	 * Whether the email is marked as done
	 */
	isMarkedAsDone?: boolean;
}