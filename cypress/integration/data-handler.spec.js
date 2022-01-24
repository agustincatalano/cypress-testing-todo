import { methods } from '../common/methods'
import * as data from '../fixtures/data.json'

const titles = data.messages.lists.map(($list) => $list.title)
const names = data.messages.lists.map(($list) => $list.name)
const heads = data.messages.lists.map(($list) => $list.head)
const body = data.messages.lists.map(($list) => $list.body)

before(() => {
  cy.visit('/')
  cy.request({
    method: 'POST',
    url: '/api/reset'
  })
})

describe('Add a board with the data.json info', () => {
  it(`Create a New Board${titles[0]}`, () => {
    methods.createNewBoard(titles[0])
  })

  it('create first list', () => {
    methods.addLists()
    cy.get('[data-cy="list"]').should('have.length', 1)
    cy.get('[data-cy="list-name"]').clear().type(names[0])
    cy.get('[data-cy="new-task"]').click()
    cy.get('[data-cy="task-input"]').type(heads[0], ' ')
    cy.get('[data-cy="task-input"]').type(body[0])
    cy.get('[data-cy="add-task"]').click()
  })

  it('create second list', () => {
    methods.addLists()
    cy.get('[data-cy="list"]').should('have.length', 2)
    cy.get('[data-cy="list-name"]').eq(1).clear().type(names[1])
    cy.get('[data-cy="new-task"]').eq(1).click()
    cy.get('[data-cy="task-input"]').eq(1).type(heads[1], ' ')
    cy.get('[data-cy="task-input"]').eq(1).type(body[1])
    cy.get('[data-cy="add-task"]').eq(1).click()
  })
})
