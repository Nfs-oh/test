import React, { Component } from 'react'

import { Accordion } from 'antd-mobile'
import { List } from './style'
class ListItem extends Component {
	render() {
		const { content, title, onChange } = this.props
		return (
			<List>
				<Accordion onChange={onChange}>
					<Accordion.Panel header={title} > {content}</Accordion.Panel>
				</Accordion>
			</List>
		)
	}
}


export default ListItem