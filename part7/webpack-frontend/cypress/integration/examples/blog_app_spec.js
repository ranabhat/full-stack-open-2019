describe('Blog  app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/')
  })
  it('front page can be opened', function() {
    cy.contains('login to the application')
  })

  describe('when logged in', function() {
    beforeEach(function () {
      cy.get('input[name=username]')
        .type('bronepeace')
      cy.get('input[name=password]')
        .type('loveislife')
      cy.get('form').submit()
      cy.url().should('include', 'localhost:3000')
      cy.contains('new blog')

    })

    it('a new blog can be created', function() {
      cy.contains('new blog')
        .click()
      cy.get('input[name=title]')
        .type('Test with Cypress')
      cy.get('input[name=author]')
        .type('Paritosh')
      cy.get('input[name=url]')
        .type('http://example.com')
      cy.get('form').submit()
      cy.contains('Test with Cypress')

    })
  })

})