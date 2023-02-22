type DefaultValues = 'inherit' | 'initial' | 'unset'

export class CSSBuilder {
	constructor(public properties: string[] = []) {}

	prop(name: string, value: unknown) {
		this.properties.push(`\t${name}: ${value};`)

		return this
	}

	group(selector: string, css: CSSBuilder) {
		this.properties.push(`${selector} {\n${css.toString()}\n}`)

		return this
	}

	custom(prop: string, value: string) {
		return this.prop(prop, value)
	}

	toString() {
		return this.properties.join('\n')
	}

	// ---------- UTILS ----------

	px_to_rem(px: number | DefaultValues) {
		return typeof px === 'number' ? `${px / 16}rem` : px
	}

	// ---------- MIXINS ----------

	fluid(prop: string, minPx: number, maxPx: number, minVw: number, maxVw: number) {
		return this.prop(prop, `fluid(${minPx}, ${maxPx}, ${minVw}, ${maxVw})`)
	}

	fluid_text(minPx: number, maxPx: number, minVw: number, maxVw: number) {
		return this.fluid('font-size', minPx, maxPx, minVw, maxVw).prop('min-height', '0vw')
	}

	// ---------- PROPERTIES ----------

	/**
	 * -webkit-line-clamp
	 *
	 * https://www.w3.org/TR/2022/WD-css-overflow-3-20221231/#propdef--webkit-line-clamp
	 **/
	webkitLineClamp(lines: number | DefaultValues) {
		return this.prop('-webkit-line-clamp', lines)
	}

	/**
	 * accent-color
	 *
	 * https://www.w3.org/TR/2021/WD-css-ui-4-20210316/#propdef-accent-color
	 **/
	accentColor(color: string | DefaultValues) {
		return this.prop('accent-color', color)
	}

	/**
	 * align-items
	 *
	 * https://www.w3.org/TR/2018/CR-css-flexbox-1-20181119/#propdef-align-items
	 **/
	alignItems(
		value:
			| 'auto'
			| 'flex-start'
			| 'flex-end'
			| 'center'
			| 'baseline'
			| 'stretch'
			| DefaultValues,
	) {
		return this.prop('align-items', value)
	}

	/**
	 * align-self
	 *
	 * https://www.w3.org/TR/2021/WD-css-align-3-20211224/#propdef-align-self
	 **/
	alignSelf(value: 'auto' | 'normal' | 'strecth' | DefaultValues) {
		return this.prop('align-self', value)
	}

	/**
	 * all
	 *
	 * https://www.w3.org/TR/2021/REC-css-cascade-3-20210211/#propdef-all
	 **/
	all(value: DefaultValues) {
		return this.prop('all', value)
	}

	/**
	 * animation
	 *
	 * https://www.w3.org/TR/2018/WD-css-animations-1-20181011/#propdef-animation
	 **/
	animation({
		name,
		duration,
		delay = '0s',
		direction = 'normal',
		fillMode = 'none',
		iterationCount = 'initial',
		playState = 'running',
		timingFunction = 'linear',
	}: {
		name: string
		duration: string
		delay?: string
		direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | DefaultValues
		fillMode?: 'none' | 'forwards' | 'backwards' | 'both' | DefaultValues
		iterationCount?: number | 'infinite' | DefaultValues
		playState?: 'running' | 'paused' | DefaultValues
		timingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | DefaultValues
	}) {
		return this.prop(
			'animation',
			`${name} ${duration} ${timingFunction} ${delay} ${iterationCount} ${direction} ${fillMode} ${playState}`,
		)
	}

	/**
	 * appearance
	 *
	 * https://www.w3.org/TR/2021/WD-css-ui-4-20210316/#propdef-appearance
	 **/
	appearance(value: 'auto' | 'none' | DefaultValues) {
		return this.prop('appearance', value)
	}

	/**
	 * aspect-ratio
	 *
	 * https://www.w3.org/TR/2021/WD-css-sizing-4-20210520/#propdef-aspect-ratio
	 **/
	aspectRatio(value: string | DefaultValues) {
		return this.prop('aspect-ratio', value)
	}

