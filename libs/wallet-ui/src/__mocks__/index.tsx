import ReactDOM from 'react-dom'

import { App } from '../'
import { service } from './service'
import { runtime } from './runtime'

ReactDOM.render(
  <App service={service} runtime={runtime} />,
  document.getElementById('app')
)
