const { MockWalletService } = require('../dist/libs/wallet-client/mocks.cjs')

const service = new MockWalletService({ port: 1789 })

service.start()
