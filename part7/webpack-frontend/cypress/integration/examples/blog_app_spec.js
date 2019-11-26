describe('Blog  app', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000/')
    })
    it('front page can be opened', function() {
        cy.contains('login to the application')
    })

    it('user can login', function () {
        cy.get('input[name=username]')
            .type('bronepeace')
        cy.get('input[name=password]')
            .type('loveislife')
        cy.get('form').submit()
        cy.url().should('include', 'localhost:3000')
        cy.contains('new blog')
    
    })

})