	/**
	 * background
	 *
	 * http://www.w3.org/TR/2011/REC-CSS2-20110607/colors.html#propdef-background
	 **/
	background({
		color,
		image,
		position = 'center',
		repeat = 'no-repeat',
		size = 'cover',
	}: {
		color?: string
		image?: string
		position?: 'left' | 'center' | 'right' | 'top' | 'bottom' | DefaultValues
		repeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' | DefaultValues
		size?: 'auto' | 'cover' | 'contain' | DefaultValues
	}) {
		return this.prop('background', `${color || `url(${image})`} ${position} ${repeat} ${size}`)
	}

	/**
	 * background-blend-mode
	 *
	 * https://www.w3.org/TR/2015/CR-compositing-1-20150113/#propdef-background-blend-mode
	 **/
	backgroundBlendMode(
		value:
			| 'normal'
			| 'multiply'
			| 'screen'
			| 'overlay'
			| 'darken'
			| 'lighten'
			| 'color-dodge'
			| 'color-burn'
			| 'hard-light'
			| 'soft-light'
			| 'difference'
			| 'exclusion'
			| 'hue'
			| 'saturation'
			| 'color'
			| 'luminosity'
			| DefaultValues,
	) {
		return this.prop('background-blend-mode', value)
	}

	/**
	 * background-color
	 *
	 * https://www.w3.org/TR/2018/REC-css-backgrounds-3-20180619/#propdef-background-color
	 **/
	backgroundColor(color: string | DefaultValues) {
		return this.prop('background-color', color)
	}

	/**
	 * background-image
	 *
	 * https://www.w3.org/TR/2018/REC-css-backgrounds-3-20180619/#propdef-background-image
	 **/
	backgroundImage(image: string | DefaultValues) {
		return this.prop('background-image', image)
	}

	/**
	 * background-position
	 *
	 * https://www.w3.org/TR/2011/REC-CSS2-20110607/colors.html#propdef-background-position
	 **/
	backgroundPosition(position: 'top' | 'bottom' | 'left' | 'right' | DefaultValues) {
		return this.prop('background-position', position)
	}

	/**
	 * background-repeat
	 *
	 * https://www.w3.org/TR/2011/REC-CSS2-20110607/colors.html#propdef-background-repeat
	 **/
	backgroundRepeat(repeat: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' | DefaultValues) {
		return this.prop('background-repeat', repeat)
	}

	/**
	 * background-size
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-background-size
	 **/
	backgroundSize(size: 'auto' | 'cover' | 'contain' | DefaultValues) {
		return this.prop('background-size', size)
	}

	/**
	 * border
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-border
	 **/
	border(value: string | DefaultValues) {
		return this.prop('border', value)
	}

	/**
	 * border-bottom
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-border-bottom
	 **/
	borderBottom(value: string | DefaultValues) {
		return this.prop('border-bottom', value)
	}

	/**
	 * border-color
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-border
	 **/
	borderColor(value: string | DefaultValues) {
		return this.prop('border-color', value)
	}

	/**
	 * border-left
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-border-left
	 **/
	borderLeft(value: string | DefaultValues) {
		return this.prop('border-left', value)
	}

	/**
	 * border-radius
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-border-radius
	 **/
	borderRadius(value: string | DefaultValues) {
		return this.prop('border-radius', value)
	}

	/**
	 * border-right
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-border-right
	 **/
	borderRight(value: string | DefaultValues) {
		return this.prop('border-right', value)
	}

	/**
	 * border-style
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-border-style
	 **/
	borderStyle(
		value:
			| 'none'
			| 'hidden'
			| 'dotted'
			| 'dashed'
			| 'solid'
			| 'double'
			| 'groove'
			| 'ridge'
			| 'inset'
			| 'outset'
			| DefaultValues,
	) {
		return this.prop('border-style', value)
	}

	/**
	 * border-top
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-border-top
	 **/
	borderTop(value: string | DefaultValues) {
		return this.prop('border-top', value)
	}

