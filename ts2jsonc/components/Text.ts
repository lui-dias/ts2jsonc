import { BaseComponent, DefaultParams } from '../index.ts'

type Params = DefaultParams & {
	text: string
}

class _Text extends BaseComponent<Params> {
	NAME = 'rich-text'
	ACRONYM = 'TXT'
	HAVE_CHILDREN = false
	STYLE_FILENAME = 'rich-text'
}

export function Text(params: Params) {
	return new _Text(params)
}
