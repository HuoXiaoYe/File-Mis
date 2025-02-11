import React from 'react'
import {Table, Row, Col, Slider, InputNumber, Tag, Modal, Form, Radio} from 'antd'
import {getRenderTree} from '../transTree'
const RadioGroup = Radio.Group
function LimitForm ({limit, index, record, defaultMode, changeDefaultMode, changeCurrentLimit}) {
  return (
    <Form>
      {
        record.type === 'folder' ? <Form.Item label="Default Limit Mode">
          <RadioGroup onChange={(e) => {changeDefaultMode(e.target.value)}} value={defaultMode}>
            <Radio value={true}>Open</Radio>
            <Radio value={false}>Close</Radio>
          </RadioGroup>
        </Form.Item> : ''
      }
      <Form.Item label="Limit percent">
        <Row>
          <Col span={12}>
            <Slider
              min={0}
              max={1}
              onChange={changeCurrentLimit}
              value={typeof limit === 'number' ? limit : 0}
              step={0.01}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={0}
              max={1}
              style={{ marginLeft: 16 }}
              step={0.01}
              value={limit}
              onChange={changeCurrentLimit}
            />
          </Col>
        </Row>
      </Form.Item>
    </Form>
  )
}
function AuthFileList (props) {
  const {
    authFileList,
    showLimitForm,
    openRow,
    confirmRow,
    closeRow,
    currentRow,
    // changeLimit,
    changeCurrentLimit,
    currentRowLimit,
    defaultMode,
    changeDefaultMode
  } = props
  const {renderTree} = getRenderTree(authFileList)
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Register Date',
      dataIndex: 'createDate',
      key: 'createDate'
    },
    {
      title: 'Limit',
      key: 'limit',
      render: (text, record, index) => {
        if (record.limit === null) {
          return (<Tag onClick={() => {
              openRow(record, index)
            }} color="blue">unset</Tag>)
        }
        let color = record.limit > 0 ? 'green' : 'red'
        return (<Tag onClick={() => {
          openRow(record, index)
        }}
          color={color} key={record.id}>{record.limit.toFixed(2)}</Tag>)
      }
    }
  ]
  return (
    <div>
      <Table 
      // scroll={{ y: 240 }} 
      rowKey={(record) => record.id}
      dataSource={renderTree.children} 
      columns={columns}
      pagination={{ pageSize: 10 }} />
      <Modal
        title="Set File auth time for current user."
        onOk={confirmRow}
        onCancel={closeRow}
        visible={showLimitForm}>
          <LimitForm
            limit={currentRowLimit}
            record={currentRow}
            defaultMode={defaultMode}
            changeDefaultMode={changeDefaultMode}
            changeCurrentLimit={changeCurrentLimit} />
      </Modal>
    </div>
  )
}

export default AuthFileList