	/**
	 * border-width
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-border-width
	 **/
	borderWidth(value: string | DefaultValues) {
		return this.prop('border-width', value)
	}

	/**
	 * box-shadow
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-box-shadow
	 **/
	boxShadow(value: string | DefaultValues) {
		return this.prop('box-shadow', value)
	}

	/**
	 * box-sizing
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-box-sizing
	 **/
	boxSizing(value: 'content-box' | 'border-box' | DefaultValues) {
		return this.prop('box-sizing', value)
	}

	/**
	 * color
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-color
	 **/
	color(value: string | DefaultValues) {
		return this.prop('color', value)
	}

	/**
	 * content
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-content
	 **/

	content(value: string | DefaultValues) {
		return this.prop('content', value)
	}

	/**
	 * cursor
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-cursor
	 *
	 **/
	cursor(
		value:
			| 'auto'
			| 'default'
			| 'none'
			| 'context-menu'
			| 'help'
			| 'pointer'
			| 'progress'
			| 'wait'
			| 'cell'
			| 'crosshair'
			| 'text'
			| 'vertical-text'
			| 'alias'
			| 'copy'
			| 'move'
			| 'no-drop'
			| 'not-allowed'
			| 'grab'
			| 'grabbing'
			| 'all-scroll'
			| 'col-resize'
			| 'row-resize'
			| 'n-resize'
			| 'e-resize'
			| 's-resize'
			| 'w-resize'
			| 'ne-resize'
			| 'nw-resize'
			| 'se-resize'
			| 'sw-resize'
			| 'ew-resize'
			| 'ns-resize'
			| 'nesw-resize'
			| 'nwse-resize'
			| 'zoom-in'
			| 'zoom-out'
			| DefaultValues,
	) {
		return this.prop('cursor', value)
	}

	/**
	 * display
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-display
	 **/
	display(
		value:
			| 'none'
			| 'contents'
			| 'block'
			| 'flow-root'
			| 'inline'
			| 'inline-block'
			| 'run-in'
			| 'list-item'
			| 'inline'
			| 'flex'
			| 'inline-flex'
			| 'grid'
			| 'inline-grid'
			| 'ruby'
			| 'block ruby'
			| 'table'
			| 'inline-table'
			| DefaultValues,
	) {
		return this.prop('display', value)
	}

	/**
	 * fill
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-fill
	 **/
	fill(value: string | DefaultValues) {
		return this.prop('fill', value)
	}

	/**
	 * filter
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-filter
	 **/
	filter(value: string | DefaultValues) {
		return this.prop('filter', value)
	}

	/**
	 * flex
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-flex
	 **/
	flex(value: string | DefaultValues) {
		return this.prop('flex', value)
	}

	/**
	 * flex-basis
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-flex-basis
	 **/
	flexBasis(value: string | DefaultValues) {
		return this.prop('flex-basis', value)
	}

	/**
	 * flex-direction
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-flex-direction
	 **/
	flexDirection(value: 'row' | 'row-reverse' | 'column' | 'column-reverse' | DefaultValues) {
		return this.prop('flex-direction', value)
	}

	/**
	 * flex-flow
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-flex-flow
	 **/
	flexFlow(value: string | DefaultValues) {
		return this.prop('flex-flow', value)
	}

	/**
	 * flex-grow
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-flex-grow
	 **/
	flexGrow(value: string | DefaultValues) {
		return this.prop('flex-grow', value)
	}

	/**
	 * flex-shrink
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-flex-shrink
	 **/
	flexShrink(value: string | DefaultValues) {
		return this.prop('flex-shrink', value)
	}

	/**
	 * flex-wrap
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-flex-wrap
	 **/
	flexWrap(value: 'nowrap' | 'wrap' | 'wrap-reverse' | DefaultValues) {
		return this.prop('flex-wrap', value)
	}

	/**
	 * font-family
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-font-family
	 **/
	fontFamily(value: string | DefaultValues) {
		return this.prop('font-family', value)
	}

