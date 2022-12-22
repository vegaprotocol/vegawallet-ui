import './spinner.css'

export function Spinner() {
  return (
    <svg
      width="20"
      height="20"
      strokeWidth="10"
      viewBox="0 0 50 50"
      className="block w-[24px] h-[24px]"
      style={{
        animation: 'rotate 2s linear infinite',
      }}
    >
      <circle
        style={{
          animation: 'dash 1.5s ease-in-out infinite',
        }}
        stroke="currentColor"
        strokeLinecap="square"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      />
    </svg>
  )
}
