import { Title } from '../../title'
import { Button } from '../../button'
import { ButtonGroup } from '../../button-group'
import { CodeBlock } from '../../code-block'
import { Warning } from '../../icons/warning'
import type { ErrorOccurredContent } from '../../../types/interaction'

export type InteractionErrorType =
  | ErrorOccurredContent
  | {
      type: 'Backend error'
      error: string
    }

export type InteractionErrorProps = {
  title?: string
  type: InteractionErrorType['type']
  message: string
  onClose: () => void
}

const getDefs = (type: InteractionErrorType['type']) => {
  switch (type) {
    case 'Application error': {
      return {
        title: type,
        description: '',
      }
    }
    // When not being able to send a request to the wails backend
    case 'Backend error': {
      return {
        title: 'Something went wrong',
        description:
          "Couldn't send the response to the backend service. You might need to restart your wallet app, and try again.",
      }
    }
    case 'Internal error': {
      return {
        title: type,
        description: '',
      }
    }
    case 'Network error': {
      return {
        title: type,
        description:
          "We couldn't fulfill your request due to network issues. Make sure your connection is stable, and give it another go.",
      }
    }
    case 'Server error': {
      return {
        title: type,
        description: '',
      }
    }
    case 'User error': {
      return {
        title: 'Something went wrong',
        description: '',
      }
    }
  }
}

export const InteractionError = ({
  title,
  type,
  message,
  onClose,
}: InteractionErrorProps) => {
  const { title: defTitle, description } = getDefs(type)

  return (
    <div className="flex flex-col py-[40px] px-[20px] justify-center items-center">
      <Title className="text-xl">{title || defTitle}</Title>
      <div className="p-[10px]">
        <Warning className="w-[48px] text-danger-light" />
      </div>
      <p className="mt-[20px]">{description}</p>
      <div className="my-[20px]">
        <CodeBlock className="max-w-full">{message}</CodeBlock>
      </div>
      <ButtonGroup>
        <Button onClick={() => onClose()}>Close</Button>
      </ButtonGroup>
    </div>
  )
}
