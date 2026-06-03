describe('Favorites', () => {
  const bookTitle = () => `Cypress book ${Date.now()}`;

  beforeEach(() => {
    cy.visit('/');
    cy.login('test@test.com', 'test');
    cy.contains('Добро пожаловать test@test.com').should('be.visible');
    cy.clearFavorites();
  });

  it('Should show empty favorites message when there are no favorite books', () => {
    cy.goToFavorites();
    cy.contains('Please add some book to favorit on home page!').should(
      'be.visible',
    );
  });

  it('Should add a book to favorites and display it on the favorites page', () => {
    const title = bookTitle();
    cy.addBook(title, 'Test description', 'Test Author');
    cy.addBookToFavorites(title);
    cy.contains('.card-title', title)
      .closest('.card')
      .contains('button', 'Delete from favorite')
      .should('be.visible');

    cy.goToFavorites();
    cy.contains(title, { timeout: 10000 }).should('be.visible');
  });

  it('Should remove a book from favorites', () => {
    const title = bookTitle();
    cy.addBook(title, 'Test description', 'Test Author');
    cy.addBookToFavorites(title);
    cy.removeBookFromFavorites(title);
    cy.contains('.card-title', title)
      .closest('.card')
      .contains('button', 'Add to favorite')
      .should('be.visible');

    cy.goToFavorites();
    cy.contains('.card-title', title).should('not.exist');
  });
});
