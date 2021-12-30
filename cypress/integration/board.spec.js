
const appContainerSelector = '#trello-app'
const headerBarSelector = '.Nav'
const trelloLogoSelector = '.Nav_logo'
const loginButtonSelector = '[data-cy="login-menu"]'
const bodyContainerSelecor = '.background_container'
const newBoardSelector = '#new-board'

describe('Home page validations', () => {
  it('validate UI elements!', () => {
    cy.visit('/')
    cy.get(appContainerSelector).should('be.visible')
    //validate header bar
    cy.get(headerBarSelector)
      .should('be.visible')
      .should('have.css', 'background-color', 'rgb(2, 106, 167)')
    //validate login button
    cy.get(trelloLogoSelector).should('be.visible')
    cy.get(loginButtonSelector)
      .should('be.visible')
      .contains('Log in')
      .should('have.css', 'background-color', 'rgb(41, 143, 202)')
    cy.get(loginButtonSelector)
      .find('svg')
      .should('have.css', 'width', '20px')

    cy.get(loginButtonSelector)
      .find('svg')
      .then((icon) => {
        expect(icon).to.have.attr('width', '12')
        expect(icon).to.have.attr('height', '12')
      })
      //body
    cy.get(bodyContainerSelecor).should('be.visible')
    cy.get('.background_title').eq(1).should('be.visible').contains ('My Boards')
    cy.get(newBoardSelector).should('be.visible').contains('Create a board...')
    cy.get(newBoardSelector).should('have.css', 'background-color', 'rgb(205, 210, 212)')
  })
})
