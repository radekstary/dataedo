describe('top-nav', () => {
  it('should redirect to /people route', () => {
    cy.visit('http://localhost:4200');
    cy.location('pathname').should('eq', '/people')
  });
  it('should navigate to the /about route', () => {
    cy.get('.nav-button').contains('About').click();
    cy.location('pathname').should('eq', '/about')
  });
  it('should navigate to the /people route', () => {
    cy.get('.nav-button').contains('People').click();
    cy.location('pathname').should('eq', '/people')
  });
});
