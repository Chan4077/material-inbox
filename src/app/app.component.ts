import { EmailsService, Email } from './emails.service';
import { SharedInjectable } from './shared';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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
export class AppComponent implements OnInit {
  constructor(
    private shared: SharedInjectable,
    private emailsService: EmailsService,
    private router: Router) { }
  isRefreshing = false;
  @ViewChild('left') sidenav: MatSidenav;
  get isDevMode() {
    return this.shared.checkDevMode();
  }
  get isSidenavOpen() {
    if (this.sidenav.opened) {
      return true;
    } else {
      return false;
    }
  }
  get isMobile() {
    return this.shared.isMobile();
  }
  apps = [
    {
      title: 'Gmail',
      link: 'https://mail.google.com'
    },
    {
      title: 'Google Drive',
      link: 'https://drive.google.com'
    },
    {
      title: 'Google+',
      link: 'https://plus.google.com'
    }
  ];
  links: NavLink[] = [
    {
      link: 'home',
      title: 'Inbox',
      icon: 'inbox',
      unreadCount: '99+'
    },
    {
      link: 'snoozed',
      title: 'Snoozed',
      icon: 'access_time'
    },
    {
      link: 'done',
      title: 'Done',
      icon: 'check'
    }
  ];
  otherLinks: NavLink[] = [
    {
      link: 'drafts',
      title: 'Drafts',
      icon: 'drafts'
    },
    {
      link: 'sent',
      title: 'Sent',
      icon: 'send'
    },
    {
      link: 'reminders',
      title: 'Reminders',
      icon: 'alarm'
    },
    {
      link: 'bin',
      title: 'Bin',
      icon: 'delete'
    },
    {
      link: 'spam',
      title: 'Spam',
      icon: 'warning'
    }
  ];
  refresh() {
    this.isRefreshing = true;
    setTimeout(() => {
      this.isRefreshing = false;
      const fakeEmail: Email = {
        index: this.emailsService.getEmails().length++,
        avatar: 'J',
        from: 'John Lim',
        to: 'me',
        subject: 'I\'m a message',
        message: 'I\'m terribly sorry for spamming you with tons of lorem ipsum text.',
        date: new Date(),
        isHtml: false
      };
      this.emailsService.newEmail(fakeEmail);
      const snackBarRef = this.shared.openSnackBar({
        msg: '1 new message was received!',
        action: 'View message'
      });
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['/home']);
      });
    }, 3000);
  }
  disableDevMode() {
    window.localStorage.setItem('devMode', JSON.stringify(false));
  }
  ngOnInit() {
    if (this.shared.checkDevMode()) {
      const snackBarRef = this.shared.openSnackBar({
        msg: 'Developer mode is enabled. If you did not intend to enable it, please click or tap the \'Disable developer mode\' button.',
        action: 'Disable developer mode',
        additionalOpts: {
          panelClass: ['devmode-snackbar'],
          duration: null
        }
      });
      snackBarRef.onAction().subscribe(() => {
        this.disableDevMode();
      });
    }
  }
}

interface NavLink {
  link: string;
  title: string;
  icon?: string;
  unreadCount?: number | string | any;
}
