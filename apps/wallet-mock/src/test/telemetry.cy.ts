import serviceMock from '../types/service-mock'

const appConfigMock = {
  logLevel: 'debug',
  vegaHome: '',
  defaultNetwork: 'test',
  telemetry: {
    consentAsked: false,
    enabled: true,
  },
}

describe('Telemetry dialog elements', () => {
  // 0001-WALL-003 - if the app sends telemetry/analytics: must be prompted to opt into (or stay out of) analytics
  before(() => {
    cy.mock(serviceMock.GetAppConfig, appConfigMock)
    cy.visit('/')
  })
  it('should see telemetry dialog', () => {
    cy.getByTestId('telemetry-option-dialog').should('be.visible')
  })
  it('should see telemetry dialog title', () => {
    cy.getByTestId('telemetry-option-dialog')
      .find('h2')
      .should('be.visible')
      .and('have.text', 'Report bugs and crashes')
  })

  it('should see info text', () => {
    cy.getByTestId('telemetry-option-form')
      .find('p')
      .should(
        'have.text',
        'Selecting yes will help developers improve the software'
      )
  })

  it('should see form options', () => {
    cy.getByTestId('telemetry-option-form')
      .find('[role="radio"]')
      .then(($radio) => {
        expect($radio).to.have.length(2)
        expect($radio.eq(0)).to.have.value('no')
        expect($radio.eq(0)).to.have.attr('data-state', 'checked')
        expect($radio.eq(1)).to.have.value('yes')
        expect($radio.eq(1)).to.have.attr('data-state', 'unchecked')
      })
  })

  it('should see form button', () => {
    cy.getByTestId('telemetry-option-form')
      .find('button')
      .should('have.text', 'Continue')
  })
})

describe('Telemetry dialog action', () => {
  before(() => {
    cy.mock(serviceMock.GetAppConfig, appConfigMock)
    cy.visit('/')
  })
  it('should be able to submit telemetry form', () => {
    cy.getByTestId('telemetry-option-form').find('#yes').click()
    cy.getByTestId('telemetry-option-continue').click()
    cy.getByTestId('telemetry-option-dialog').should('not.exist')
  })
})
