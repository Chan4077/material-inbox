import { Observable } from 'rxjs/Observable';
import { Injectable, Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectionList, MatListModule } from '@angular/material/list';
import { ComponentType, PortalModule } from '@angular/cdk/portal';
import { Title, SafeHtml } from '@angular/platform-browser';
import { MatCommonModule } from '@angular/material/core';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@Injectable()
export class SharedInjectable {
	private currentUser: string;
	private _title: string;
	constructor(
		private snackBar: MatSnackBar,
		private dialog: MatDialog,
		private documentTitle: Title,
		private breakpointObserver: BreakpointObserver) { }
	/**
	 * Sets the document's title
	 * @param {string} title The title of the document to set
	 */
	set title(title: string) {
		this._title = title;
		if (title !== '') {
			title = `${title} | `;
		}
		this.documentTitle.setTitle(`${title}First-Mod`);
	}
	/**
	 * Returns the document's title
	 */
	get title(): string {
		return this._title;
	}
	/**
	 * Whether the user is on a mobile device
	 * @returns {boolean}
	 */
	public isMobile(): boolean {
		if (this.breakpointObserver.isMatched('(max-width: 699px)')) {
			return true;
		} else {
			return false;
		}
	}
	/**
	 * Opens a snackBar with the specified params and a return of the snackBar's ref (for component)
	 * @param {SnackBarConfig} opts The options of the snackBar
	 * @returns {MatSnackBarRef<any>}
	 */
	public openSnackBarComponent(opts: SnackBarConfig): MatSnackBarRef<any> {
		return this.handleSnackBarWithComponent(opts);
	}
	/**
	 * Opens a snackBar with the specified params and a return of the snackBar's ref (not for component)
	 * @param {SnackBarConfig} opts The options of the snackBar
	 * @returns {MatSnackBar<SimpleSnackBar>}
	 */
	public openSnackBar(opts: SnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
		return this.handleSnackBar(opts);
	}
	/**
	 * Handles a snackBar with a snackBarref if the developer needs a return
	 * @param {SnackBarConfig} opts The config for the snackBar.
	 * @returns {MatSnackBarRef<SimpleSnackBar>}
	 * @private
	 */
	private handleSnackBar(opts: SnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
		if (opts) {
			if (opts.action) {
				let snackBarRef = this.snackBar.open(opts.msg, opts.action, opts.additionalOpts);
				return snackBarRef;
			} else {
				let snackBarRef = this.snackBar.open(opts.msg, undefined, opts.additionalOpts);
				return snackBarRef;
			}
		} else {
			this.throwError("opts", "SnackBarConfig");
		}
	}
	/**
	 * Handles a snackBar with a component
	 * @param {SnackBarConfig} opts The config for the snackBar
	 * @returns {MatSnackbarRef<any>}
	 */
	private handleSnackBarWithComponent(opts: SnackBarConfig): MatSnackBarRef<any> {
		if (opts) {
			if (opts.additionalOpts) {
				if (opts.additionalOpts) {
					return this.snackBar.openFromComponent(opts.component, opts.additionalOpts);
				} else {
					return this.snackBar.openFromComponent(opts.component);
				}
			} else {
				this.throwError("opts.additionalOpts", "MatSnackBarConfig");
			}
		} else {
			this.throwError("opts", "SnackBarConfig");
		}
	}
	/**
	 * Closes the current snackBar
	 * @deprecated Please use {@link MatSnackBar#dismiss} instead
	 */
	public closeSnackBar() {
		this.snackBar.dismiss();
	}
	/**
	 * Opens an alert dialog with the specified parameters
	 * @param {AlertDialogConfig} opts The options for the dialog
	 * @returns {MatDialogRef<AlertDialog>}
	 */
	public openAlertDialog(opts: AlertDialogConfig): MatDialogRef<AlertDialog> {
		if (opts) {
			let dialogRef = this.dialog.open(AlertDialog);
			dialogRef.componentInstance.alertConfig = opts;
			return dialogRef;
		} else {
			this.throwError("opts", "AlertDialogConfig");
		}
	}
	/**
	 * Opens a confirm dialog with the specified parameters
	 * @param {ConfirMatialogConfig} opts The options for the dialog
	 * @return {MatDialogRef<ConfirMatialog>}
	 */
	public openConfirmDialog(opts: ConfirmDialogConfig): MatDialogRef<ConfirmDialog> {
		if (opts) {
			let dialogRef = this.dialog.open(ConfirmDialog);
			dialogRef.componentInstance.confirmConfig = opts;
			return dialogRef;
		} else {
			this.throwError("opts", "ConfirmDialogConfig");
		}
	}
	/**
	 * Opens a prompt dialog with the specified parameters
	 * @param {PromptDialogConfig} opts The options for the dialog
	 * @return {MatDialogRef<PromptDialog>}
	 */
	public openPromptDialog(opts: PromptDialogConfig): MatDialogRef<PromptDialog> {
		if (opts) {
			let dialogRef = this.dialog.open(PromptDialog);
			dialogRef.componentInstance.promptConfig = opts;
			return dialogRef;
		} else {
			this.throwError("opts", "PromptDialogConfig");
		}
	}
	/**
	 * Opens a selection dialog with the configured options
	 * @param {SelectionDialogConfig} opts The options for the dialog
	 * @returns {MatDialogRef<SelectionDialog>}
	 */
	public openSelectionDialog(opts: SelectionDialogConfig): MatDialogRef<SelectionDialog> {
		if (opts) {
			let dialogRef = this.dialog.open(SelectionDialog, { disableClose: true, panelClass: "selection-dialog" });
			dialogRef.componentInstance.selectionConfig = opts;
			return dialogRef;
		} else {
			this.throwError("opts", "SelectionDialogConfig");
		}
	}
	/**
	 * Gets all opens dialogs
	 * @returns {MatDialogRef<any>[]}
	 * @deprecated Please use {@link MatDialog#openDialogs} instead
	 */
	public getDialogs(): MatDialogRef<any>[] {
		return this.dialog.openDialogs;
	}
	/**
	 * Closes all dialogs
	 * @deprecated Please use {@link MatDialog#closeAll} instead
	 */
	public closeAllDialogs() {
		this.dialog.closeAll();
	}
	/**
	 * Gets a dialog by its id
	 * @param {string} id The ID of the dialog
	 * @returns {MatDialogRef<any>}
	 * @deprecated Please use {@link MatDialog#getDialogById} instead
	 */
	public getDialogById(id: string): MatDialogRef<any> {
		return this.dialog.getDialogById(id);
	}
	/**
	 * Observable for after all dialogs have been closed
	 * @returns {Observable<void>}
	 * @deprecated Please use {@link MatDialog#afterAllClosed} instead
	 */
	public afterAllClosed(): Observable<void> {
		return this.dialog.afterAllClosed;
	}
	/**
	 * Throws an error with the specified parameters
	 * @param {string} variable The variable that was not specified
	 * @param {string} type The type of variable (optional)
	 * @private
	 */
	private throwError(variable: string, type?: string) {
		if (type) {
			throw new Error(`${variable} was not specified. Please ensure that the ${variable} property is specified and that it is of type "${type}".`);
		} else {
			throw new Error(`${variable} was not specified. Please ensure that the ${variable} property is specified.`);
		}
	}
	/**
	 * Checks if the app is in developer mode
	 * @todo Make this `readonly`
	 * @note Set it by changing the local storage and add a property `devMode` and set the value to true
	 */
	checkDevMode(): boolean {
		if (window.localStorage.getItem('devMode')) {
			if (JSON.parse(window.localStorage.getItem('devMode'))) {
				return true;
			} else {
				return false;
			}
		}
	}
}


