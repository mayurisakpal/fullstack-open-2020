// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.contains('Login').click();
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#loginButton').click();
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/login',
    body: {
      username,
      password,
    },
    failOnStatusCode: false,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body));
  });
});

Cypress.Commands.add('createBlog', (content) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: content,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogAppUser')).token
      }`,
    },
  });

  cy.visit('http://localhost:3000');
});
