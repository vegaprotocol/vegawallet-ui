const path = require('path')
const { z, ZodError } = require('zod')
const { fromZodError } = require('zod-validation-error')
const { program } = require('commander')
const { readFile, writeFile } = require('fs-extra')

const ROOT = path.join(__dirname, '..')

const getFileContent = async (filePath) => {
  const content = await readFile(filePath)
  return content.toString()
}

async function main() {
  const workspace = await getJsonContent(path.join(ROOT, 'workspace.json'))

  const OptionsSchema = z.object({
    version: z.string().regex(/^\d+.\d+.\d+$/),
    project: z.enum(Object.keys(workspace.projects)),
  })

  program
    .option(`--version [version]`, 'The project version to update to')
    .option(`-p, --project [project]`, 'The nx project name')
    .description(
      'Upgrade an nx project readme to point to the correct wallet API version'
    )
    .parse(process.argv)

  try {
    const options = OptionsSchema.parse(program.opts())

    const readmePath = path.join(
      ROOT,
      workspace.projects[options.project],
      'README.md'
    )
    const readmeContent = await getFileContent(readmePath)
    const updatedContent = readmeContent.replace(
      /Vega wallet API v(\d+.\d+.\d+)/,
      `Vega Wallet API v${version}`
    )

    await writeFile(readmePath, updatedContent)
  } catch (err) {
    if (err instanceof ZodError) {
      throw fromZodError(err)
    }
    throw err
  }
}

main()
