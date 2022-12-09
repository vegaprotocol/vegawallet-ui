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
        version: json.version
          .split('.')
          .reduce((acc, v, i, arr) => {
            if (i === arr.length - 1) {
              acc.push(parseInt(v) + 1)
              return acc
            }
            acc.push(v)
            return acc
          }, [])
          .join('.'),
      },
      null,
      2
    )
  )
}

main(process.argv[2])
