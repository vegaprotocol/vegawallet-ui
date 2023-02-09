export namespace WalletModel {
<%= types %>
}

export enum Identifier {
<% methods.forEach((method) => { %><%= getMethodName(method) %> = '<%= method.name %>',
<%}) %>}

export type WalletAPIRequest = <% methods.forEach((method) => { %>
  & ((id: Identifier.<%= getMethodName(method) %>, params: WalletModel.<%= getMethodParamsType(method) %>) => Promise<WalletModel.<%= getMethodResultType(method) %>>)<%
  }) %>

export class WalletAdmin {
  private request: WalletAPIRequest

  constructor (request: WalletAPIRequest) {
    this.request = request
  }

  <% methods.forEach((method) => { %>
  /**
   * <%= method.summary %>
   */

  // tslint:disable-next-line:max-line-length
  public <%= getMethodName(method) %> = (<%= getMethodParams(method) %>: WalletModel.<%= getMethodParamsType(method) %>) => {
    return this.request(Identifier.<%= getMethodName(method) %>, params)
  }
  <% }) %>
}
