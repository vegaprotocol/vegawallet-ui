export namespace WalletModel {
  <%= types.replace('export interface Transaction {}', 'export type Transaction = VegaTransaction') %>
  }
  
  export enum Identifier {
  <% methods.forEach((method) => { %><%= getMethodName(method) %> = '<%= method.name %>',
  <%}) %>}

  export type WalletClientHandler = <% methods.forEach((method) => { %>
    & ((id: Identifier.<%= getMethodName(method) %>, params: WalletModel.<%= getMethodParamsType(method) %>) => Promise<WalletModel.<%= getMethodResultType(method) %>>)<%
    }) %>

  export type ResponseError = {
    code: number
    message: string
    data: string
  }