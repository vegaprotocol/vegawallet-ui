const path = require('path')
const { writeFile, move, stat } = require('fs-extra')

const moveIfExists = async (filePath, targetPath) => {
  try {
    const info = await stat(filePath)

    if (info.isFile()) {
      await move(filePath, targetPath)
    }
  } catch (err) {}
}

const getPackageJson = (lib) => {
  if (!lib) {
    throw new Error('No project folder provided.')
  }

  try {
    return require(path.join(process.cwd(), lib, 'package.json'))
  } catch (err) {
    throw new Error(`Couldn't import package json content from ${lib}.`)
  }
}

async function main(lib) {
  const { peerDependencies, ...packageJson } = getPackageJson(lib)
  const results = await Promise.allSettled([
    move(
      path.join(process.cwd(), lib, 'index.js'),
      path.join(process.cwd(), lib, 'src', 'index.js')
    ),
    moveIfExists(
      path.join(process.cwd(), lib, 'index.css'),
      path.join(process.cwd(), lib, 'src', 'index.css')
    ),
    writeFile(
      path.join(process.cwd(), lib, 'package.json'),
      JSON.stringify(
        {
          ...packageJson,
          main: `./src/${packageJson.main.replace('./', '')}`,
          types: `./src/${packageJson.types.replace('./', '')}`,
          module: `./src/${packageJson.module.replace('./', '')}`,
          dependencies: peerDependencies,
        },
        null,
        2
      )
    ),
  ])
  const message = results.reduce((acc, r) => {
    if (r.status === 'rejected') {
      console.log(r)
      return acc + r.reason
    }
    return acc
  }, '')

  if (message) {
    throw new Error(message)
  }
}

main(process.argv[2])
