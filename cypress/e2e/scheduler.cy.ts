describe('Scheduler Page', () => {
    beforeEach(() => {
      cy.visit('/?month=2025-01');
    });
  
    it('should display the loading spinner initially', () => {
      cy.visit('/');
      cy.get('[data-testid="spinner-icon"]').should('be.visible');
    });
  
    it('should render the Calendar component after loading', () => {
      cy.get('[data-testid="calendar"]').should('be.visible');
    });
  
    it('should navigate to the next month', () => {
      cy.get('[data-testid="next-month"]').click();
      cy.get('[data-testid="calendar"]').should('contain', 'February 2025');
    });
  
    it('should navigate to the previous month', () => {
      cy.get('[data-testid="previous-month"]').click();
      cy.get('[data-testid="calendar"]').should('contain', 'December 2024');
    });
  
    it('should select a day and display available times', () => {
      cy.get('[data-testid="15"]').click();
      cy.get('[data-testid="10:00"]').should('be.visible').click();
    });
  
    it('should redirect to the schedule event page after selecting a time and go next', () => {
      cy.get('[data-testid="15"]').click();
      cy.get('[data-testid="10:00"]').click();
      cy.get('[data-testid="next-button"]').click();
      cy.url().should('eq', `${Cypress.config().baseUrl}/2025-01-15T10:00:00-03:00?month=2025-01&date=2025-01-15`);
      cy.contains('Enter Details').should('be.visible');
    });
  
  
    it('should redirect to home after successful schedule', () => {
      cy.get('[data-testid="15"]').click();
      cy.get('[data-testid="10:00"]').click();
      cy.get('[data-testid="next-button"]').click();

      cy.fixture('user').then((user) => {
        cy.get('input[id="name"]').type(user.name);
        cy.get('input[id="email"]').type(user.email);
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/success?name=Jonas%20Ribeiro&email=jonasribeiroc@gmail.com&date=2025-01-15T10:00:00-03:00`);
        cy.contains('Success Schedule').should('be.visible');
      });
    });
  
    it('matches the snapshot', () => {
      cy.visit('/');
      cy.get('[data-testid="calendar"]').should('be.visible');
      cy.screenshot();
    });
  });
  