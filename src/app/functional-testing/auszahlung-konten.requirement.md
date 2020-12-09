# Feature: Auszahlung konten

1. User can list their account
1. User can add an account
1. User can edit an account


## List account


## Add account

### Fields

* name: {required,}
* kontoart {required}: 
* bic: {required, length: 8}
* iban: {required, length: 24}
* kontonummer {required}

### Actions

* Users click on (+) icon
* The create account form is open
* The user fill in the data
* The form is validated and validation errors are displayed
* If validations errors disable the submit button
* User submit the form
* The account is saved
* Data are refreshed in the table
