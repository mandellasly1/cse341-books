# Books API Week 02 Spec - Version 1 specification

## Feature 1: Book CRUD Operations and Author References

### Goal

The Authors API will manage author records in the authors collection. It will provide full CRUD operations (create, read, update, delete) so that authors can be added, retrieved, modified, and removed. Each author will have a custom string ID (like a1, a2) that books reference through their authorId field. The API must enforce this relationship, preventing deletion of authors who still have books. All routes must be documented and testable in Swagger, both locally and on the deployed Render application.

### Data Model

Book documents will be stored in the books collection.

Required fields:

id: string, required, custom id such as b1

authorId: string, required, references the id field of an author document

title: string, required

publicationDate: string, required

Books will continue to use custom string ids instead of MongoDB _id values for route parameters.

### Relationship to Authors
Each book identifies its author with an authorId field. The value of authorId must match the custom id of an existing author document.

When creating or updating a book, the API must reject requests with a 400 Bad Request if the submitted authorId does not match an existing author.

### Routes

#### GET /books
Purpose: Return all books.

Success: 200 with an array of book objects.

Errors: 500 if an unexpected server or database error occurs.

#### GET /books/:id
Purpose: Return one book by its custom id.

Success: 200 with the matching book object.

Errors: 404 if no book exists with that id; 500 if an unexpected server or database error occurs.

#### POST /books
Purpose: Create a new book.

Request body:

json
{
  "id": "b4",
  "authorId": "a1",
  "title": "Example Book Title",
  "publicationDate": "2026-01-15"
}
Success: 201 with the newly created book object.

Errors:

400 if a required field is missing

400 if the id already exists

400 if the authorId does not match an existing author

500 if an unexpected server or database error occurs

#### PUT /books/:id
Purpose: Update an existing book.

Request body:

json
{
  "authorId": "a2",
  "title": "Updated Book Title",
  "publicationDate": "2026-02-20"
}
Success: 200 with the updated book object.

Errors:

400 if a required field is missing

400 if the authorId does not match an existing author

404 if no book exists with that id

500 if an unexpected server or database error occurs


### DELETE /books/:id

Purpose: Delete an existing book.

Success: 204 with no response body.

Errors:

404 if no book exists with that id

500 if an unexpected server or database error occurs

### Swagger Documentation

All book routes must be documented in Swagger, including request bodies for POST and PUT.

### Deployment Expectations

After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at /api-docs must allow full testing of every book route.