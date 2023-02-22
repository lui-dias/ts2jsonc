import { fs, path, colors } from '../deps.ts'
import { Builder } from './index.ts'

/**
 * Formata um tempo em milisegundos ou segundos
 */
function formatTime(time: number) {
	const unit = time < 1000 ? 'ms' : 's'
	return `${(time / (unit === 'ms' ? 1 : 1000)).toFixed(unit === 'ms' ? 0 : 2)}${unit}`
}

const start = performance.now()
const componentFiles = []

for await (const i of fs.walk('store', { exts: ['.ts'] })) {
	if (i.isFile && i.name.endsWith('.ts')) {
		componentFiles.push(i.path)
	}
}

const modules = await Promise.all(
	componentFiles.map(async file => ({
		file,
		module: await import(`file:///${path.join(Deno.cwd(), file)}`),
	})),
)

const outDir = 'out'
try {
	Deno.removeSync(outDir, { recursive: true })
} catch (_e) {
	// ignore
}
Deno.mkdirSync(outDir)

for (const module of modules) {
	new Builder(module.module.default, module.file).build()
}

console.log(
	`${colors.green('✔')} ${colors.bold(componentFiles.length.toString())} ${colors.cyan(
		componentFiles.length === 1 ? 'component built in' : 'components built in',
	)} ${colors.bold(colors.green(formatTime(performance.now() - start)))}`,
)