	/**
	 * font-size
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-font-size
	 **/
	fontSize(value: string | DefaultValues) {
		return this.prop('font-size', value)
	}

	/**
	 * font-weight
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-font-weight
	 **/
	fontWeight(
		value:
			| 'normal'
			| 'bold'
			| 'bolder'
			| 'lighter'
			| 100
			| 200
			| 300
			| 400
			| 500
			| 600
			| 700
			| 800
			| 900
			| DefaultValues,
	) {
		return this.prop('font-weight', value)
	}

	/**
	 * gap
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-gap
	 **/
	gap(value: string | DefaultValues) {
		return this.prop('gap', value)
	}

	/**
	 * grid-area
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-grid-area
	 **/
	gridArea(value: string | DefaultValues) {
		return this.prop('grid-area', value)
	}

	/**
	 * grid-auto-columns
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-grid-auto-columns
	 **/
	gridAutoColumns(value: string | DefaultValues) {
		return this.prop('grid-auto-columns', value)
	}

	/**
	 * grid-auto-flow
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-grid-auto-flow
	 **/
	gridAutoFlow(value: string | DefaultValues) {
		return this.prop('grid-auto-flow', value)
	}

	/**
	 * grid-auto-rows
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-grid-auto-rows
	 **/
	gridAutoRows(value: string | DefaultValues) {
		return this.prop('grid-auto-rows', value)
	}

	/**
	 * grid-column
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-grid-column
	 **/
	gridColumn(value: string | DefaultValues) {
		return this.prop('grid-column', value)
	}

	/**
	 * grid-row
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-grid-row
	 **/
	gridRow(value: string | DefaultValues) {
		return this.prop('grid-row', value)
	}

	/**
	 * grid-template-areas
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-grid-template-areas
	 **/
	gridTemplateAreas(value: string | DefaultValues) {
		return this.prop('grid-template-areas', value)
	}

	/**
	 * grid-template-columns
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-grid-template-columns
	 **/
	gridTemplateColumns(value: string | DefaultValues) {
		return this.prop('grid-template-columns', value)
	}

	/**
	 * grid-template-rows
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-grid-template-rows
	 **/
	gridTemplateRows(value: string | DefaultValues) {
		return this.prop('grid-template-rows', value)
	}

	/**
	 * height
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-height
	 **/
	height(value: string | DefaultValues) {
		return this.prop('height', value)
	}

	/**
	 * isolation
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-isolation
	 **/
	isolation(value: 'auto' | 'isolate' | DefaultValues) {
		return this.prop('isolation', value)
	}

	/**
	 * justify-content
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-justify-content
	 **/
	justifyContent(
		value:
			| 'flex-start'
			| 'flex-end'
			| 'center'
			| 'space-between'
			| 'space-around'
			| 'space-evenly'
			| 'stretch'
			| DefaultValues,
	) {
		return this.prop('justify-content', value)
	}

	/**
	 * justify-items
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-justify-items
	 **/
	justifyItems(value: 'start' | 'end' | 'center' | 'left' | 'right' | 'stretch' | DefaultValues) {
		return this.prop('justify-items', value)
	}

	/**
	 * justify-self
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-justify-self
	 **/
	justifySelf(
		value: 'auto' | 'start' | 'end' | 'center' | 'left' | 'right' | 'stretch' | DefaultValues,
	) {
		return this.prop('justify-self', value)
	}

	/**
	 * left
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-left
	 **/
	left(value: string | DefaultValues) {
		return this.prop('left', value)
	}

	/**
	 * letter-spacing
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-letter-spacing
	 **/
	letterSpacing(value: string | DefaultValues) {
		return this.prop('letter-spacing', value)
	}

	/**
	 * line-height
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-line-height
	 **/
	lineHeight(value: string | DefaultValues) {
		return this.prop('line-height', value)
	}

	/**
	 * list-style
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-list-style
	 **/
	listStyle(value: string | DefaultValues) {
		return this.prop('list-style', value)
	}

