import { WalletModel, Identifier, WalletAPIHandler } from './model'

export class WalletAdmin {
  private request: WalletAPIHandler

  constructor (request: WalletAPIHandler) {
    this.request = request
  }

  <% methods.forEach((method) => { %>
  /**
   * <%= method.summary %>
   */

  // tslint:disable-next-line:max-line-length
  public <%= getMethodName(method) %> = (<%= getMethodParams(method) %>: WalletModel.<%= getMethodParamsType(method) %>) => {
    return this.request({
      method: Identifier.<%= getMethodName(method) %>,
      params,
    })
  }
  <% }) %>
}