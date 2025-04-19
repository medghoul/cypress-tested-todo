/// <reference types="cypress" />

describe("Welcome should check all the functionalities of the welcome text", () => {
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

  it("should show good morning message", () => {
    const dateNow = new Date("April 13, 2025 08:00:00");
    cy.clock(dateNow);
    cy.visit("/todo");
    cy.get('[data-testid="welcome"]').should(
      "contain.text",
      "Good morning MedOx"
    );
  });

  it("should show good evening message", () => {
    const dateNow = new Date("April 13, 2025 18:00:00");
    cy.clock(dateNow);
    cy.visit("/todo");
    cy.get('[data-testid="welcome"]').should(
      "contain.text",
      "Good Evening MedOx"
    );
  });

  it("should show time to sleep message", () => {
    const dateNow = new Date("April 13, 2025 01:00:00");
    cy.clock(dateNow);
    cy.visit("/todo");
    cy.get('[data-testid="welcome"]').should(
      "contain.text",
      "Time to sleep MedOx"
    );
  });

  it("should show USER if we dont provide first name", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTUxYzk2NzNiZWVlMWEyNzEzYzRmOCIsImZpcnN0TmFtZSI6IlZhbGlkIiwibGFzdE5hbWUiOiJhYmNkZSIsImlhdCI6MTc0MzA2ODMxMH0.uIO7Xb5Kn9L9pnpn69D-APAL77QlYFFJfBRMVKWdAgs",
        userID: "67e51c9673beee1a2713c4f8"
      })
    );
    cy.visit("/todo");
    cy.get('[data-testid="welcome"]').should("contain.text", "user");
  });

  it("should show USER if we dont provide a first name less than 2 characters", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTUxYzk2NzNiZWVlMWEyNzEzYzRmOCIsImZpcnN0TmFtZSI6IlZhbGlkIiwibGFzdE5hbWUiOiJhYmNkZSIsImlhdCI6MTc0MzA2ODMxMH0.uIO7Xb5Kn9L9pnpn69D-APAL77QlYFFJfBRMVKWdAgs",
        userID: "67e51c9673beee1a2713c4f8",
        firstName: "a"
      })
    );
    cy.visit("/todo");
    cy.get('[data-testid="welcome"]').should("contain.text", "user");
  });

  it("should show USER if we dont provide a first name with @", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTUxYzk2NzNiZWVlMWEyNzEzYzRmOCIsImZpcnN0TmFtZSI6IlZhbGlkIiwibGFzdE5hbWUiOiJhYmNkZSIsImlhdCI6MTc0MzA2ODMxMH0.uIO7Xb5Kn9L9pnpn69D-APAL77QlYFFJfBRMVKWdAgs", 
        userID: "67e51c9673beee1a2713c4f8",
        firstName: "medox@gmail.com"
      })
    );
    cy.visit("/todo");
    cy.get('[data-testid="welcome"]').should("contain.text", "user");
  });

  it("should show USER if we dont provide a first name with a dot", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTUxYzk2NzNiZWVlMWEyNzEzYzRmOCIsImZpcnN0TmFtZSI6IlZhbGlkIiwibGFzdE5hbWUiOiJhYmNkZSIsImlhdCI6MTc0MzA2ODMxMH0.uIO7Xb5Kn9L9pnpn69D-APAL77QlYFFJfBRMVKWdAgs",
        userID: "67e51c9673beee1a2713c4f8",
        firstName: "medox.com"
      })
    );
    cy.visit("/todo");
    cy.get('[data-testid="welcome"]').should("contain.text", "user");
  });
});
