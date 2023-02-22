import { path } from '../deps.ts'
import { CSSBuilder } from './css.ts'

type JsonComponent = {
	blocks?: string[]
	children?: string[]
	props?: Record<string, unknown>
	title?: string
}

export type DefaultParams = {
	title: string
	id?: string
	style?: Record<string, CSSBuilder>
	vendor?: string
}

export type TBaseComponent = BaseComponent<DefaultParams>

export class Builder {
	OUTPUT: Record<string, unknown> = {}
	IDS = new Set<string>()

	constructor(public component: TBaseComponent, public file: string) {}

	set_file_recursive(components: TBaseComponent[]) {
		for (const component of components) {
			component.file = this.file
			this.set_file_recursive(component.children)
		}
	}

	generate_styles(component: TBaseComponent) {
		if (component.params.style && !component.STYLE_FILENAME) {
			throw new Error(
				`Component ${component.constructor.name} must have a STYLE_FILENAME property to generate styles`,
			)
		}

		// Id do componente sem a parte antes do # porque essa parte não é usada no .scss
		const formated_id = component.format_id(this.IDS).split('#')[1]

		const filename = component.params.vendor
			? `${component.params.vendor}.${component.STYLE_FILENAME}.scss`
			: `${component.STYLE_FILENAME}.scss`

		for (const [name, css] of Object.entries(component.params.style || {})) {
			const selector = `.${name}--${formated_id}`
			let data = `${selector} {\n${css.toString()}\n}`

			// Path do arquivo .scss
			const file = path.join('out', path.dirname(this.file), 'styles', filename)

			try {
				// Se o arquivo já existir, adiciona o novo estilo no final do arquivo
				const file_data = Deno.readTextFileSync(file)

				// Não adiciona o estilo se ele já existir
				if (file_data.includes(selector)) {
					data = file_data
				} else {
					data = `${file_data}\n\n${data}`
				}
			} catch {
				// Senão cria o arquivo vazio
				Deno.createSync(file)
			}

			// Escreve o arquivo
			Deno.writeTextFileSync(file, data)
		}

		// Gera os estilos dos filhos
		for (const child of component.children) {
			this.generate_styles(child)
		}
	}

	generate_component(_component: TBaseComponent) {
		// Executa a função transform
		_component.params = _component.transform(_component.params)

		// Gera o id do componente
		const formated_id = _component.format_id(this.IDS)

		// Gera o json do componente
		const component = {
			[formated_id]: {} as JsonComponent,
		}

		// Define o título do componente
		if (_component.params.title) {
			component[formated_id].title = _component.params.title
		}

		if (_component.HAVE_CHILDREN) {
			// Gera os ids dos filhos
			const children = _component.children.map(c => c.format_id(this.IDS))

			// Define as propriedades do componente
			if (_component.HAS_ONLY_BLOCKS) {
				component[formated_id].blocks = children
			} else {
				component[formated_id].children = children
			}
		}

		// Define as propriedades do componente
		if (!_component.HAS_ONLY_BLOCKS) {
			component[formated_id].props = {
				blockClass: formated_id,
			}

			// Parâmetros que podemos receber mas não queremos passar para o json
			const INGORED_PARAMS = ['title', 'id', 'style']

			// Passa os parâmetros para o json
			Object.entries(_component.params).forEach(([key, value]) => {
				if (value !== undefined && !INGORED_PARAMS.includes(key)) {
					component[formated_id].props![key] = value
				}
			})
		}

		// Se o componente não existir, adiciona ao output
		if (!Object.prototype.hasOwnProperty.call(this.OUTPUT, formated_id)) {
			this.OUTPUT = {
				...this.OUTPUT,
				...component,
			}
		}

		// Gera os filhos
		for (const child of _component.children) {
			this.generate_component(child)
		}

		// Gera os estilos
		if (_component.params.style) {
			Deno.mkdirSync(path.join('out', path.dirname(this.file), 'styles'), { recursive: true })

			this.generate_styles(_component)
		}
	}

	build() {
		// Define o arquivo onde o componente está para todos os filhos
		this.set_file_recursive([this.component])

		// Gera o componente
		this.generate_component(this.component)

		const json = JSON.stringify(this.OUTPUT, null, 4)

		const filename = this.file.replace(/\.ts$/, '.jsonc')

		Deno.mkdirSync(path.join('out', path.dirname(filename)), { recursive: true })
		Deno.writeTextFileSync(path.join('out', filename), json)
	}
}

class BaseComponent<T extends DefaultParams> {
	PARAMS: T = {} as T
	NAME = ''
	HAS_ONLY_BLOCKS = false
	HAVE_CHILDREN = true
	ACRONYM = ''
	STYLE_FILENAME = ''

	params: T
	children: TBaseComponent[]
	blocks: TBaseComponent[] = []
	id = ''
	file = ''

	constructor(params: T, ...children: TBaseComponent[]) {
		this.params = { ...this.PARAMS, ...params }
		this.children = children
	}
	format_id(output: Set<string>) {
		if (this.id) {
			return this.id
		}
		const path = this.file.replace(/\\/g, '/').split('/').slice(1, -1).slice(-3).join('__')
		const id = this.params.id ? `__${this.params.id}` : ''

		const gen_id = (n: number) => `${this.NAME}#${path}${id}-${n}`

		let n = 1

		while (output.has(gen_id(n))) {
			n++
		}

		this.id = `${this.NAME}#${path}${id}-${n}`
		output.add(this.id)

		return this.id
	}

	transform(params: T) {
		return params
	}
}

export { BaseComponent }
