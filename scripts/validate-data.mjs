import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { validateRouteData } from '../src/utils/validateRouteData.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const stopsData = JSON.parse(
  readFileSync(join(root, 'src', 'data', 'stops.json'), 'utf8'),
)
const routesData = JSON.parse(
  readFileSync(join(root, 'src', 'data', 'routes.json'), 'utf8'),
)

const result = validateRouteData({ stopsData, routesData })

if (!result.valid) {
  console.error(`Route data validation failed with ${result.errors.length} issue(s):`)
  result.errors.forEach((error, index) => {
    console.error(`${index + 1}. ${error}`)
  })
  process.exit(1)
}

console.log(
  `Route data validation passed: ${stopsData.stops.length} stops and ${routesData.routes.length} routes.`,
)
