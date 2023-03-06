export default function getStorageMock(
  functionName: string,
  defaultValue?: unknown
) {
  if (
    'Cypress' in window &&
    window.localStorage.getItem(`MOCK.${functionName}`) !== null
  ) {
    return JSON.parse(
      window.localStorage.getItem(`MOCK.service.GetAppConfig`)?.toString() ||
        'null'
    )
  } else {
    return defaultValue || null
  }
}
