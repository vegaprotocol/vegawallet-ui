import serviceMock from '../types/service-mock'

const getVersion = {
  version: '0.98.0',
  gitHash: '0x0',
  networksCompatibility: [
    {
      network: 'test',
      isCompatible: false,
      retrievedVersion: '1.0.0',
    },
    {
      network: 'test2',
      isCompatible: true,
      retrievedVersion: '1.0.0',
    },
    {
      network: 'test3',
      isCompatible: false,
      retrievedVersion: '1.0.0',
    },
    {
      network: 'test4',
      isCompatible: true,
      retrievedVersion: '1.0.0',
    },
  ],
  backend: {
    version: '2.0.1',
    gitHash: '0x0',
  },
}

describe('Network incompatible warning', () => {
  // 0001-WALL-015 - must be warned if the version I am using is not compatible with the version of Vega on the selected network, and I am given a link to get latest compatible version on github
  before(() => {
    cy.mock(serviceMock.GetVersion, getVersion)
    cy.visit('/')
  })
  it('should see network incompatible warning button', () => {
    cy.getByTestId('network-compatibility-warning').should('be.visible')
  })
  it('should open network incompatible warning dialog', () => {
    cy.getByTestId('network-compatibility-warning').click()
    cy.getByTestId('network-compatibility-dialog').should('be.visible')
  })
})

describe.only('Network check failed warning', () => {
  // 0001-WALL-015 - must be warned if the version I am using is not compatible with the version of Vega on the selected network, and I am given a link to get latest compatible version on github
  before(() => {
    cy.mock(serviceMock.GetVersion, {
      version: '0.98.0',
      gitHash: '0x0',
      networksCompatibility: [
        {
          network: 'test',
          isCompatible: false,
          retrievedVersion: '',
          error: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        },
      ],
      backend: {
        version: '2.0.1',
        gitHash: '0x0',
      },
    })
    cy.visit('/')
  })
  it('should see network incompatible warning button', () => {
    cy.getByTestId('network-compatibility-warning').should('be.visible')
  })
  it('should open network incompatible warning dialog', () => {
    cy.getByTestId('network-compatibility-warning').click()
    cy.getByTestId('network-compatibility-dialog').should('be.visible')
    cy.getByTestId('network-compatibility-failed-info').should(
      'have.text',
      'We were unable to verify network compatibility. Your connection may not work as expected, and transactions may not be seen by the network.'
    )
    cy.percySnapshot('networks_incompatible-1')
  })
})

describe('Network incompatible dialog validations', () => {
  before(() => {
    cy.mock(serviceMock.GetVersion, getVersion)
    cy.visit('/')
    cy.getByTestId('network-compatibility-warning').click()
  })

  it('should see dialog title', () => {
    cy.getByTestId('network-compatibility-dialog')
      .find('h2')
      .should('be.visible')
      .and('have.text', 'Potential compatibility issue')
  })
  it('should see info text', () => {
    cy.getByTestId('network-compatibility-info-text')
      .invoke('text')
      .then((text) =>
        expect(text).to.equal(
          `This software and the network ${getVersion.networksCompatibility[0].network} are relying on different network software versions. You may encounter compatibility issues, such as transactions not being seen by the network.The network test is currently running on version "${getVersion.networksCompatibility[0].retrievedVersion}", while this software is running on version "${getVersion.backend.version}".`
        )
      )
  })

  it('should see get wallet app button', () => {
    cy.getByTestId('network-compatibility-release').then((button) => {
      expect(button).to.be.visible
      expect(button).to.have.attr(
        'href',
        'https://github.com/vegaprotocol/vegawallet-desktop/releases'
      )
      expect(button).to.have.text(
        `Get wallet app for ${getVersion.networksCompatibility[0].retrievedVersion}`
      )
    })
  })

  it('should see change network button', () => {
    cy.getByTestId('network-compatibility-change').then((button) => {
      expect(button).to.be.visible
      expect(button).to.have.text('Change network')
    })
  })

  it('should see continue link', () => {
    cy.getByTestId('network-compatibility-continue').then((button) => {
      expect(button).to.be.visible
      expect(button).to.have.text('Continue with existing network')
    })
    cy.percySnapshot('networks_incompatible-2')
  })
})

describe('Network incompatible dialog actions', () => {
  beforeEach(() => {
    cy.mock(serviceMock.GetVersion, getVersion)
    cy.visit('/')
    cy.getByTestId('network-compatibility-warning').click()
  })

  it('should be shown compatible networks dialog', () => {
    cy.getByTestId('network-compatibility-change').click()
    cy.getByTestId('network-compatibility-dialog').then((dialog) => {
      expect(dialog.find('h2')).to.have.text('Choose a compatible network')
      expect(dialog.find('#test2')).to.be.visible
      expect(dialog.find('#test4')).to.be.visible
      expect(dialog.find('#test')).to.not.exist
      expect(dialog.find('#test3')).to.not.exist
    })
    cy.percySnapshot('networks_dialog_change-1')
  })

  it('should close the dialog', () => {
    cy.getByTestId('network-compatibility-continue').click()
    cy.getByTestId('network-compatibility-dialog').should('not.exist')
    cy.getByTestId('wallet-home').should('be.visible')
  })
})

describe('Network compatible icon', () => {
  before(() => {
    const mock = Object.assign({}, getVersion)
    mock.networksCompatibility[0].isCompatible = true
    cy.mock(serviceMock.GetVersion, getVersion)
    cy.visit('/')
  })
  it('should see status icon green and blinking', () => {
    cy.getByTestId('service-status-started')
      .find('.bg-green.blink')
      .should('be.visible')
  })

  it('should not be able to click status icon', () => {
    cy.getByTestId('service-status-started').find('.bg-green.blink').click()
    cy.getByTestId('network-compatibility-dialog').should('not.exist')
  })

  it('should not see network incompatible warning button', () => {
    cy.getByTestId('network-compatibility-warning').should('not.exist')
  })
})
