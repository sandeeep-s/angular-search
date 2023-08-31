describe('Edit', () => {

  beforeEach(() => {
    cy.visit('/edit/1');
  });

  it('should allow viewing a person', () => {
    cy.get('h3').should('have.text', 'Nikola Jokić');
    cy.get('#name').should('have.value', 'Nikola Jokić');
    cy.get('#city').should('have.value', 'Denver');
    cy.get('#street').should('have.value', '2000 16th Street');
  });

  it('should allow updating name', () => {
    cy.get('#name').type('Rocks!')
    cy.get('#save').click();

    const list = cy.get('app-search table tbody tr');
    list.should('have.length', 1);
  });

});
