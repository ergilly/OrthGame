describe('Game', () => {
    
    beforeEach(() => {
        
        // Open Eyes to start visual testing.
        // Each test should open its own Eyes for its own snapshots.
        cy.eyesOpen({
            appName: 'Game',                   
            testName: Cypress.currentTest.title,        // The name of the test case
        })
    })
    it('should load the game', () => {
    
        cy.visit('http://localhost:3000/')

        cy.eyesCheckWindow({
            tag: "Game Page",
            target: 'window',
            fully: true
        });        
    })
    afterEach(() => {
        
        // Close Eyes to tell the server it should display the results.
        cy.eyesClose()
    })

})