import { SentComponent } from './sent/sent.component';
import { DraftsComponent } from './drafts/drafts.component';
import { SnoozedComponent } from './snoozed/snoozed.component';
import { RemindersComponent } from './reminders/reminders.component';
import { DoneComponent } from './done/done.component';
import { SpamComponent } from './spam/spam.component';
import { BinComponent } from './bin/bin.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const APP_ROUTES: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'bin', component: BinComponent },
	{ path: 'spam', component: SpamComponent },
	{ path: 'done', component: DoneComponent },
	{ path: 'reminders', component: RemindersComponent },
	{ path: 'snoozed', component: SnoozedComponent },
	{ path: 'drafts', component: DraftsComponent },
	{ path: 'sent', component: SentComponent }
]

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);