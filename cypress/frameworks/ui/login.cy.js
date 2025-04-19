/// <reference types="cypress" />

describe("Should check up all functionalities of login page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should show an error message if email is not provided", () => {
    cy.get('[data-testid="submit"]').click();
    cy.get(".MuiFormHelperText-root")
      .should("be.visible")
      .and("contain", "Please Insert a correct Email format");
  });

  it("should show an error message if email is not a valid email", () => {
    cy.get('[data-testid="email"]').type("invalid-email");
    cy.get('[data-testid="submit"]').click();
    cy.get(".MuiFormHelperText-root")
      .should("be.visible")
      .and("contain", "Please Insert a correct Email format");
  });

  it("should show an error message if password is not provided", () => {
    cy.get('[data-testid="email"]').type("valid@email.com");
    cy.get('[data-testid="submit"]').click();
    cy.get(".MuiFormHelperText-root")
      .should("be.visible")
      .and("contain", "Password must be Minimum eight characters");
  });

  ["test", "test123", "1234567", "TEST1234", "test1234"].forEach((password) => {
    it(`should show an error message if password is not valid like this ${password}`, () => {
      cy.get('[data-testid="email"]').type("valid@email.com");
      cy.get('[data-testid="password"]').type(password);
      cy.get('[data-testid="submit"]').click();
      cy.get(".MuiFormHelperText-root")
        .should("be.visible")
        .and("contain", "Password must be Minimum eight characters");
    });
  });

  it("should show an error message if user is not registered", () => {
    cy.intercept("POST", "**/api/v1/users/login", {
      fixture: "login-error.json",
      statusCode: 400,
    }).as("login");
    cy.get('[data-testid="email"]').type("valid@email.com");
    cy.get('[data-testid="password"]').type("ValidPassword123!");
    cy.get('[data-testid="submit"]').click();
    cy.wait("@login").then((response) => {
      expect(response.response.statusCode).to.eq(400);
      cy.get('[data-testid="error-alert"]')
        .should("be.visible")
        .and("contain", response.response.body.message);
    });
    cy.url().should("include", "/login");
  });

  it("should not show an error message if password is valid", () => {
    cy.intercept("POST", "**/api/v1/users/login", {
      fixture: "register.json",
      statusCode: 200,
    }).as("login");
    cy.get('[data-testid="email"]').type("valid@email.com");
    cy.get('[data-testid="password"]').type("ValidPassword123!");
    cy.get('[data-testid="submit"]').click();
    cy.wait("@login").then((response) => {
      expect(response.response.statusCode).to.eq(200);
    });
    cy.url().should("include", "/todo");
  });
});
