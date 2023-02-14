export namespace WalletModel {
<%= types %>
}

export enum Identifier {
<% methods.forEach((method) => { %><%= getMethodName(method) %> = '<%= method.name %>',
<%}) %>}

export type WalletAPIRequest = <% methods.forEach((method) => { %>
  | { method: Identifier.<%= getMethodName(method) %>, params: WalletModel.<%= getMethodParamsType(method) %> }<%
}) %>

export type WalletAPIResponse = <% methods.forEach((method) => { %>
  | WalletModel.<%= getMethodResultType(method) %><%
}) %>

export type WalletAPIHandler = <% methods.forEach((method) => { %>
  & ((req: { method: Identifier.<%= getMethodName(method) %>, params: WalletModel.<%= getMethodParamsType(method) %> }) => Promise<WalletModel.<%= getMethodResultType(method) %>>)<%
}) %>