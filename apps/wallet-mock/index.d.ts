import type { EventFlowType, InteractionType } from '@vegaprotocol/wallet-ui'
import type adminMock from './src/types/admin-mock'
import type serviceMock from './src/types/service-mock'

declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      mock(mockedFunction: adminMock | serviceMock, result: object): void
      getByTestId(
        selector: string,
        options?: Partial<Loggable & Timeoutable & Withinable & Shadow>
      ): Chainable<JQuery<HTMLElementTagNameMap[string]>>
      sendBackendInteraction(interaction: InteractionType, data?: object): void
      beginInteractionSession(eventFlowType: EventFlowType): void
      endInteractionSession(): void
    }
  }
}
