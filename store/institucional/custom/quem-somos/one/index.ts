import { Container } from '../../../../../ts2jsonc/components/Container.ts'
import { Image } from '../../../../../ts2jsonc/components/Image.ts'
import { Text } from '../../../../../ts2jsonc/components/Text.ts'
import { OnlyDesktop } from '../../../../../ts2jsonc/components/Only.ts'
import { StoreCustom } from '../../../../../ts2jsonc/components/Store.ts'
import { CSS } from '../../../../../ts2jsonc/css.ts'

export default StoreCustom(
	{
		title: 'Quem somos 123',
	},
	OnlyDesktop(
		{
			title: '',
		},
		Container(
			{
				title: 'Quem somos',
				style: {
					container: CSS().backgroundColor('blue').padding(10),
				},
			},
			Image({
				title: 'Imagem de teste',
				src: 'https://via.placeholder.com/150',
				alt: 'Imagem de teste',
				link: {
					url: 'https://google.com',
					newTab: true,
					attributeNofollow: true,
				},
			}),
			Text({
				title: 'Texto de teste',
				text: 'Texto de teste',
			}),
			Container(
				{
					title: 'Quem somos',
					style: {
						container: CSS().backgroundColor('blue').padding(10),
					},
				},
				Image({
					title: 'Imagem de teste',
					src: 'https://via.placeholder.com/150',
					alt: 'Imagem de teste',
					link: {
						url: 'https://google.com',
						newTab: true,
						attributeNofollow: true,
					},
				}),
				Text({
					title: 'Texto de teste',
					text: 'Texto de teste',
				}),
			),
		),
	),
)
