import './styles.css'
import classnames from 'classnames'

const StoryWrapper = ({ children, fill }) => {
  const classes = classnames(
    'p-4',
    'bg-black text-white font-sans overflow-y-scroll',
    {
      'w-screen h-screen': fill,
    }
  )
  return <div className={classes}>{children}</div>
}

export const parameters = {
  layout: 'fullscreen',
  backgrounds: { disable: true },
}

const Wrapper = (Story, context) => {
  return (
    <StoryWrapper fill={true}>
      <Story />
    </StoryWrapper>
  )
}

export const decorators = [Wrapper]
