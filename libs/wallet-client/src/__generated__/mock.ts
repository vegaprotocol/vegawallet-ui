import type { Express } from 'express';
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Identifier } from './'

type Props = {
  port: number
}

export class MockWalletService {
  private port: number
  private app: Express
  private server: null | ReturnType<Express['listen']>

  constructor({ port }: Props) {
    const app = express()

    app.use(express.json())
    app.use(bodyParser.json())
    app.use(cors())

    app.post(`/api/v2/requests`, (req, res) => {
      switch (req.body.method) {
        case Identifier.ConnectWallet: {
          res.send({
            token:
              'hZKSx0snBvikp2NGMJdKPHU5qvloSeqpqbJg6BsMwCcqX4iZvvy99BV2l13oeyEG',
          })
          return
        }

        case Identifier.DisconnectWallet: {
          res.send(null)
          return
        }

        case Identifier.GetPermissions: {
          res.send({
            publicKeys: 'read',
          })
          return
        }

        case Identifier.RequestPermissions: {
          res.send({
            permissions: {
              publicKeys: 'read',
            },
          })
          return
        }

        case Identifier.ListKeys: {
          res.send({
            keys: [
              {
                name: 'Key 1',
                publicKey:
                  'b5fd9d3c4ad553cb3196303b6e6df7f484cf7f5331a572a45031239fd71ad8a0',
              },
              {
                name: 'Key 2',
                publicKey:
                  '988eae323a07f12363c17025c23ee58ea32ac3912398e16bb0b56969f57adc52',
              },
            ],
          })
          return
        }

        case Identifier.SignTransaction: {
          res.send({
            receivedAt: '2021-02-18T21:54:42.123Z',
            sentAt: '2021-02-18T21:54:42.123Z',
            txHash:
              'E8C167126D1FC8D92898AB9C07C318161DF68753A1316A69ABDC9ADC557723B3',
          })
          return
        }

        case Identifier.SendTransaction: {
          res.send({
            receivedAt: '2021-02-18T21:54:42.123Z',
            sentAt: '2021-02-18T21:54:42.123Z',
            txHash:
              'E8C167126D1FC8D92898AB9C07C318161DF68753A1316A69ABDC9ADC557723B3',
          })
          return
        }

        case Identifier.GetChainId: {
          res.send({
            chainID: 'test-chain-Thz9c6',
          })
          return
        }

        default: {
          res.status(400).send({
            message: `Method "${req.body.method}" not supported.`,
          })
        }
      }
    })

    app.get(`/api/v2/methods`, (_req, res) => {
      res.send({
        registeredMethods: Object.values(Identifier),
      })
    })

    this.port = port
    this.app = app
    this.server = null
  }

  start() {
    this.server = this.app.listen(this.port)
  }

  stop() {
    return new Promise((resolve) => {
      if (!this.server) {
        return resolve(undefined)
      }
      this.server.close(() => {
        resolve(undefined)
      })
    })
  }
}
