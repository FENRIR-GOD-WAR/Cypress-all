Cypress.Commands.add('login', (email, password) => {
  cy.contains('Log in').click();
  cy.get('#mail').type(email);
  cy.get('#pass').type(password);
  cy.contains('Submit').click();
});

Cypress.Commands.add('addBook', (title, description, authors) => {
  cy.contains('Add new').click();
  cy.get('input[name="title"]').should('be.visible').type(title);
  cy.get('input[name="description"]').type(description);
  cy.get('input[name="authors"]').type(authors);
  cy.contains('button', 'Submit').click();
  cy.contains('.card-title', title, { timeout: 10000 }).should('be.visible');
});

Cypress.Commands.add('addBookToFavorites', (title) => {
  cy.contains('.card-title', title)
    .closest('.card')
    .contains('button', 'Add to favorite')
    .click();
});

Cypress.Commands.add('removeBookFromFavorites', (title) => {
  cy.contains('.card-title', title)
    .closest('.card')
    .contains('button', 'Delete from favorite')
    .click();
});

Cypress.Commands.add('goToFavorites', () => {
  cy.visit('/favorites');
  cy.url().should('include', '/favorites');
});

Cypress.Commands.add('clearFavorites', () => {
  cy.request('GET', 'http://localhost:7071/api/favotites/books').then(({ body }) => {
    const books = typeof body === 'string' ? JSON.parse(body) : body;

    books.forEach((book) => {
      cy.request('DELETE', `http://localhost:7071/api/favorites/books/${book.key}`);
    });
  });
});
