import * as Raven from 'raven-js';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MultiEditorComponent } from './multi-editor';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ActionTemplateComponent } from './action';
import { ActionsComponent } from './actions/actions.component';
import { DiffViewComponent } from './diff-view/diff-view.component';
import { JsonEditorModule } from 'ng2-json-editor';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AddActionComponent } from './add-action/add-action.component';
import { DeleteActionComponent } from './delete-action/delete-action.component';
import { UpdateActionComponent } from './update-action/update-action.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { EditorToolbarSaveComponent } from './toolbar/editor-toolbar-save/editor-toolbar-save.component';
import { EditorToolbarSearchComponent } from './toolbar/editor-toolbar-search/editor-toolbar-search.component';
import { AutocompleteInputComponent } from './autocomplete-input';

import { SHARED_SERVICES, SHARED_PIPES } from './shared';

import { environment } from '../environments/environment';

Raven
  .config(environment.sentryPublicDSN, { release: environment.version })
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(error: any) {
    if (environment.production) {
      Raven.captureException(error);
    } else {
      throw error;
    }
  }
}

@NgModule({
  declarations: [
    ...SHARED_PIPES,
    AppComponent,
    MultiEditorComponent,
    ActionTemplateComponent,
    ActionsComponent,
    AutocompleteInputComponent,
    DiffViewComponent,
    AddActionComponent,
    DeleteActionComponent,
    UpdateActionComponent,
    ConditionsComponent,
    ToolbarComponent,
    EditorToolbarSaveComponent,
    EditorToolbarSearchComponent,
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    JsonEditorModule,
    TypeaheadModule.forRoot()
  ],
  providers: [
    ...SHARED_SERVICES,
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
