import { CopyWithTooltip } from '../copy-with-tooltip'

export const CodeWindow = ({ text }: { text: string }) => {
  return (
    <div className="max-h-40 text-xl flex text-white border-dark-200 border border-2 p-5 rounded-md w-full">
      <code className="overflow-y-scroll">{text}</code>
      <CopyWithTooltip text={text} />
    </div>
  )
}
