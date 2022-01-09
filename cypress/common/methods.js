import * as $ from '../common/selectors'

export const methods = {
  createNewBoard(boardName) {
    //Create new board
    cy.get($.activeBoardSelector).should('not.exist')
    cy.get($.newBoardSelector).click()
    cy.get($.activeBoardSelector).should('be.visible')
    cy.get($.boardInput).type(boardName)
    cy.get($.saveButton).click()
    cy.url().should('include', 'board')
    cy.get($.boardContainer).should('be.visible')
  },

  addLists(numberOfLists) {
    for (let i = 0; i < numberOfLists; i++) {
      cy.get($.addListSelector).click()
      cy.get($.listInputSelector).type(`List ${i}`)
      cy.get($.saveButtonSelector).click()
    }
    //validate lists are created
    cy.get('[data-cy="list"]').should('have.length', numberOfLists)
  }
}
