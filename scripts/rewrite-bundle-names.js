const fs = require('fs')
const path = require('path')

function main(packageJsonPath) {
  const fullPackageJsonPath = path.join(process.cwd(), packageJsonPath)

  const content = fs.readFileSync(fullPackageJsonPath)
  const json = JSON.parse(content)

  fs.writeFileSync(
    fullPackageJsonPath,
    JSON.stringify(
      {
        ...json,
        main: json.main
          ?.replace('.tsx', '')
          .replace('.ts', '')
          .replace('./src/', './'),
        module: json.module
          ?.replace('.tsx', '')
          .replace('.ts', '')
          .replace('./src/', './'),
      },
      null,
      2
    )
  )
}

main(process.argv[2])