@Component({
	selector: 'alert-dialog',
	templateUrl: './partials/alertdialog.shared.html'
})
export class AlertDialog implements OnInit {
	constructor(private dialogRef: MatDialogRef<AlertDialog>) {}
	/**
	 * The configuration of the dialog
	 */
	alertConfig: AlertDialogConfig;
	/**
	 * Closes the dialog
	 */
	close() {
		this.dialogRef.close();
	}
	ngOnInit() {
		if (this.alertConfig.disableClose) {
			this.dialogRef.disableClose = true;
		}
	}
}
@Component({
	selector: 'confirm-dialog',
	templateUrl: './partials/confirmdialog.shared.html'
})
export class ConfirmDialog implements OnInit {
	constructor(private dialogRef: MatDialogRef<ConfirmDialog>) {}
	/**
	 * The configuration of the dialog
	 */
	confirmConfig: ConfirmDialogConfig;
	/**
	 * Closes the dialog and returns a result of "cancel"
	 */
	cancel() {
		this.dialogRef.close("cancel");
	}
	/**
	 * Closes the dialog and returns a result of "ok"
	 */
	ok() {
		this.dialogRef.close("ok");
	}
	ngOnInit() {
		if (this.confirmConfig.disableClose) {
			this.dialogRef.disableClose = true;
		}
	}
}
@Component({
	selector: 'prompt-dialog',
	templateUrl: './partials/promptdialog.shared.html'
})
export class PromptDialog implements OnInit {
	constructor(private dialogRef: MatDialogRef<PromptDialog>) {}
	/**
	 * The configuration of the dialog
	 */
	promptConfig: PromptDialogConfig;
	/**
	 * The type of input
	 * @private
	 * @note Please use the dialog config interface, where the input value can be specified
	 */
	private input: string | number;
	/**
	 * Closes the dialog and returns a result of "cancel"
	 */
	cancel() {
		this.dialogRef.close("cancel");
	}
	/**
	 * Closes the dialog and returns a result of the input's value
	 */
	ok() {
		this.dialogRef.close(this.input);
	}
	ngOnInit() {
		if (this.promptConfig.value) {
			this.input = this.promptConfig.value;
		}
		if (this.promptConfig.disableClose) {
			this.dialogRef.disableClose = true;
		}
	}
}
@Component({
	selector: 'selection-dialog',
	templateUrl: './partials/selectiondialog.shared.html'
})
export class SelectionDialog implements OnInit {
	@ViewChild('selection') selection: MatSelectionList;
	constructor(private dialogRef: MatDialogRef<SelectionDialog>) {}
	/**
	 * The configuration of the dialog
	 */
	selectionConfig: SelectionDialogConfig;
	ngOnInit() {
		if (this.selectionConfig.disableClose) {
			this.dialogRef.disableClose = true;
		}
	}
	/**
	 * Closes the dialog and returns a result of "cancel"
	 */
	cancel() {
		this.dialogRef.close("cancel");
	}
	/**
	 * Closes the dialog and returns a result of "ok"
	 */
	ok() {
		this.dialogRef.close(this.selection.selectedOptions.selected);
	}
}
export interface SnackBarConfig {
	/**
	 * The message for the snackBar
	 * @type {string}
	 */
	msg: string;
	/**
	 * The action for the snackBar
	 * @type {string}
	 */
	action?: string;
	/**
	 * The custom component for the snackBar to open in
	 * @type {ComponentType<any>}
	 */
	component?: ComponentType<any>;
	/**
	 * Additional options
	 * @type {MatSnackBarConfig}
	 */
	additionalOpts?: MatSnackBarConfig;
}
export interface DialogConfig extends MatDialogConfig {
	/**
	 * The message of the dialog
	 * @type {string|SafeHtml}
	 */
	msg: string | SafeHtml;
	/**
	 * The title of the dialog
	 * @type {string}
	 */
	title?: string;
	/**
	 * Whether the dialog's message is HTML
	 * @type {boolean}
	 */
	isHtml?: boolean;
}
export interface AlertDialogConfig extends DialogConfig {
	/**
	 * The ok button text
	 * @type {string}
	 */
	ok?: string;
}

