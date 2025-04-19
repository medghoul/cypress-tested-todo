/// <reference types="cypress" />

describe("Should check up all functionalities of signup page", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  // First Name test cases

  it("should show an error message if the first name is not provided", () => {
    cy.get('[data-testid="first-name"]').type(" ");
    cy.get('[data-testid="submit"]').click();
    cy.get(".MuiFormHelperText-root")
      .should("be.visible")
      .and("contain", "First Name is required");
  });

  it("should show an error message if first name is less than 3 characters", () => {
    cy.get('[data-testid="first-name"]').type("ab");
    cy.get('[data-testid="submit"]').click();
    cy.get(".MuiFormHelperText-root")
      .should("be.visible")
      .and("contain", "should be more than 3 characters");
  });

  it("should not show an error message if first name is more than 3 characters", () => {
    cy.get('[data-testid="first-name"]').type("abcde");
    cy.get('[data-testid="submit"]').click();
    cy.get(".MuiFormHelperText-root")
      .should("be.visible")
      .and("contain", "Last Name is required");
  });

  // Last Name test cases

  it("should show an error message if the last name is not provided", () => {
    cy.get('[data-testid="first-name"]').type("Valid");
    cy.get('[data-testid="last-name"]').type(" ");
    cy.get('[data-testid="submit"]').click();
    cy.get(".MuiFormHelperText-root")
      .should("be.visible")
      .and("contain", "Last Name is required");
  });

  it("should show an error message if last name is less than 3 characters", () => {
    cy.get('[data-testid="first-name"]').type("Valid");
    cy.get('[data-testid="last-name"]').type("ab");
    cy.get('[data-testid="submit"]').click();
    cy.get(".MuiFormHelperText-root")
      .should("be.visible")
      .and("contain", "should be more than 3 characters");
  });

  it("should not show an error message if last name is more than 3 characters", () => {
    cy.get('[data-testid="first-name"]').type("Valid");
    cy.get('[data-testid="last-name"]').type("abcde");
    cy.get('[data-testid="submit"]').click();
    cy.get(".MuiFormHelperText-root")
      .should("be.visible")
      .and("contain", "Please Insert a correct Email format");
  });

  // Email test cases

  it("should show an error message if email is not provided", () => {
    cy.get('[data-testid="first-name"]').type("Valid");
    cy.get('[data-testid="last-name"]').type("abcde");
    cy.get('[data-testid="email"]').type(" ");
    cy.get('[data-testid="submit"]').click();
    cy.get(".MuiFormHelperText-root")
      .should("be.visible")
      .and("contain", "Please Insert a correct Email format");
  });

  it("should show an error message if email is not a valid email", () => {
    cy.get('[data-testid="first-name"]').type("Valid");
    cy.get('[data-testid="last-name"]').type("abcde");
    cy.get('[data-testid="email"]').type("invalid-email");
    cy.get('[data-testid="submit"]').click();
    cy.get(".MuiFormHelperText-root")
      .should("be.visible")
      .and("contain", "Please Insert a correct Email format");
  });

  it("should not show an error message if email is a valid email", () => {
    cy.get('[data-testid="first-name"]').type("Valid");
    cy.get('[data-testid="last-name"]').type("abcde");
    cy.get('[data-testid="email"]').type("valid@email.com");
    cy.get('[data-testid="submit"]').click();
    cy.get(".MuiFormHelperText-root")
      .should("be.visible")
      .and("contain", "Password must be Minimum eight characters");
  });

  // Password test cases

  ["test", "test123", "1234567", "TEST1234", "test1234"].forEach((password) => {

  it(`should show an error message if password is this ${password}`, () => {
    cy.get('[data-testid="first-name"]').type("Valid");
    cy.get('[data-testid="last-name"]').type("abcde");
    cy.get('[data-testid="email"]').type("valid@email.com");
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="submit"]').click();
    cy.get(".MuiFormHelperText-root")
      .should("be.visible")
      .and("contain", "Password must be Minimum eight characters");
  });
  });

  it("should not show an error message if password is more than 8 characters", () => {
    cy.get('[data-testid="first-name"]').type("Valid");
    cy.get('[data-testid="last-name"]').type("abcde");
    cy.get('[data-testid="email"]').type("valid@email.com");
    cy.get('[data-testid="password"]').type("Test1234!");
    cy.get('[data-testid="submit"]').click();
  });

  // Confirm Password test cases

  it("should show an error message if confirm password is not provided", () => {
    cy.get('[data-testid="first-name"]').type("Valid");
    cy.get('[data-testid="last-name"]').type("abcde");
    cy.get('[data-testid="email"]').type("valid@email.com");
    cy.get('[data-testid="password"]').type("Test1234!");
    cy.get('[data-testid="submit"]').click();
    cy.get(".MuiFormHelperText-root")
      .should("be.visible")
      .and("contain", "Second password does not match the first Password");
  });

  it("should show an error message if email is already exists in the database", () => {
    cy.intercept("POST", "**/api/v1/users/register" , {fixture: "register-error.json",statusCode: 400}).as("register");
    cy.get('[data-testid="first-name"]').type("Valid");
    cy.get('[data-testid="last-name"]').type("abcde");
    cy.get('[data-testid="email"]').type("valid2@email.com");
    cy.get('[data-testid="password"]').type("Test1234!");
    cy.get('[data-testid="confirm-password"]').type("Test1234!");
    cy.get('[data-testid="submit"]').click();
    cy.wait("@register").then((response) => {
      console.log(response);
      expect(response.response.statusCode).to.eq(400);
      cy.get('[data-testid="error"]').should("be.visible").and("contain", response.response.body.message);
    });
    
    
  });

  it("should not show an error message if confirm password is the same as the password", () => {
    cy.intercept("POST", "**/api/v1/users/register" , {fixture: "register.json",statusCode: 201}).as("register");
    cy.get('[data-testid="first-name"]').type("Valid");
    cy.get('[data-testid="last-name"]').type("abcde");
    cy.get('[data-testid="email"]').type("valid2@email.com");
    cy.get('[data-testid="password"]').type("Test1234!");
    cy.get('[data-testid="confirm-password"]').type("Test1234!");
    cy.get('[data-testid="submit"]').click();
    cy.wait("@register").then((response) => {
      console.log(response);
      expect(response.response.statusCode).to.eq(201);
    });
    cy.url().should("include", "/todo");
  });


  
  
});
