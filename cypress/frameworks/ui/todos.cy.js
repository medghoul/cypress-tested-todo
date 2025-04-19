/// <reference types="cypress" />

describe("Todos should check all the functionalities of the todo page", () => {
  beforeEach(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTUxYzk2NzNiZWVlMWEyNzEzYzRmOCIsImZpcnN0TmFtZSI6IlZhbGlkIiwibGFzdE5hbWUiOiJhYmNkZSIsImlhdCI6MTc0MzA2ODMxMH0.uIO7Xb5Kn9L9pnpn69D-APAL77QlYFFJfBRMVKWdAgs",
        userID: "67e51c9673beee1a2713c4f8",
        firstName: "MedOx",
      })
    );
    cy.intercept("GET", "**/api/v1/tasks", {
      fixture: "tasks.json",
    });
  });

  it("should show the not completed tasks correctly", () => {
    cy.intercept("GET", "**/api/v1/tasks", {
      fixture: "tasks.json",
    });
    cy.visit("/todo");
    cy.get("[data-testid='todo-item']")
      .eq(0)
      .should("have.css", "background-color", "rgb(63, 81, 181)");
    cy.get('[data-testid="complete-task"]')
      .eq(0)
      .should("not.have.attr", "checked");
  });

  it("should show the completed tasks correctly", () => {
    cy.intercept("GET", "**/api/v1/tasks", {
      fixture: "tasks.json",
    });
    cy.visit("/todo");
    cy.get("[data-testid='todo-item']")
      .eq(1)
      .should("have.css", "background-color", "rgb(33, 76, 97)");
    // first way
    //cy.get('[data-testid="complete-task"]').should("have.prop", "checked");
    // second way
    //cy.get('[data-testid="complete-task"]').should("be.checked");
    // third way
    cy.get('[data-testid="complete-task"]')
      .eq(1)
      .should("have.attr", "checked");
    cy.get('[data-testid="todo-text"]')
      .eq(1)
      .should("have.css", "text-decoration-line", "line-through");
  });

  it("should show the pagination if there are more than 5 tasks", () => {
    cy.intercept("GET", "**/api/v1/tasks", {
      fixture: "tasks-pagination.json",
    });
    cy.visit("/todo");
    cy.get("[data-test-id='pagination-link']")
      .should("be.visible")
      .and("have.length", 2);
  });
});
