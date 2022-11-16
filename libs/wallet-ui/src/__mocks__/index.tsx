import ReactDOM from 'react-dom'

import { App } from '../'
import { service } from './service'
import { client } from './client'
import { runtime } from './runtime'

ReactDOM.render(
  <App service={service} client={client} runtime={runtime} />,
  document.getElementById('app')
)
