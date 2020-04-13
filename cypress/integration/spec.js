describe('Game flow', () => {
	beforeEach(() => {
		cy.visit('/')
	});

	it('Create a game', () => {
		cy.contains('Create Game')
			.click()
		cy.contains('Creating Room')
		cy.contains('What is your name?')
		cy.get('input')
			.type('toby')
		cy.contains('Ok')
			.click()
		cy.contains('Room')
		cy.contains('Players')
		cy.contains('toby')
		cy.contains('button','PLAY')
	})
});