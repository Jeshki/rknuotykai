describe('Example Cypress Test', () => {
  it('Visits the main page', () => {
    cy.visit('http://localhost:5173');
    cy.contains('rknuotykiai');
  });
});
