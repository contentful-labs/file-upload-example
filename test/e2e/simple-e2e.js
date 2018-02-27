describe('Very basic e2e test', () => {
  it('Login page renders', () => {
    cy.visit('/')
    cy.get('h1').should('have.text', 'Direct File Upload Example')
    cy.get('input#access-token').should('empty')
    cy.get('input#space-id').should('empty')
    cy.get('input#host').should('not.exist')
    cy.get('input#hostUpload').should('not.exist')
  })

  it('Can login, does render assets and allows switching space', () => {
    cy.visit('/')
    cy.get('input#access-token').type(Cypress.env('accessToken'))
    cy.get('input#space-id').type(Cypress.env('spaceId'))
    cy.get('input[type=submit]').click()

    // Assets page
    cy.get('h1').should('have.text', 'Your assets:')
    cy.get('img').should('have.length', 2)

    // Go back to login to change space
    cy.get('a').contains('Change space').click()
    cy.get('input#access-token').should('value', Cypress.env('accessToken'))
    cy.get('input#space-id').should('value', Cypress.env('spaceId'))
  })
})
