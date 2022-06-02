import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import {tab_bg_color,bg_color, tab_default_text_clolor , tab_active_bg_color, tab_active_light_color} from '@/styles/theme'
const Tabs = styled.div`
    position:${props => props.Fixed ? 'Fixed' : 'relative'};
    width: ${props => props.width ? props.width : '100%'};
    padding: 10px 15px;
    background: ${bg_color};
    border: none;
    box-sizing: border-box;
    z-index: ${props => props.Fixed ? 999 : 0};
    top: 0;
	.tabs-header{
		position: relative;
		width: 100%;
		display: flex;
		/* padding: 1px; */
    height: 30px;
		background: ${tab_bg_color};
		border: 1px solid ${tab_bg_color};
		/* box-sizing: border-box; */
		align-items: center;
		border-radius: 16px;
		overflow: hidden;
	}
	.tabs-active{
		position: absolute;
		height: 28px;
		top: 1px;
		left: 1px;
		background:  ${tab_active_bg_color};
		border-radius: 15px;
		transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
                width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
                left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
                -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	}
	.tabs-header-content{
		position: absolute;
		width: 100%;
		padding: 2px;
		box-sizing: border-box;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
	}
`
const TabItem = styled.li`
	 width: ${props => props.width};
	 height: 28px;
	 z-index: 12;
	 line-height: 28px;
	 text-align: center;
	 font-size: 14px;
   color: ${tab_default_text_clolor};
	 &.tab-active{
		color: ${tab_active_light_color};
    border-radius: 50px;
    font-weight: 500;
		transform: translateX(0);
	 }
`
export default (({ initialPage = '1', width = "150px", tabs = [], onTabClick, Fixed = false }) => {
	const [current, setcurrent] = useState('1')
	const tabItem = useRef()
	const tabActive = useRef()
	const clickevent = (item, index) => {
		onTabClick && onTabClick(item)
		let width = tabActive.current.getBoundingClientRect().width
		tabActive.current.style.transform = 'translateX(' + width * index + 'px)'
		setcurrent(item.key)
	}
	const initTab = () => {
		setcurrent(initialPage)
		// if (type === '1') {
		// 	setTabstyle(tab_styles)
		// 	setactive_styles(active_styles)
		// } else {
		// 	setTabstyle(tab_style)
		// 	setTabstyle(active_style)
		// }
		tabActive.current.style.width = 100/tabs.length + '%'
		// tabActive.current.style.background = type === '1'? active_styles.background: active_style.background
		// tabActive.current.style['border-radius'] = type === '1'? active_styles['border-radius']: active_style['border-radius']
	}
	useEffect(() => {
		initTab()
	}, [])
	return (
		<Tabs Fixed={Fixed} width={width}>
			<ul className={'tabs-header'} >
				<div className="tabs-header-content">
				<div ref={tabActive} class="tabs-active" ></div>
					{tabs.map((item, i) =>
						<TabItem onClick={() => clickevent(item, i)} key={item.key} className={current === item.key ? 'tab-active' : ''} ref={tabItem} width={`${100 / tabs.length}%` } >
							<span className="tabs__link__text" >
								{item.title}
							</span>
						</TabItem>
					)}
					</div>
			</ul>
		</Tabs>
	)
})
