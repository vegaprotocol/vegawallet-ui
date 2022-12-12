import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Identifier } from './'

type Props = {
  port: number
}

export const MockWalletService = ({ port }: Props) => {
  const app = express()

  app.use(express.json())
  app.use(bodyParser.json())
  app.use(cors())

  app.post(`/api/v2/requests`, (req, res) => {
    switch (req.body.method) {
    <% methods.forEach((method) => { %>
      case Identifier.<%= getMethodName(method) %>: {
        res.send(<%= getMethodExample(method) %>)
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

  let server: ReturnType<typeof app['listen']>

  return {
    start: () => {
       server = app.listen(port)
    },
    stop: async () => new Promise((resolve) => {
      if (!server) {
        return resolve(undefined)
      }
      server.close(() => {
        resolve(undefined)
      })
    }),
  }
}
