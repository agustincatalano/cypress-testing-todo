import * as $ from '../common/selectors'
import { methods } from '../common/methods'

const boardName = 'AWESOME BOARD'
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
    cy.get($.appContainerSelector).should('be.visible')
    //validate header bar
    cy.get($.headerBarSelector)
      .should('be.visible')
      .should('have.css', 'background-color', 'rgb(2, 106, 167)')
    //validate login button
    cy.get($.trelloLogoSelector).should('be.visible')
    cy.get($.loginButtonSelector)
      .should('be.visible')
      .contains('Log in')
      .should('have.css', 'background-color', 'rgb(41, 143, 202)')
    cy.get($.loginButtonSelector)
      .find('svg')
      .should('have.css', 'width', '20px')

    cy.get($.loginButtonSelector)
      .find('svg')
      .then((icon) => {
        expect(icon).to.have.attr('width', '12')
        expect(icon).to.have.attr('height', '12')
      })
    //body
    cy.get($.bodyContainerSelector).should('be.visible')
    cy.get($.boardTitleSelector)
      .eq(1)
      .should('be.visible')
      .contains('My Boards')
    cy.get($.newBoardSelector)
      .should('be.visible')
      .contains('Create a board...')
    cy.get($.newBoardSelector).should(
      'have.css',
      'background-color',
      'rgb(205, 210, 212)'
    )
  })
})

describe('Create/update Board and lists', () => {
  it(`Create a New Board with name ${boardName}`, () => {
    methods.createNewBoard(boardName)
  })

  it(`Add ${numberOfLists} lists`, () => {
    methods.addLists(numberOfLists)
  })

  it('Delete all list in the current board', () => {
    cy.get($.dropdownButtonSelector).then((list) => {
      list.first().trigger('click')
      cy.get($.deleteButtonSelector).click({ multiple: true })
    })
  })

  it('Delete current board', () => {
    cy.get($.boardOptionsSelector).click()
    cy.get($.deleteBoardSelector).eq(1).screenshot('delete-board-button')
    cy.get($.deleteBoardSelector).eq(1).click()
    cy.get($.bodyContainerSelector).should('be.visible')
    cy.get($.boardTitleSelector)
      .eq(1)
      .should('be.visible')
      .contains('My Boards')
  })
})

describe('Drag & drop with Trello lists', () => {
  it(`Create a New Board with name ${boardName}`, () => {
    methods.createNewBoard(boardName)
  })

  it(`Add ${numberOfLists} lists`, () => {
    methods.addLists(numberOfLists)
  })

  it('Drag and drop with @4tw/cypress-drag-drop plugin', () => {
    //validate dataid first element - original order
    cy.get('[data-cy="list"]:first').invoke('attr', 'data-id').as('dataIdFirst')
    cy.get('@dataIdFirst').then((dataId1) =>
      cy.get('[data-cy="list"]:first').should('have.attr', 'data-id', dataId1)
    )
    //validate dataid last element - original order
    cy.get('[data-cy="list"]:last').invoke('attr', 'data-id').as('dataIdLast')
    cy.get('@dataIdLast').then((dataId3) =>
      cy.get('[data-cy="list"]:last').should('have.attr', 'data-id', dataId3)
    )
    //drag and drop - order changed
    cy.get('[data-cy="list-name"]:first').drag('[data-cy="list-name"]:last')
    //validate the second element, has the last dataID
    cy.get('@dataIdLast').then((dataId3) =>
      cy
        .get('[data-cy="list"]:nth-child(2)').screenshot('list 2')
        .should('have.attr', 'data-id', dataId3)
    )
  })
})
