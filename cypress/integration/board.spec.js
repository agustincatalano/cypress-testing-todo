const appContainerSelector = '#trello-app'
const headerBarSelector = '.Nav'
const trelloLogoSelector = '.Nav_logo'
const loginButtonSelector = '[data-cy="login-menu"]'
const bodyContainerSelecor = '.background_container'
const newBoardSelector = '#new-board'
const boardName = 'AWESOME BOARD'
const boardInput = '[data-cy="new-board-input"]'
const activeBoardSelector = '.board_newItem-active'
const saveButton = '[data-cy="new-board-create"]'
const boardContainer = '.boardDetail'
const addListSelector = '[data-cy="add-list"]'
const listInputSelector = '[data-cy="add-list-input"]'
const saveButtonSelector = '[data-cy="save"]'
const deleteButtonSelector = '[data-cy="delete"]'
const dropdownButtonSelector = '[data-cy="list"] > .dropdown'
const boardOptionsSelector = '[data-cy="board-options"]'
const deleteBoardSelector = '.dropdown-content > .delete'
const boardTitleSelector = '.background_title'

const numberOfLists = 3

before(() => {
  cy.visit('/')
  cy.request({
    method: 'POST',
    url: '/api/reset'
  })
})

describe('Home page validations', () => {
  it('validate UI elements!', () => {
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
    cy.get(loginButtonSelector).find('svg').should('have.css', 'width', '20px')

    cy.get(loginButtonSelector)
      .find('svg')
      .then((icon) => {
        expect(icon).to.have.attr('width', '12')
        expect(icon).to.have.attr('height', '12')
      })
    //body
    cy.get(bodyContainerSelecor).should('be.visible')
    cy.get('.background_title').eq(1).should('be.visible').contains('My Boards')
    cy.get(newBoardSelector).should('be.visible').contains('Create a board...')
    cy.get(newBoardSelector).should(
      'have.css',
      'background-color',
      'rgb(205, 210, 212)'
    )
  })
})

describe('Create/update Board and lists', () => {
  it(`Create a New Board with name ${boardName}`, () => {
    //Create new board
    cy.get(activeBoardSelector).should('not.exist')
    cy.get(newBoardSelector).click()
    cy.get(activeBoardSelector).should('be.visible')
    cy.get(boardInput).type(boardName)
    cy.get(saveButton).click()
    cy.url().should('include', 'board')
    cy.get(boardContainer).should('be.visible')
  })

  it(`Add ${numberOfLists} lists`, () => {
    for (let i = 0; i < numberOfLists; i++) {
      cy.get(addListSelector).click()
      cy.get(listInputSelector).type(`List ${i}`)
      cy.get(saveButtonSelector).click()
    }
    //validate lists are created
    cy.get('[data-cy="list"]').should('have.length', numberOfLists)
  })

  it('Delete all list in the current board', () => {
    cy.get(dropdownButtonSelector).then((list) => {
      list.first().click()
      cy.get(deleteButtonSelector).click({ multiple: true })
    })
  })

  it('Delete current board', () => {
    cy.get(boardOptionsSelector).click()
    cy.get(deleteBoardSelector).eq(1).click()
    cy.get(bodyContainerSelecor).should('be.visible')
    cy.get(boardTitleSelector).eq(1).should('be.visible').contains('My Boards')
  })
})
