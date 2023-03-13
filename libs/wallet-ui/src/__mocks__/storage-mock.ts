export default function getStorageMock(
  functionName: string,
  defaultValue?: unknown
) {
  if (
    localStorage.getItem('playwright') &&
    window.localStorage.getItem(`MOCK.${functionName}`) !== null
  ) {
    return JSON.parse(
      window.localStorage.getItem(`MOCK.${functionName}`)?.toString() || 'null'
    )
  } else {
    return defaultValue || null
  }
}
