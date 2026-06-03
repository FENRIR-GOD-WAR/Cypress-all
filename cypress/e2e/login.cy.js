describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display the main page', () => {
    cy.contains('Books list').should('be.visible');
    cy.contains('Log in').should('be.visible');
  });

  it('Should successfully login', () => {
    cy.login('test@test.com', 'test');
    cy.contains('Добро пожаловать test@test.com').should('be.visible');
  });

  it('Should not login with empty login', () => {
    cy.contains('Log in').click();
    cy.get('#mail').type(' ');
    cy.get('#pass').type('test');
    cy.contains('Submit').click();
    cy.get('#mail')
      .then(($el) => $el[0].checkValidity())
      .should('be.false');
    cy.get('#mail')
      .then(($el) => $el[0].validationMessage)
      .should('match', /Please fill out this field|Заполните это поле/);
  });

  it('Should not login with empty password', () => {
    cy.contains('Log in').click();
    cy.get('#mail').type('test@test.com');
    cy.contains('Submit').click();
    cy.get('#pass')
      .then(($el) => $el[0].checkValidity())
      .should('be.false');
  });
});
