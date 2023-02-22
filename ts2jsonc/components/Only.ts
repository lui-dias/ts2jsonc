import { BaseComponent, DefaultParams, TBaseComponent } from '../index.ts'

class _OnlyDesktop extends BaseComponent<DefaultParams> {
	NAME = 'responsive-layout.desktop'
}

class _OnlyTablet extends BaseComponent<DefaultParams> {
	NAME = 'responsive-layout.tablet'
}

class _OnlyPhone extends BaseComponent<DefaultParams> {
	NAME = 'responsive-layout.phone'
}

class _OnlyMobile extends BaseComponent<DefaultParams> {
	NAME = 'responsive-layout.mobile'
}

export const OnlyDesktop = (params: DefaultParams, ...children: TBaseComponent[]) => {
	return new _OnlyDesktop(params, ...children)
}

export const OnlyTablet = (params: DefaultParams, ...children: TBaseComponent[]) => {
	return new _OnlyTablet(params, ...children)
}

export const OnlyPhone = (params: DefaultParams, ...children: TBaseComponent[]) => {
	return new _OnlyPhone(params, ...children)
}

export const OnlyMobile = (params: DefaultParams, ...children: TBaseComponent[]) => {
	return new _OnlyMobile(params, ...children)
}
