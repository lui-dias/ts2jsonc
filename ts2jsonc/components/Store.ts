import { BaseComponent, DefaultParams, TBaseComponent } from '../index.ts'

class _StoreHome extends BaseComponent<DefaultParams> {
	NAME = 'store.home'
	ACRONYM = 'SH'
	HAS_ONLY_BLOCKS = true
}

class _StoreCustom extends BaseComponent<DefaultParams> {
	NAME = 'store.custom'
	ACRONYM = 'SC'
	HAS_ONLY_BLOCKS = true
}

export const StoreHome = (params: DefaultParams, ...children: TBaseComponent[]) => {
	return new _StoreHome(params, ...children)
}

export const StoreCustom = (params: DefaultParams, ...children: TBaseComponent[]) => {
	return new _StoreCustom(params, ...children)
}
