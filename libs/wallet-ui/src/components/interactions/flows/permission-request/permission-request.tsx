export type PermissionRequestProps = {
  traceID: string
  workflow: 'PERMISSION_REQUEST'
}

export const PermissionRequest = ({ workflow }: PermissionRequestProps) => {
  return <div>{workflow}</div>
}
