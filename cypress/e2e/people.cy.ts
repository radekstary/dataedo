const imgPlaceholder =
  'https://cdn3.vectorstock.com/i/1000x1000/36/32/person-gray-photo-placeholder-man-vector-23503632.jpg';

afterEach(() => {
  goOnline();
});
const goOffline = () => {
  cy.log('**go offline**')
    .then(() => {
      return Cypress.automation('remote:debugger:protocol', {
        command: 'Network.enable',
      });
    })
    .then(() => {
      return Cypress.automation('remote:debugger:protocol', {
        command: 'Network.emulateNetworkConditions',
        params: {
          offline: true,
          latency: -1,
          downloadThroughput: -1,
          uploadThroughput: -1,
        },
      });
    });
};
const goOnline = () => {
  cy.log('**go online**')
    .then(() => {
      return Cypress.automation('remote:debugger:protocol', {
        command: 'Network.enable',
      });
    })
    .then(() => {
      return Cypress.automation('remote:debugger:protocol', {
        command: 'Network.emulateNetworkConditions',
        params: {
          offline: false,
          latency: 0,
          downloadThroughput: 0,
          uploadThroughput: 0,
        },
      });
    });
};

describe('people page', () => {
  it('should load the /people page', () => {
    cy.visit('http://localhost:4200/people');
    cy.wait(1500);
  });
  it('should render the persons photo', () => {
    cy.get('[data-cy=people-img]').should(
      'not.have.attr',
      'src',
      imgPlaceholder
    );
  });

  it('should fetch a new persons data on btn click', () => {
    const name = cy
      .get('[data-cy=people-name')
      .invoke('text')
      .then((text1) => {
        // click the button which fetches new person data
        cy.get('[data-cy=people-btn-getNewPerson]').click();

        // grab the element again and compare its previous text
        // to the current text
        cy.get('[data-cy=people-name')
          .invoke('text')
          .should((text2) => {
            expect(text1).not.to.eq(text2);
          });
      });
  });

  it('should fetch a new persons data every 5 seconds', () => {
    const name = cy
      .get('[data-cy=people-name')
      .invoke('text')
      .then((text1) => {
        // click the button which fetches new person data
        cy.wait(5000);

        // grab the element again and compare its previous text
        // to the current text
        cy.get('[data-cy=people-name')
          .invoke('text')
          .should((text2) => {
            expect(text1).not.to.eq(text2);
          });
      });
  });

  it('should render the Retry Button on connection error and reload data on clicking it', () => {
    goOffline();
    cy.get('[data-cy=people-btn-getNewPerson]').click();
    cy.get('[data-cy=people-btn-retry]').should('be.visible');
    goOnline();

    cy.get('[data-cy=people-btn-retry]')
      .click()
      .then(() => {
        cy.get('[data-cy=people-img').should('be.visible');
        cy.get('[data-cy=people-name').should('be.visible');
      });
  });
});
