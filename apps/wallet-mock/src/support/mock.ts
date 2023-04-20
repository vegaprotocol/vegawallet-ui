import type { Page } from '@playwright/test'
import type adminMock from '../types/admin-mock'
import type serviceMock from '../types/service-mock'

export async function mock(
  page: Page,
  mockedFunction: adminMock | serviceMock,
  result: object
) {
  const fun = `MOCK.${mockedFunction}`
  const res = JSON.stringify(result)
  await page.addInitScript(
    ({ fun, res }) => {
      localStorage.setItem(fun, res)
    },
    { fun, res }
  )
}