export interface ConfirmDialogConfig extends DialogConfig {
	/**
	 * The ok button text
	 * @type {string}
	 */
	ok?: string;
	/**
	 * The cancel button text
	 * @type {string}
	 */
	cancel?: string;
}

export interface PromptDialogConfig extends DialogConfig {
	/**
	 * The ok button text
	 * @type {string}
	 */
	ok?: string;
	/**
	 * The cancel button text
	 * @type {string}
	 */
	cancel?: string;
	/**
	 * The placeholder of the input
	 * @type {string}
	 */
	placeholder: string;
	/**
	 * The input type
	 * @type {"text"|"email"|"password"|"number"}
	 */
	inputType?: "text" | "email" | "password" | "number";
	/**
	 * The initial value of the input
	 * @type {string|number}
	 */
	value?: string | number;
	/**
	 * The color of the input
	 * @type {"primary"|"accent"|"warn"}
	 */
	color?: "primary" | "accent" | "warn";
}
export interface SelectionDialogConfig extends DialogConfig {
	/**
	 * The ok button text
	 * @type {string}
	 */
	ok?: string;
	/**
	 * The cancel button text
	 * @type {string}
	 */
	cancel?: string;
	/**
	 * The options for the selection dialog
	 * @type {SelectionDialogOptions[]}
	 */
	options: SelectionDialogOptions[];
}
export interface SelectionDialogOptions {
	/**
	 * The title of the selection list item
	 * @type {string}
	 */
	content: string;
	/**
	 * Whether the selection list item is disabled
	 * @type {boolean}
	 */
	disabled?: boolean;
	/**
	 * The value of the selection list item
	 * @type {any}
	 */
	value: any;
	/**
	 * The checkbox position of the selection list item
	 * @type {"before"|"after"}
	 */
	checkboxPosition?: "before" | "after";
	/**
	 * Whether the selection list item is initially selected
	 * @type {boolean}
	 */
	selected?: boolean;
}
/**
 * All dialogs
 */
const SHARED_DIALOGS = [
	AlertDialog,
	ConfirmDialog,
	PromptDialog,
	SelectionDialog
];
/**
 * Material modules required
 */
const MATERIAL_MODULES = [
	MatCommonModule,
	MatButtonModule,
	MatDialogModule,
	MatFormFieldModule,
	MatInputModule,
	MatListModule,
	MatSnackBarModule
];
/**
 * CDK (Component DevKit) modules required
 */
const CDK_MODULES = [
	LayoutModule,
	PortalModule
]
/**
 * The shared module
 */
@NgModule({
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		FormsModule,
		MATERIAL_MODULES,
		CDK_MODULES
	],
	exports: [
		SHARED_DIALOGS
	],
	providers: [
		SharedInjectable
	],
	entryComponents: [
		SHARED_DIALOGS
	],
	declarations: [
		SHARED_DIALOGS
	]
})
export class SharedModule {}
