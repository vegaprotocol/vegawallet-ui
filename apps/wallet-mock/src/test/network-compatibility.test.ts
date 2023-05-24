import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import serviceMock from '../types/service-mock'
import { mock } from '../support/mock'

const getVersion = {
  version: '0.98.0',
  gitHash: '0x0',
  networksCompatibility: [
    {
      network: 'local-network',
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

test.describe('Network incompatible warning', () => {
  let page: Page
  // 0001-WALL-015 - must be warned if the version I am using is not compatible with the version of Vega on the selected network, and I am given a link to get latest compatible version on github
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await mock(page, serviceMock.GetVersion, getVersion)
    await page.goto('/')
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('should see network incompatible warning button', async () => {
    await expect(
      page.getByTestId('network-compatibility-warning')
    ).toBeVisible()
  })

  test('should open network incompatible warning dialog', async () => {
    await page.getByTestId('network-compatibility-warning').click()
    await expect(page.getByTestId('network-compatibility-dialog')).toBeVisible()
  })
})

test.describe('Network incompatible dialog validations', () => {
  let page: Page
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await mock(page, serviceMock.GetVersion, getVersion)
    await page.goto('/')
    await page.getByTestId('network-compatibility-warning').click()
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('should see dialog title', async () => {
    const title = page.getByTestId('network-compatibility-dialog').locator('h2')
    await expect(title).toBeVisible()
    await expect(title).toHaveText('Potential compatibility issue')
  })
  test('should see info text', async () => {
    await expect(
      page.getByTestId('network-compatibility-info-text')
    ).toHaveText(
      `This software and the network ${getVersion.networksCompatibility[0].network} are relying on different network software versions. You may encounter compatibility issues, such as transactions not being seen by the network.The network local-network is currently running on version "${getVersion.networksCompatibility[0].retrievedVersion}", while this software is running on version "${getVersion.backend.version}".`
    )
  })

  test('should see get wallet app button', async () => {
    const button = page.getByTestId('network-compatibility-release')
    await Promise.all([
      expect(button).toBeVisible(),
      expect(button).toHaveAttribute(
        'href',
        'https://github.com/vegaprotocol/vegawallet-desktop/releases'
      ),
      expect(button).toHaveText(
        `Get wallet app for ${getVersion.networksCompatibility[0].retrievedVersion}`
      ),
    ])
  })

  test('should see change network button', async () => {
    const button = page.getByTestId('network-compatibility-change')
    await expect(button).toBeVisible()
    await expect(button).toHaveText('Change network')
  })

  test('should see continue link', async () => {
    const link = page.getByTestId('network-compatibility-continue')
    await expect(link).toBeVisible()
    await expect(link).toHaveText('Continue with existing network')
  })
})

test.describe('Network incompatible dialog actions', async () => {
  test.beforeEach(async ({ page }) => {
    await mock(page, serviceMock.GetVersion, getVersion)
    await page.goto('/')
    await page.getByTestId('network-compatibility-warning').click()
  })

  test('should be shown compatible networks dialog', async ({ page }) => {
    await page.getByTestId('network-compatibility-change').click()
    const dialog = page.getByTestId('network-compatibility-dialog')

    await Promise.all([
      expect(dialog.locator('h2')).toHaveText('Choose a compatible network'),
      expect(dialog.locator('#test2')).toBeVisible(),
      expect(dialog.locator('#test4')).toBeVisible(),
      expect(dialog.locator('#local-network')).toBeHidden(),
      expect(dialog.locator('#test3')).toBeHidden(),
    ])
  })

  test('should close the dialog', async ({ page }) => {
    await page.getByTestId('network-compatibility-continue').click()
    await expect(page.getByTestId('network-compatibility-dialog')).toHaveCount(
      0
    )
    await expect(page.getByTestId('wallet-home')).toBeVisible()
  })
})

test.describe('Network compatible icon', async () => {
  let page: Page
  test.beforeAll(async ({ browser }) => {
    const versionMock = Object.assign({}, getVersion)
    versionMock.networksCompatibility[0].isCompatible = true
    page = await browser.newPage()
    await mock(page, serviceMock.GetVersion, versionMock)
    await page.goto('/')
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('should see status icon green and blinking', async () => {
    await expect(
      page.getByTestId('service-status').locator('.bg-green.blink')
    ).toBeVisible()
  })

  test('should not be able to click status icon', async () => {
    await page.getByTestId('service-status').locator('.bg-green.blink').click()
    await expect(page.getByTestId('network-compatibility-dialog')).toHaveCount(
      0
    )
  })

  test('should not see network incompatible warning button', async () => {
    await expect(page.getByTestId('network-compatibility-warning')).toHaveCount(
      0
    )
  })
})
