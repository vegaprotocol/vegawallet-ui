const path = require('path')
const { z, ZodError } = require('zod')
const { fromZodError } = require('zod-validation-error')
const { program } = require('commander')
const { readFile, writeFile } = require('fs-extra')

const ROOT = path.join(__dirname, '..')

const patchVersion = (version) => {
  return version
    .split('.')
    .reduce((acc, v, i, arr) => {
      if (i === arr.length - 1) {
        acc.push(parseInt(v) + 1)
        return acc
      }
      acc.push(v)
      return acc
    }, [])
    .join('.')
}

const getJsonContent = async (filePath) => {
  const content = await readFile(filePath)
  return JSON.parse(content.toString())
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
    .description('Upgrade an nx project package to a new version')
    .parse(process.argv)

  try {
    const options = OptionsSchema.parse(program.opts())

    const packageJsonPath = path.join(ROOT, workspace.projects[options.project], 'package.json')
    const packageJson = await getJsonContent(packageJsonPath)
    const defaultNewVersion = patchVersion(packageJson.version)

    console.log(options)

    if (
      options.version &&
      parseInt(packageJson.version.replace('.', '')) >= parseInt(options.version.replace('.', ''))
    ) {
      throw new Error(`The version to update to (${options.version}) needs to be bigger than the current one (${packageJson.version}).`)
    }

    await writeFile(
      packageJsonPath,
      JSON.stringify(
        {
          ...packageJson,
          version: options.version || defaultNewVersion,
        },
        null,
        2
      )
    )
  } catch (err) {
    if (err instanceof ZodError) {
      throw fromZodError(err)
    }
    throw err
  }
}

main()
