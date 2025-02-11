import React, {Component} from 'react'
import { Menu, Icon } from 'antd'
class MainMenu extends Component {
  changeWindow = (wName) => {
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentWindow: wName
      }
    })
  }
  render () {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" onClick={() => {this.changeWindow('home')}}>
          <Icon type="appstore" />
          <span>Home Page</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={() => {this.changeWindow('fileList')}}>
          <Icon type="folder-open" />
          <span>Resource Center</span>
        </Menu.Item>
        <Menu.Item key="3" onClick={() => {this.changeWindow('userList')}}>
          <Icon type="user" />
          <span>User Center</span>
        </Menu.Item>
      </Menu>
    )
  }
}

export default MainMenu
