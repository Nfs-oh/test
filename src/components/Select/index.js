import React, { Component } from 'react'
import  { Select, Text } from './style'

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
    const { disable } = this.props;
    if (disable) {
      return;
    }
    let showList = this.state.showList;
    this.setState({showList:!showList});
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
    this.setState({active: data})
    this.setState({text: data})
    onChange && onChange(data, index) // 返回给父组件
    this.setState({showList:false})
  }
  render () {
    const { data, initText, icon, className } = this.props
    let  {showList, active, text} = this.state
    active = active? active : initText
    text = text? text : initText
    return (
      <Select ref={this.toggleContainer} className={className || ''}>
       {data.length> 0 && <div className={"container"}>
         <Text onClick={()=>this.onClickTitle()} className={'text'} icon={icon}>{text}</Text>
          {showList &&  <ul className={'list'} >
          {data.map((item, index)=><li key={index} className={active === item ? `se-active`: ''} onClick={()=>this.onChange(item, index)}>{item}</li>)}
        </ul>}</div>}
      </Select>
    )
  }
}

export default DateSelect