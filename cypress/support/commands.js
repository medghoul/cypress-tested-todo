Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.get("[data-testid='email']").type(email);
  cy.get("[data-testid='password']").type(password);
  cy.get("[data-testid='submit']").click();
});
