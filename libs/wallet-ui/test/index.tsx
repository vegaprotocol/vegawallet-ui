import { createRoot } from 'react-dom/client'
import { App as WalletUI } from '../src'
import { service, client, runtime } from '../src/mocks'

const element = document.getElementById('app')

if (element) {
  const root = createRoot(element)
  root.render(<WalletUI service={service} client={client} runtime={runtime} />)
}
