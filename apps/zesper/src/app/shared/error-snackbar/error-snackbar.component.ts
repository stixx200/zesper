import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { parseGraphQLError, getErrorMessage } from '../graphql.helpers';
import { ApolloError } from 'apollo-client';

@Component({
  selector: 'zesper-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.css']
})
export class ErrorSnackbarComponent implements OnInit {
  errorMessage = getErrorMessage(this.data);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ApolloError,
              private readonly snackbarRef: MatSnackBarRef<ErrorSnackbarComponent>) {
  }

  ngOnInit() {
    console.error(JSON.stringify(this.data));
  }

  close() {
    this.snackbarRef.dismiss();
  }
}
