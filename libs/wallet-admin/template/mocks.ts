import type { WalletModel, WalletAPIRequest } from './'
import { Identifier } from './'

<% methods.forEach((method) => { %>
export function MockAPIRequest (req: { method: Identifier.<%= getMethodName(method) %>, params: WalletModel.<%= getMethodParamsType(method) %> }): Promise<WalletModel.<%= getMethodResultType(method) %>><%
}) %>
export function MockAPIRequest ({ method, params }: WalletAPIRequest) {
  if (window.localStorage.getItem(`MOCK.${method}`)) {
    const mock = JSON.parse(
      window.localStorage.getItem(`MOCK.${method}`)?.toString() as string
    )
    if (method === Identifier.DescribeNetwork && params) {
      return mock.filter(
        (network: WalletModel.DescribeNetworkResult) =>
          network.name === params.name
      )[0]
    }
    return mock
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