	/**
	 * margin
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-margin
	 **/
	margin(value: number | DefaultValues) {
		return this.prop('margin', this.px_to_rem(value))
	}

	/**
	 * margin-bottom
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-margin-bottom
	 **/
	marginBottom(value: number | DefaultValues) {
		return this.prop('margin-bottom', this.px_to_rem(value))
	}

	/**
	 * margin-left
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-margin-left
	 **/
	marginLeft(value: number | DefaultValues) {
		return this.prop('margin-left', this.px_to_rem(value))
	}

	/**
	 * margin-right
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-margin-right
	 **/
	marginRight(value: number | DefaultValues) {
		return this.prop('margin-right', this.px_to_rem(value))
	}

	/**
	 * margin-top
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-margin-top
	 **/
	marginTop(value: number | DefaultValues) {
		return this.prop('margin-top', this.px_to_rem(value))
	}

	/**
	 * max-height
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-max-height
	 **/
	maxHeight(value: string | DefaultValues) {
		return this.prop('max-height', value)
	}

	/**
	 * max-width
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-max-width
	 **/
	maxWidth(value: string | DefaultValues) {
		return this.prop('max-width', value)
	}

	/**
	 * min-height
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-min-height
	 **/
	minHeight(value: string | DefaultValues) {
		return this.prop('min-height', value)
	}

	/**
	 * min-width
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-min-width
	 **/
	minWidth(value: string | DefaultValues) {
		return this.prop('min-width', value)
	}

	/**
	 * mix-blend-mode
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-mix-blend-mode
	 **/
	mixBlendMode(
		value:
			| 'normal'
			| 'multiply'
			| 'screen'
			| 'overlay'
			| 'darken'
			| 'lighten'
			| 'color-dodge'
			| 'color-burn'
			| 'hard-light'
			| 'soft-light'
			| 'difference'
			| 'exclusion'
			| 'hue'
			| 'saturation'
			| 'color'
			| 'luminosity'
			| DefaultValues,
	) {
		return this.prop('mix-blend-mode', value)
	}

	/**
	 * object-fit
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-object-fit
	 **/
	objectFit(value: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | DefaultValues) {
		return this.prop('object-fit', value)
	}

	/**
	 * opacity
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-opacity
	 **/
	opacity(value: string | DefaultValues) {
		return this.prop('opacity', value)
	}

	/**
	 * order
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-order
	 **/

	order(value: string | DefaultValues) {
		return this.prop('order', value)
	}

	/**
	 * outline
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-outline
	 **/
	outline(value: string | DefaultValues) {
		return this.prop('outline', value)
	}

	/**
	 * overflow
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-overflow
	 **/
	overflow(value: 'visible' | 'hidden' | 'scroll' | 'auto' | DefaultValues) {
		return this.prop('overflow', value)
	}

	/**
	 * overflow-x
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-overflow-x
	 **/
	overflowX(value: 'visible' | 'hidden' | 'scroll' | 'auto' | DefaultValues) {
		return this.prop('overflow-x', value)
	}

	/**
	 * overflow-y
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-overflow-y
	 **/
	overflowY(value: 'visible' | 'hidden' | 'scroll' | 'auto' | DefaultValues) {
		return this.prop('overflow-y', value)
	}

	/**
	 * padding
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-padding
	 **/
	padding(value: number | DefaultValues) {
		return this.prop('padding', this.px_to_rem(value))
	}

	/**
	 * padding-bottom
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-padding-bottom
	 **/
	paddingBottom(value: number | DefaultValues) {
		return this.prop('padding-bottom', this.px_to_rem(value))
	}

	/**
	 * padding-left
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-padding-left
	 **/
	paddingLeft(value: number | DefaultValues) {
		return this.prop('padding-left', this.px_to_rem(value))
	}

	/**
	 * padding-right
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-padding-right
	 **/

	paddingRight(value: number | DefaultValues) {
		return this.prop('padding-right', this.px_to_rem(value))
	}

	/**
	 * padding-top
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-padding-top
	 **/
	paddingTop(value: number | DefaultValues) {
		return this.prop('padding-top', this.px_to_rem(value))
	}

