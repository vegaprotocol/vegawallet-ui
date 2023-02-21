import { WalletModel, WalletAPIRequest, Identifier } from './'

<% methods.forEach((method) => { %>
export function MockAPIRequest (req: { method: Identifier.<%= getMethodName(method) %>, params: WalletModel.<%= getMethodParamsType(method) %> }): Promise<WalletModel.<%= getMethodResultType(method) %>><%
}) %>
export function MockAPIRequest ({ method }: WalletAPIRequest) {
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
