import classnames from 'classnames'
import { useEffect, useState } from 'react'

export const SplashLoader = ({ text = 'Loading' }: { text?: string }) => {
  const [, forceRender] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      forceRender((x) => !x)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div data-testid="splash-loader" className="flex flex-col items-center">
      <div className="flex flex-wrap w-[50px] h-[50px] mb-[20px]">
        {new Array(25).fill(null).map((_, i) => {
          return (
            <div
              key={i}
              style={{
                opacity: Math.random() > 0.75 ? 1 : 0,
              }}
              className={classnames('w-[10px] h-[10px] bg-white')}
            />
          )
        })}
      </div>
      <div className="text-white text-xl">{text}</div>
    </div>
  )
}
