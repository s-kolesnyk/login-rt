/// <reference types="cypress" />

describe('Login page regression tests', () => {
    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com/login')
    })

    it('verify that the user is able to login with valid credentials, clicking Login', () => {
        cy.get('#username').type('tomsmith')
        cy.get('#password').type('SuperSecretPassword!')
        cy.get('.radius').click()
        cy.get('#flash').should('include.text', 'You logged into a secure area!')
        cy.get('.subheader').should('have.text', 'Welcome to the Secure Area. When you are done click logout below.')
    })

    it('verify that the user is able to login with valid credentials, clicking Enter', () => {

        cy.get('#username').type('tomsmith')
        cy.get('#password').type('SuperSecretPassword!{enter}')
        cy.get('#flash').should('include.text', 'You logged into a secure area!')
        cy.get('.subheader').should('have.text', 'Welcome to the Secure Area. When you are done click logout below.')
    })

    it('verify that the user is NOT able to login with invalid credentials', () => {

        // both username and password are invalid
        cy.get('#username').type('admin')
        cy.get('#password').type('1')
        cy.get('.radius').click()
        cy.get('#flash').should('include.text', 'Your username is invalid!')

    })

    it('verify that the user is NOT able to login when only 1 value is correct', () => {

        // valid username, invalid password
        cy.get('#username').type('tomsmith')
        cy.get('#password').type('qwerty')
        cy.get('.radius').click()
        cy.get('#flash').should('include.text', 'Your password is invalid!')

        // valid password, invalid username
        cy.get('#username').type('admin')
        cy.get('#password').type('SuperSecretPassword!')
        cy.get('.radius').click()
        cy.get('#flash').should('include.text', 'Your username is invalid!')

    })

    it('verify that both username and password are required fields', () => {

        // valid username, no password
        cy.get('#username').type('tomsmith')
        cy.get('.radius').click()
        cy.get('#flash').should('include.text', 'Your password is invalid!')

        // valid password, no username
        cy.get('#password').type('SuperSecretPassword!')
        cy.get('.radius').click()
        cy.get('#flash').should('include.text', 'Your username is invalid!')

        // both username and password values are missing
        cy.get('.radius').click()
        cy.get('#flash').should('include.text', 'Your username is invalid!')

    })

})