const path = require('path')
const { readFile, writeFile } = require('fs-extra')

async function main(filePath) {
  const fullFilePath = path.join(process.cwd(), filePath)
  const content = await readFile(fullFilePath)
  const json = JSON.parse(content.toString())
  await writeFile(
    fullFilePath,
    JSON.stringify(
      {
        ...json,
        module: json.main,
      },
      null,
      2
    )
  )
}

main(process.argv[2])
