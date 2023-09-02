describe('Home', () => {
  it('Visits the initial project page', () => {
    cy.contains('Welcome to url-shortening-ui')
    cy.contains('Search')
  })
})
