import { Shared } from './shared';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	constructor(private breakpointObserver: BreakpointObserver, private shared: Shared){}
	isRefreshing: boolean = false;
	@ViewChild('left') sidenav: MatSidenav;
	get isSidenavOpen() {
		if (this.sidenav.opened) {
			return true;
		} else {
			return false;
		}
	}
	get isMobile() {
		if (this.breakpointObserver.isMatched('(max-width: 599px)')) {
			return true;
		} else {
			return false;
		}
	}
	links: NavLink[] = [
		{
			link: "home",
			title: "Inbox",
			icon: "inbox"
		},
		{
			link: "snoozed",
			title: "Snoozed",
			icon: "access_time"
		},
		{
			link: "done",
			title: "Done",
			icon: "check"
		}
	];
	otherLinks: NavLink[] = [
		{
			link: "drafts",
			title: "Drafts",
			icon: "drafts"
		},
		{
			link: "sent",
			title: "Sent",
			icon: "send"
		},
		{
			link: "reminders",
			title: "Reminders",
			icon: "alarm"
		},
		{
			link: "bin",
			title: "Bin",
			icon: "delete"
		},
		{
			link: "spam",
			title: "Spam",
			icon: "warning"
		}
	]
	refresh() {
		this.isRefreshing = true;
		setTimeout(()=> {
			this.isRefreshing = false;
			let snackBarRef = this.shared.openSnackBarWithRef({msg: "1 new message found!", action: "View message", additionalOpts: {duration: 4000, horizontalPosition: "start"}});
			snackBarRef.onAction().subscribe(_ => {
				console.log("Navigating to new message...");
			})
		}, 3000)
	}
}

interface NavLink {
	link: string;
	title: string;
	icon?: string;
}