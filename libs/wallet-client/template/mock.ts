import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Identifier } from './'

type Props = {
  port: number
}

const MockParams = {
  <% methods.forEach((method) => { %>
  <%= getMethodName(method) %>: <%= getMethodParamsExample(method) %>,
  <% }) %>
}

export class MockWalletService {
  private port: number
  private app: Express
  private server: null | ReturnType<Express['listen']>

  public static params = MockParams

  constructor ({ port }: Props) {
    const app = express()

    app.use(express.json())
    app.use(bodyParser.json())
    app.use(cors())

    app.post(`/api/v2/requests`, (req, res) => {
      switch (req.body.method) {
      <% methods.forEach((method) => { %>
        case Identifier.<%= getMethodName(method) %>: {
          res.send({
            id: req.body.id,
            result: <%= getMethodResultExample(method) %>,
          })
          return
        }
      <% }) %>
        default: {
          res.status(400).send({
            message: `Method "${req.body.method}" not supported.`
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

  start () {
     this.server = this.app.listen(this.port)
  }

  stop () {
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
