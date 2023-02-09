import { WalletModel, Identifier } from './'

<% methods.forEach((method) => { %>
export function MockAPIRequest (id: Identifier.<%= getMethodName(method) %>, params: WalletModel.<%= getMethodParamsType(method) %>): Promise<WalletModel.<%= getMethodResultType(method) %>><%
}) %>
export function MockAPIRequest (id: Identifier) {
  switch (id) {
    <% methods.forEach((method) => { %>case Identifier.<%= getMethodName(method) %>: {
      return Promise.resolve<WalletModel.<%= getMethodResultType(method) %>>(<%= getMethodResultExample(method) %>)
    }
    <%}) %>
    default: {
      return Promise.resolve(null)
    }
  }
}
