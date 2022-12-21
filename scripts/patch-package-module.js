const path = require('path')
const { readFile, writeFile } = require('fs-extra')

async function main(filePath) {
  const fullFilePath = path.join(process.cwd(), filePath)
  const content = await readFile(fullFilePath)
  const json = JSON.parse(content.toString())

  // Esbuild generates the wrong "module" and "main" paths for some reason in the package json, couldn't figure out why, this hack fixes it for now
  await writeFile(
    fullFilePath,
    JSON.stringify(
      {
        ...json,
        ...(json.main
          ? {
              main: json.main.replace('src/', '').replace('.tsx', ''),
            }
          : {}),
        ...(json.module
          ? {
              module: json.module.replace('src/', '').replace('.tsx', ''),
            }
          : {}),
      },
      null,
      2
    )
  )
}

main(process.argv[2])
