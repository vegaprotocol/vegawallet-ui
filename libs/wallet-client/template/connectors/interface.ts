import { WalletModel } from '../model'

export interface Connector {
    <% methods.forEach((method) => { %>
    <%= getMethodName(method) %>(<%= getMethodParams(method) %>: WalletModel.<%= getMethodParamsType(method) %>): Promise<WalletModel.<%= getMethodResultType(method) %>><%
    }) %>
    ListMethods(): Promise<{ registeredMethods: string[] }>
}