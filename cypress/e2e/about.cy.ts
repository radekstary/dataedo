describe('about page', () => {
  it('should load the /about page', () => {
    cy.visit('http://localhost:4200/about');
  });
  it('should render the coding assignment title', () => {
    cy.get('[data-cy=about-title]').contains('Coding assignment');
  });
  it('should render the coding assignment description', () => {
    cy.get('[data-cy=about-description]')
  });
  it('should have an anchor opening a new tab and navigating to randomuser.me', () => {
    cy.get('[data-cy=about-external-link]').should('have.attr', 'target', '_blank').and('have.attr', 'href', 'https://randomuser.me/documentation')
  });
});
