import { BaseComponent, DefaultParams, TBaseComponent } from '../index.ts'

type Params = DefaultParams & {
	wrapper?: boolean
}

class _Container extends BaseComponent<Params> {
	NAME = 'container'
	STYLE_FILENAME = 'container'
}

export const Container = (params: Params, ...children: TBaseComponent[]) => {
	return new _Container(params, ...children)
}
