import type { Identifier, WalletModel } from '@vegaprotocol/wallet-admin'

type WalletResult =
  | WalletModel.AnnotateKeyResult
  | WalletModel.CloseConnectionResult
  | WalletModel.CloseConnectionsToHostnameResult
  | WalletModel.CloseConnectionsToWalletResult
  | WalletModel.CreateWalletResult
  | WalletModel.DescribeKeyResult
  | WalletModel.DescribeNetworkResult
  | WalletModel.DescribePermissionsResult
  | WalletModel.DescribeWalletResult
  | WalletModel.GenerateKeyResult
  | WalletModel.ImportNetworkResult
  | WalletModel.ImportWalletResult
  | WalletModel.IsolateKeyResult
  | WalletModel.ListConnectionsResult
  | WalletModel.ListKeysResult
  | WalletModel.ListNetworksResult
  | WalletModel.ListPermissionsResult
  | WalletModel.ListWalletsResult
  | WalletModel.PurgePermissionsResult
  | WalletModel.RemoveNetworkResult
  | WalletModel.RemoveWalletResult
  | WalletModel.RenameWalletResult
  | WalletModel.RevokePermissionsResult
  | WalletModel.RotateKeyResult
  | WalletModel.SendRawTransactionResult
  | WalletModel.SendTransactionResult
  | WalletModel.SignMessageResult
  | WalletModel.SignTransactionResult
  | WalletModel.StartServiceResult
  | WalletModel.StopServiceResult
  | WalletModel.TaintKeyResult
  | WalletModel.UntaintKeyResult
  | WalletModel.UpdateNetworkResult
  | WalletModel.UpdatePassphraseResult
  | WalletModel.UpdatePermissionsResult
  | WalletModel.VerifyMessageResult

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      mock(mockedFunction: Identifier, result: WalletResult): void
    }
  }
}

Cypress.Commands.add('mock', (mockedFunction, result) => {
  cy.window().then((win) => {
    win.localStorage.setItem(`MOCK.${mockedFunction}`, JSON.stringify(result))
  })
})
