import * as $ from '../common/selectors'
let trelloLogInCookie = ''
const email = 'cool@email.com'
const password = 'this1sAPassword'

before(() => {
  cy.request({
    method: 'POST',
    url: '/api/reset'
  })
  cy.visit('/')
})

describe('log in tests', () => {
  it('log in by UI', () => {
    cy.get($.logInSelector).click()
    cy.get($.signUpButtonSelector).click()
    cy.get($.signUpEmailSelector).type(email)
    cy.get($.signUpPasswordSelector).type(password)
    cy.get($.logInButtonSelector).click()
    cy.get($.logInMessageSelector)
      .should('be.visible')
      .contains('User is logged in')
    cy.get($.loggedUserSelector).should('be.visible').contains(email)

    //Store log-in cookie value
    cy.getCookie('trello_token').then((cookie) => {
      trelloLogInCookie = cookie.value
    })
  })
  it('log out', () => {
    cy.get($.loggedUserSelector).click()
    cy.get($.logOutButtonSelector).click()
    cy.get($.logInSelector).should('be.visible').contains('Log in')
    cy.screenshot('logout-My-board')
  })

  it('log in by cookie', () => {
    cy.setCookie('trello_token', trelloLogInCookie)
    cy.reload()
    cy.get($.logInMessageSelector)
      .should('be.visible')
      .contains('User is logged in')
    cy.get($.loggedUserSelector).should('be.visible').contains(email)
    cy.get($.loggedUserSelector).screenshot('loggedInButton')
    cy.screenshot('login-My-board')
  })
})
