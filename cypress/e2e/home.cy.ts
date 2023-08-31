describe('Home', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Welcome to url-shortening-ui')
    cy.contains('Search')
  })
})
