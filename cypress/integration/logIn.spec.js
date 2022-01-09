import * as $ from '../common/selectors'

const email = 'cool@email.com'
const password = 'this1sAPassword'

before(() => {
  cy.visit('/')
  cy.request({
    method: 'POST',
    url: '/api/reset'
  })
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
    cy.get('[data-cy="logged-user"]').should('be.visible').contains(email)
  })
})
