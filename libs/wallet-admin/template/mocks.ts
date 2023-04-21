import type { WalletModel, WalletAPIRequest } from './'
import { Identifier } from './'

<% methods.forEach((method) => { %>
export function MockAPIRequest (req: { method: Identifier.<%= getMethodName(method) %>, params: WalletModel.<%= getMethodParamsType(method) %> }): Promise<WalletModel.<%= getMethodResultType(method) %>><%
}) %>
export function MockAPIRequest ({ method }: WalletAPIRequest) {
  if (window.localStorage.getItem(`MOCK.${method}`)) {
    return JSON.parse(
      window.localStorage.getItem(`MOCK.${method}`)?.toString() as string
    )
  } else {
    switch (method) {
      <% methods.forEach((method) => { %>case Identifier.<%= getMethodName(method) %>: {
        return Promise.resolve<WalletModel.<%= getMethodResultType(method) %>>(<%= getMethodResultExample(method) %>)
      }
      <%}) %>
      default: {
        return Promise.resolve(null)
      }
    }
  }
}
