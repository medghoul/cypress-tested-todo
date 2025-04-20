/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

describe("Register API test cases", () => {
  it("should return an error if the first name is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/register",
      body: {
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: "password",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.message).to.eq('"firstName" is required');
    });
  });

  it("should return an error if the first name is less than 3 characters", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/register",
      body: {
        firstName: "Jo",
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: "password",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.message).to.eq(
        '"firstName" length must be at least 3 characters long'
      );
    });
  });

  it("should return an error if the last name is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/register",
      body: {
        firstName: "John",
        email: faker.internet.email(),
        password: "password",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.message).to.eq('"lastName" is required');
    });
  });

  it("should return an error if the last name is less than 3 characters", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/register",
      body: {
        firstName: "John",
        lastName: "Do",
        email: faker.internet.email(),
        password: "password",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.message).to.eq(
        '"lastName" length must be at least 3 characters long'
      );
    });
  });

  it("should return an error if the email is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/register",
      body: {
        firstName: "John",
        lastName: "Doe",
        password: "password",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.message).to.eq('"email" is required');
    });
  });

  it("should return an error if the email is not valid", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/register",
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "invalid-email",
        password: "password",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.message).to.eq('"email" must be a valid email');
    });
  });

  it("should return an error if the password is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/register",
      body: {
        firstName: "John",
        lastName: "Doe",
        email: faker.internet.email(),
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.message).to.eq('"password" is required');
    });
  });

  it("should return an error if the password is not strong", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/register",
      body: {
        firstName: "John",
        lastName: "Doe",
        email: faker.internet.email(),
        password: "weakpassword",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.message).contain(
        'the required pattern'
      );
    });
  });

  it("should return an error if the email is already in use", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/register",
      body: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: "john.doe@example.com",
        password: "Password123!",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.message).to.eq('Email is already exists in the Database');
    });
  });
  
  it("should return a success response if the user is registered successfully", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/register",
      body: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: "Password123!",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(201);
    });
  });
});