import React, { useState } from 'react'
import './App.css'
import 'animate.css'

import { Card, Form, Select, InputNumber, Button, ConfigProvider, theme, Tooltip, message } from 'antd'
import { BiCopy, BiDownload } from 'react-icons/bi';
import { faker } from '@faker-js/faker';

const generators = {
  users: () => ({
    id: faker.string.uuid(),
    fullname: `${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email(),
    mobile: faker.phone.number({ style: 'international' }),
    gender: faker.person.gender(),
    address: faker.location.streetAddress({ useFullAddress: true }),
  }),
  products: () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    category: faker.commerce.department(),
    price: Number(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    inStock: faker.datatype.boolean(),
  }),
  payments: () => ({
    id: faker.string.uuid(),
    amount: Number(faker.finance.amount()),
    currency: faker.finance.currencyCode(),
    method: faker.helpers.arrayElement(['card', 'paypal', 'bank_transfer', 'crypto']),
    status: faker.helpers.arrayElement(['pending', 'completed', 'failed', 'refunded']),
    transactionDate: faker.date.recent().toISOString(),
  }),
  employees: () => ({
    id: faker.string.uuid(),
    fullname: `${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email(),
    jobTitle: faker.person.jobTitle(),
    department: faker.commerce.department(),
    salary: faker.number.int({ min: 30000, max: 150000 }),
    hiredAt: faker.date.past({ years: 10 }).toISOString(),
  }),
}

function App() {
  const [dataset, setDataset] = useState(undefined)
  const [count, setCount] = useState(25)
  const [output, setOutput] = useState(null)
  const [messageApi, contextHolder] = message.useMessage()

  const handleGenerate = () => {
    if (!dataset) {
      messageApi.warning('Pick a dataset first')
      return
    }
    if (!count || count < 1) {
      messageApi.warning('Enter how many records you need')
      return
    }
    const generate = generators[dataset]
    const records = Array.from({ length: count }, () => generate())
    setOutput(records)
  }

  const onCopy = () => {
    if (!output) {
      messageApi.warning('Nothing to copy yet, generate some data first')
      return
    }
    navigator.clipboard.writeText(JSON.stringify(output, null, 2))
      .then(() => messageApi.success('Copied to clipboard'))
      .catch(() => messageApi.error('Could not copy'))
  }

  const onDownload = () => {
    if (!output) {
      messageApi.warning('Nothing to download yet, generate some data first')
      return
    }
    const blob = new Blob([JSON.stringify(output, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${dataset}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#F5A623',
          borderRadius: 8,
          fontFamily: "'JetBrains Mono', monospace",
        },
      }}
    >
      {contextHolder}
      <div className='jg-bg min-h-screen flex justify-center px-4 py-16 md:py-24'>
        <div className='w-full max-w-3xl mx-auto'>

          {/* Hero */}
          <div className='text-center space-y-4 mb-10 animate__animated animate__fadeInDown'>
            <div className='inline-flex items-center gap-2 jg-mono text-xs text-slate-500 border border-slate-700/60 rounded-full px-3 py-1'>
              <span className='w-1.5 h-1.5 rounded-full bg-teal-400'></span>
              schema → mock data, instantly
            </div>
            <h1 className='jg-display text-4xl md:text-5xl font-bold text-slate-100'>
              <span className='jg-brace'>{'{'}</span> JSON Generator <span className='jg-brace'>{'}'}</span>
              <span className='jg-cursor'></span>
            </h1>
            <p className='jg-body text-slate-400 max-w-xl mx-auto leading-relaxed'>
              Pick a dataset, tell it how many records you need, and get clean,
              ready-to-use JSON — no writing fixtures by hand.
            </p>
          </div>

          {/* "Editor window" card */}
          <div className='jg-window rounded-xl overflow-hidden animate__animated animate__fadeInUp'>
            {/* Title bar */}
            <div className='jg-titlebar flex items-center gap-2 px-4 py-3'>
              <span className='jg-dot' style={{ background: '#FF5F57' }}></span>
              <span className='jg-dot' style={{ background: '#FEBC2E' }}></span>
              <span className='jg-dot' style={{ background: '#28C840' }}></span>
              <span className='jg-tab jg-mono text-xs rounded-t px-3 py-1 ml-4'>
                generate.json
              </span>
            </div>

            {/* Body */}
            <div className='p-6 md:p-8'>
              <Form layout='vertical' className='flex flex-col md:flex-row md:items-end gap-4'>
                <Form.Item
                  className='jg-field flex-1 mb-0'
                  label={<span className='jg-label'>dataset</span>}
                >
                  <Select
                    size='large'
                    placeholder='Choose a dataset'
                    value={dataset}
                    onChange={(value) => setDataset(value)}
                  >
                    <Select.Option value='users'>Users</Select.Option>
                    <Select.Option value='products'>Products</Select.Option>
                    <Select.Option value='payments'>Payments</Select.Option>
                    <Select.Option value='employees'>Employees</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  className='jg-field flex-1 mb-0'
                  label={<span className='jg-label'>records</span>}
                >
                  <InputNumber
                    size='large'
                    min={1}
                    max={1000}
                    placeholder='e.g.25'
                    className='w-full'
                    value={count}
                    onChange={(value) => setCount(value)}
                  />
                </Form.Item>

                <Form.Item className='mb-0'>
                  <Button
                    size='large'
                    type='primary'
                    className='jg-mono font-medium px-6'
                    onClick={handleGenerate}
                  >
                    Generate →
                  </Button>
                </Form.Item>
              </Form>

              {output && (
                <div className='jg-output mt-6 rounded-lg border border-slate-800 bg-black/30'>
                  <pre className='jg-mono text-xs text-slate-300 p-4 max-h-80 overflow-auto whitespace-pre-wrap'>
                    {JSON.stringify(output, null, 2)}
                  </pre>
                </div>
              )}

              <div className='jg-mono flex justify-between items-center text-xs text-slate-600 mt-6 pt-4 border-t border-slate-800'>
                <div>
                  {output ? (
                    <span>
                      <span className='jg-key'>"output"</span>: {output.length} record{output.length !== 1 ? 's' : ''} ready to copy or download
                    </span>
                  ) : (
                    <span>
                      <span className='jg-key'>"output"</span>: <span className='jg-brace'>{'{'}</span> <span className='text-white' >array of objects, ready to copy or download</span> <span className='jg-brace'>{'}'}</span>
                    </span>
                  )}
                </div>
                <div className='flex items-center gap-3'>
                  <Tooltip title='Download JSON'>
                    <BiDownload size={20} onClick={onDownload} className='cursor-pointer' />
                  </Tooltip>
                  <Tooltip title='Copy data'>
                    <BiCopy size={20} onClick={onCopy} className='cursor-pointer' />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </ConfigProvider>
  )
}

export default App