	/**
	 * place-content
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-place-content
	 **/
	placeContent(
		value:
			| 'center'
			| 'start'
			| 'end'
			| 'flex-start'
			| 'flex-end'
			| 'left'
			| 'right'
			| 'normal'
			| 'baseline'
			| 'space-between'
			| 'space-around'
			| 'space-evenly'
			| 'stretch'
			| DefaultValues,
	) {
		return this.prop('place-content', value)
	}

	/**
	 * place-items
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-place-items
	 **/
	placeItems(
		value:
			| 'center'
			| 'start'
			| 'end'
			| 'flex-start'
			| 'flex-end'
			| 'left'
			| 'right'
			| 'normal'
			| 'baseline'
			| 'space-between'
			| 'space-around'
			| 'space-evenly'
			| 'stretch'
			| DefaultValues,
	) {
		return this.prop('place-items', value)
	}

	/**
	 * place-self
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-place-self
	 **/
	placeSelf(
		value:
			| 'center'
			| 'start'
			| 'end'
			| 'flex-start'
			| 'flex-end'
			| 'left'
			| 'right'
			| 'normal'
			| 'baseline'
			| 'space-between'
			| 'space-around'
			| 'space-evenly'
			| 'stretch'
			| DefaultValues,
	) {
		return this.prop('place-self', value)
	}

	/**
	 * pointer-events
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-pointer-events
	 **/
	pointerEvents(value: 'auto' | 'none' | DefaultValues) {
		return this.prop('pointer-events', value)
	}

	/**
	 * position
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-position
	 **/
	position(value: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky' | DefaultValues) {
		return this.prop('position', value)
	}

	/**
	 * resize
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-resize
	 **/
	resize(
		value: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline' | DefaultValues,
	) {
		return this.prop('resize', value)
	}

	/**
	 * right
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-right
	 **/
	right(value: string | DefaultValues) {
		return this.prop('right', value)
	}

	/**
	 * scroll-behavior
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-scroll-behavior
	 **/
	scrollBehavior(value: 'auto' | 'smooth' | DefaultValues) {
		return this.prop('scroll-behavior', value)
	}

	/**
	 * texte-align
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-text-align
	 **/
	textAlign(value: 'left' | 'right' | 'center' | 'justify' | 'justify-all' | DefaultValues) {
		return this.prop('text-align', value)
	}

	/**
	 * text-decoration
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-text-decoration
	 **/
	textDecoration(value: 'none' | 'underline' | 'overline' | 'line-through' | DefaultValues) {
		return this.prop('text-decoration', value)
	}

	/**
	 * top
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-top
	 **/
	top(value: string | DefaultValues) {
		return this.prop('top', value)
	}

	/**
	 * transform
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-transform
	 **/
	transform(value: string | DefaultValues) {
		return this.prop('transform', value)
	}

	/**
	 * transition
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-transition
	 **/
	transition(value: string | DefaultValues) {
		return this.prop('transition', value)
	}

	/**
	 * visibility
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-visibility
	 **/
	visibility(value: 'visible' | 'hidden' | 'collapse' | DefaultValues) {
		return this.prop('visibility', value)
	}

	/**
	 * white-space
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-white-space
	 **/
	whiteSpace(value: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | DefaultValues) {
		return this.prop('white-space', value)
	}

	/**
	 * width
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-width
	 **/
	width(value: string | DefaultValues) {
		return this.prop('width', value)
	}

	/**
	 * word-break
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-word-break
	 **/
	wordBreak(value: 'normal' | 'break-all' | 'keep-all' | 'break-word' | DefaultValues) {
		return this.prop('word-break', value)
	}

	/**
	 * z-index
	 *
	 * https://www.w3.org/TR/2023/CRD-css-backgrounds-3-20230214/#propdef-z-index
	 **/
	zIndex(value: string | DefaultValues) {
		return this.prop('z-index', value)
	}
}

export function CSS() {
	return new CSSBuilder()
}
