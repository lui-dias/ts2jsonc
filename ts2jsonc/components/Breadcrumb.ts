import { BaseComponent, DefaultParams } from '../index.ts'

type NavigationItem = {
	name: string
	href: string
}

type Params = DefaultParams & {
	categories?: string[]
	homeLinkText?: string
	categoryText?: NavigationItem[]
	breadcrumb?: NavigationItem[]
	homeIconSize?: number
	caretIconSize?: number
	showOnMobile?: boolean
	homeType?: 'icon' | 'text'
	term?: string
}

class _Breadcrumb extends BaseComponent<Params> {
	NAME = 'breadcrumb'
	ACRONYM = 'BRC'
	STYLE_FILENAME = 'breadcrumb'
	HAVE_CHILDREN = false
}

export const Breadcrumb = (params: Params) => {
	return new _Breadcrumb(params)
}
