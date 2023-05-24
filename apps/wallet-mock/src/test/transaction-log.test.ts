import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import { createTransaction } from '../support/transaction'
import { mock } from '../support/mock'
import adminMock from '../types/admin-mock'

const transaction = {
  orderSubmission: {
    marketId:
      '10c7d40afd910eeac0c2cad186d79cb194090d5d5f13bd31e14c49fd1bded7e2',
    price: '0',
    size: '64',
    side: 'SIDE_SELL',
    timeInForce: 'TIME_IN_FORCE_GTT',
    expiresAt: '1678959957494396062',
    type: 'TYPE_LIMIT',
    reference: 'traderbot',
    peggedOrder: {
      reference: 'PEGGED_REFERENCE_BEST_ASK',
      offset: '15',
    },
  },
}

const networksMock = {
  networks: [
    {
      name: 'local-network',
    },
    {
      name: 'local-network-2',
    },
  ],
}

const networkMock = [
  {
    name: 'local-network',
    api: {
      grpcConfig: {
        hosts: ['localhost:3028'],
        retries: 5,
      },
      graphQLConfig: {
        hosts: ['localhost:3028'],
      },
      restConfig: {
        hosts: ['localhost:3029'],
      },
    },
    apps: {
      console: 'console.vega.xyz',
      governance: 'governance.vega.xyz',
      explorer: 'explorer.vega.xyz',
    },
  },
  {
    name: 'local-network-2',
    api: {
      grpcConfig: {
        hosts: ['localhost:3028'],
        retries: 5,
      },
      graphQLConfig: {
        hosts: ['localhost:3028'],
      },
      restConfig: {
        hosts: ['localhost:3029'],
      },
    },
    apps: {
      console: 'console-2.vega.xyz',
      governance: 'governance-2.vega.xyz',
      explorer: 'explorer-2.vega.xyz',
    },
  },
]

test('empty transaction log', async ({ page }) => {
  // 0001-WALL-039 - I can see empty state when there are no transactions for this session
  await page.goto('/')
  await page.getByTestId('nav-transactions').click()
  await expect(page.getByTestId('transactions-empty')).toHaveText(
    'You have no transactions this session.'
  )
})

test('transaction details route', async ({ page }) => {
  // 0001-WALL-038 - I can click a transaction in the list to see the transaction details
  await page.goto('/')
  await createTransaction(page, transaction, 'success')
  await page.getByTestId('nav-transactions').click()
  await page.getByTestId('transactions-transaction').click()
  await expect(page.getByTestId('Order submission')).toBeVisible()
})

test.describe('Transaction log', () => {
  let page: Page
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('/')
    await createTransaction(page, transaction, 'success')
    await createTransaction(page, transaction, 'failure')
    await createTransaction(page, transaction, 'rejected')
    await page.getByTestId('nav-transactions').click()
  })

  test('transaction list is visible', async () => {
    // 0001-WALL-034 - I can find a single list of all transactions, completed and ongoing, from all keys and wallets, from my current desktop session and network
    const list = page.getByTestId('Transactions').getByTestId('list')
    await expect(list).toBeVisible()
    await expect(list).not.toBeEmpty()
  })

  test('succeeded transaction is visible', async () => {
    // 0001-WALL-035 - I can see transactions that were confirmed by the wallet user (me)
    const list = page.getByTestId('Transactions').getByTestId('list')
    await expect(list).toBeVisible()
    await expect(list).not.toBeEmpty()
  })

  test('failed transaction is visible', async () => {
    const list = page.getByTestId('Transactions').getByTestId('list')
    await expect(list).toBeVisible()
    await expect(list).not.toBeEmpty()
  })

  test('rejected transaction is visible', async () => {
    // 0001-WALL-036 - I can see transactions that were rejected by the wallet user (me)
    const list = page.getByTestId('Transactions').getByTestId('list')
    await expect(list).toBeVisible()
    await expect(list).not.toBeEmpty()
  })

  test.afterAll(async () => {
    await page.close()
  })
})

test.describe('Transaction details', () => {
  let page: Page
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('/')
    await createTransaction(page, transaction, 'success')
    await page.getByTestId('nav-transactions').click()
    await page.getByTestId('transactions-transaction').click()
  })

  test('transaction details are visible', async () => {
    // 0001-WALL-041 - I can see details of specific transactions I opened
    await expect(page.getByTestId('transaction-payload')).toBeVisible()
    await expect(
      page.getByTestId('transaction-payload').getByTestId('code-window-content')
    ).toHaveText(JSON.stringify(transaction, null, 2))
  })

  test('transaction link to block explorer', async () => {
    // 0001-WALL-042 - I can find my way to the transaction on block explorer
    await expect(page.getByTestId('tx-hash').getByRole('link')).toHaveAttribute(
      'href',
      /explorer\.vega\.xyz\/txs/
    )
  })

  test('transaction link to complete transaction history of the key', async () => {
    // 0001-WALL-043 - I can find my way to the complete transaction history for that key on block explorer)
    await expect(
      page.getByTestId('public-key').getByRole('link')
    ).toHaveAttribute('href', /explorer\.vega\.xyz\/parties/)
  })
})

test.describe('Transaction log networks', () => {
  let page: Page
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await mock(page, adminMock.ListNetworks, networksMock)
    await mock(page, adminMock.DescribeNetwork, networkMock)
    await page.goto('/')
    await createTransaction(page, transaction, 'success')
    await switchNetwork(page, 'local-network-2')
    await createTransaction(page, transaction, 'rejected')
    await page.getByTestId('nav-transactions').click()
  })
  test.afterAll(async () => {
    await page.close()
  })
  test('transaction log changes when switching networks', async () => {
    // 0001-WALL-037 - If I switch network, transactions list changes to show the transactions for that network
    expect(await page.getByTestId('transactions-transaction').count()).toBe(1)
    await expect(
      page
        .getByTestId('transactions-transaction')
        .getByTestId('transaction-status')
    ).toHaveText('Rejected')
    await switchNetwork(page, 'local-network')
    expect(await page.getByTestId('transactions-transaction').count()).toBe(1)
    await expect(
      page
        .getByTestId('transactions-transaction')
        .getByTestId('transaction-status')
    ).toHaveText('Successful')
  })
})

async function switchNetwork(page: Page, network: string) {
  await page.getByTestId('network-drawer').click()
  await page.getByTestId('network-select').click()
  await page.getByTestId(`select-${network}`).click()
  await page.getByTestId('network-drawer').click()
}
