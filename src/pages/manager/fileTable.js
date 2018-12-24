import React, {Component} from 'react'
import { Table, Divider, Button } from 'antd'
function columnWrapper (self) {
  return [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'createDate',
      dataIndex: 'createDate',
      key: 'createDate'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => {self.editCol(record)}}>Edit</a>
          <Divider type="vertical" />
          <a onClick={() => {self.deleteFile(record)}}>Delete</a>
        </span>
      )
    }
  ]
}
class FileTable extends Component {
  editCol = (record) => {
    let index = this.props.dataSource.indexOf(record)
    this.props.dispatch({
      type: 'manager/getFile',
      payload: {
        fileId: record.id
      }
    })
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentWindow: 'fileInfo',
        currentFile: index
      }
    })
  }
  deleteFile = (record) => {
    this.props.dispatch({
      type: 'manager/deleteFile',
      payload: {
        id: record.id
      }
    })
  }
  addFile = () => {
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentWindow: 'upload',
        currentFile: -1
      }
    })
  }
  render () {
    const {dataSource} = this.props
    return (
      <div>
        <Button type="primary" icon="upload" onClick={this.addFile}>Upload</Button>
        <Table style={{marginTop: '1rem'}} columns={columnWrapper(this)} dataSource={dataSource} rowKey={(record) => record.id} />
      </div>
    )
  }
}

export default FileTable
