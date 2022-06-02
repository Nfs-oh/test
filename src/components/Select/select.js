import React, { Component } from 'react'
import  { Select } from './style'

class DateSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showList: false,
      active: null,
      text: null
    }
    this.toggleContainer = React.createRef()
  }
  onClickTitle = () => {
    let showList = this.state.showList
    this.setState({showList:!showList})
  }
  componentDidMount() {
    window.addEventListener("click", this.onClickOutsideHandler);
  }
  onClickOutsideHandler = event => {
    if (this.state.showList &&!this.toggleContainer.current.contains(event.target)) {
      this.setState({ showList: false });
    }
  };
  componentWillUnmount() {
    window.removeEventListener("click", this.onClickOutsideHandler);
  }
  onChange = (data, index) =>{
    const {onChange} =this.props
    this.setState({active: data.key})
    this.setState({text: data.title})
    onChange && onChange(data, index) // 返回给父组件
    this.setState({showList:false})
  }
  render () {
    const { data, initText, initKey} = this.props
    let  {showList, active, text} = this.state
    active =active ? active : initKey
    text = text? text : initText
    return (
      <Select ref={this.toggleContainer} width={'80px'}>
       {data.length> 0 && <div className={"container"}>
         <span onClick={()=>this.onClickTitle()} className={'text'}>{text}</span>
          {showList &&  <ul className={'list'} >
          {data.map((item, index)=><li key={index} className={active === item.key ? `se-active`: ''} onClick={()=>this.onChange(item, index)}>{item.title}</li>)}
        </ul>}</div>}
      </Select>
    )
  }
}

export default DateSelect