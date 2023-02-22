import { BaseComponent, DefaultParams } from '../index.ts'

type Params = DefaultParams & {
	alt: string
	link: {
		url: string
		newTab: boolean
		attributeNofollow: boolean
	}
	src: string
}

class _Image extends BaseComponent<Params> {
	NAME = 'image'
	STYLE_FILENAME = 'store-components'
	HAVE_CHILDREN = false
}

export const Image = (params: Params) => {
	return new _Image(params)
}
