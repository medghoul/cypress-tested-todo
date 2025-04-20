/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

describe("Login API test cases", () => {
  it("should return an error if the email is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/login",
      body: {
        password: faker.internet.password(),
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.message).to.eq("Please Fill a correct Email");
    });
  });

  it("should return an error if the email is not valid", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/login",
      body: {
        email: faker.string.uuid(),
        password: faker.internet.password(),
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.message).to.eq("Please Fill a correct Email");
    });
  });

  it("should return an error if the email is not found", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/login",
      body: {
        email: faker.internet.email(),
        password: "Qwerty11!!",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.message).to.eq(
        "We could not find the email in the database"
      );
    });
  });

  it("should return an error if the password is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/login",
      body: {
        email: faker.internet.email(),
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.message).to.eq("Please Fill a correct Password");
    });
  });

  it("should login successfully", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/login",
      body: {
        email: "john.doe@example.com",
        password: "Password123!",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(200);
    });
  });
});
