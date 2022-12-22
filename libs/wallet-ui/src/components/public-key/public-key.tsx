import { Colors } from '../../config/colors'
import { BreakText } from '../break-text'
import { CopyWithTooltip } from '../copy-with-tooltip'
import { Title } from '../title'

type PublicKeyProps = {
  publicKey?: string
}

export const PublicKey = ({ publicKey }: PublicKeyProps) => {
  return (
    <div className="px-[20px]">
      <Title className="m-0 mb-[6px]">Public key</Title>
      <div className="text-white">
        <CopyWithTooltip text={publicKey ?? ''}>
          <BreakText data-testid="public-key">{publicKey}</BreakText>
        </CopyWithTooltip>
      </div>
    </div>
  )
}
