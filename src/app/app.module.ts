//#region Service imports
import { EmailsService } from './emails.service';
//#edregion

//#region App routing import
import { AppRouting } from './app.routing';
//#endregion

//#region App component imports
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SpamComponent } from './spam/spam.component';
import { BinComponent } from './bin/bin.component';
import { DoneComponent } from './done/done.component';
import { RemindersComponent } from './reminders/reminders.component';
import { MessageComponent } from './message/message.component';
import { MessagesComponent } from './message/messages/messages.component';
import { SnoozedComponent } from './snoozed/snoozed.component';
import { DraftsComponent } from './drafts/drafts.component';
import { SentComponent } from './sent/sent.component';
//#endregion

//#region Shared module import
import { SharedModule } from './shared';
//#endregion
//#region Material module imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
//#endregion

//#region CDK module imports
import { LayoutModule } from '@angular/cdk/layout';
//#endregion

//#region Other module imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//#endregion
//#region Dialog imports
import { RemindersDialog } from './reminders/reminders-dialog/reminders-dialog.component';
//#endregion
//#region Material modules
const MATERIAL_MODULES = [
	MatButtonModule,
	MatCardModule,
	MatChipsModule,
	MatDatepickerModule,
	MatDialogModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule,
	MatSidenavModule,
	MatSnackBarModule,
	MatToolbarModule,
	MatTooltipModule
];
//#endregion

//#region CDK modules
const CDK_MODULES = [
	LayoutModule
];
//#endregion

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		SpamComponent,
		BinComponent,
		DoneComponent,
		RemindersComponent,
		MessageComponent,
		MessagesComponent,
		SnoozedComponent,
		DraftsComponent,
		SentComponent,
		RemindersDialog
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,
		FlexLayoutModule,
		AppRouting,
		MATERIAL_MODULES,
		CDK_MODULES,
		SharedModule
	],
	bootstrap: [AppComponent],
	entryComponents: [
		RemindersDialog
	],
	providers: [
		EmailsService
	]
})
export class AppModule { }
