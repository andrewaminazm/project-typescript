describe('Example Functional Tests', () => {
  before(() => {
    cy.visit('https://airmalta.com/en');
    cy.url().should('eq', 'https://airmalta.com/en')
    .then(() => {
                // we are trying to return something
                // from the .within callback,
                // but it won't have any effect
              cy.log('check url valid ')
              })
  });

  it('verify title of page', () => {
    cy.title().should('eq', 'Air Malta | The Airline of the Maltese Islands : Air Malta') .then(() => {
      // we are trying to return something
      // from the .within callback,
      // but it won't have any effect
    cy.log('check title valid ')
    })
  });

  it('verify the component of homepage appear', () => {
    cy.get('.container > .navbar-brand > .white-logo').should('be.visible')
    cy.get('.heroCarousel-1 > .carousel-caption').should('be.visible')
    cy.findByRole('link', {  name: /international/i}).should('be.visible')
    cy.findByRole('link', {  name: /person_outline login/i}).should('be.visible')
    cy.findByRole('link', {  name: /help_outline help & support/i}).should('be.visible')
    cy.get('.content').scrollIntoView()
    cy.get('.content').should('be.visible')
    
    cy.findByRole('heading', {  name: /explore the maltese islands/i}).scrollIntoView({force:true})
    cy.findByRole('heading', {  name: /explore the maltese islands/i}).should('be.visible')
    cy.wait(2000)
    cy.findByRole('heading', {  name: /i'm looking for\.\.\./i}).scrollIntoView({force:true})
    cy.findByRole('heading', {  name: /i'm looking for\.\.\./i}).should('be.visible')
    cy.wait(2000)
    cy.get('.footer-container').scrollIntoView({force:true})
    cy.get('.footer-container').should('be.visible')
    cy.wait(2000)
  });

  it('get the first available flight price from Vienna International', () => {
    cy.get('.route-selection-origin > .input-holder > .form-control').click()
    cy.wait(1000)
    cy.findByRole('button', {  name: /vienna international vie/i}).click()
    cy.wait(1000)
    cy.findByText(/search airport/i).click()
    cy.wait(1000)
    cy.findByRole('button', {  name: /malta international airport mla/i}).click()
    cy.wait(1000)
    cy.get('.startDate > .form-control').click({force:true})
    cy.get(':nth-child(1) > .DayPicker-Caption > div').invoke('text').then((text) => {
      expect(text.trim()).contains( 'May' )
    
    })
    cy.get('.DayPicker-Day--today > .date-picker-day-cell > .calendar-flight-price').click({force:true})
    cy.get('.DayPicker-Day--today > .date-picker-day-cell > .calendar-flight-price').invoke('text').then((text) => {
      cy.log(text)
    
    })
  });
});
