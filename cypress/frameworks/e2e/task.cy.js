/// <reference types="cypress" />

describe("Test all the E2E flows scenario", () => {
  it("should be able to create a task, and then update it and delete it", () => {
    cy.visit("/");
    cy.login("john.doe@example.com", "Password123!");
    cy.get("[data-testid='welcome']").should("be.visible");
    cy.get("[data-testid='add']").click();

    cy.get("[data-testid='new-todo']").type("new task");
    cy.get("[data-testid='submit-newTask']").click();
    cy.get("[data-testid='todo-text']").first().should("have.text", "new task");
    cy.get("[data-testid='complete-task']").first().check();
    cy.get("[data-testid='todo-item']")
      .first()
      .should("have.css", "background-color", "rgb(33, 76, 97)");
    cy.get("[data-testid='delete']").first().click();
  });
});
