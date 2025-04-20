/// <reference types="cypress" />
 
describe("Should check all functionalities of the adding a new task", () => {
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

    cy.intercept("POST", "**/api/v1/tasks", {
      statusCode: 201,
      body: {
        message: "Task created successfully",
      },
    }).as("createTask");

    cy.visit("/todo");
    cy.get("[data-testid=add]").click();
  });

  it("should navigate to the new task page", () => {
    cy.url().should("include", "/todo/new");
  });

  it("should show an error message if the task is empty or less than 3 characters", () => {
    cy.get("[data-testid=new-todo]").type("a");
    cy.get("[data-testid=submit-newTask]").click();
    cy.get(".MuiFormHelperText-root").should("be.visible");
  });

  it("should send a POST request to the API to create a new task", () => {
    cy.get("[data-testid=new-todo]").type("learn react");
    cy.get("[data-testid=submit-newTask]").click();
    cy.wait("@createTask").then((interception) => {
      expect(interception.request.body.item).to.eq("learn react");
      expect(interception.response.statusCode).to.eq(201);
    });
  });
});
