/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

let token;
let taskId;
describe("Tasks API", () => {
  beforeEach(() => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/login",
      body: {
        email: "john.doe@example.com",
        password: "Password123!",
      },
      failOnStatusCode: false,
    }).then((response) => {
      token = response.body.access_token;
    });
  });

  it("should create a newtask", () => {
    const item = faker.lorem.word();
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/tasks",
      body: {
        item: item,
        isCompleted: false,
      },
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eql(201);
      expect(response.body.addedTask.item).to.eq(item);
      taskId = response.body.addedTask._id;
    });
  });

  it("should get all tasks", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8080/api/v1/tasks",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }).then((response) => {
      expect(response.status).to.eql(200);
    });
  });

  it("should be able to update a task", () => {
    cy.request({
      method: "PUT",
      url: `http://localhost:8080/api/v1/tasks/${taskId}`,
      body: {
        item: "Updated Task",
        isCompleted: true,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eql(200);
    });
  });

  it("should be able to delete a task", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:8080/api/v1/tasks/${taskId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eql(200);
    });
  });
});
