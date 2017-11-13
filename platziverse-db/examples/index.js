'use strict'

const db = require('../')

async function run() {
  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'jsteven',
    password: process.env.DB_PASS || 'jsteven',
    host: process.env.DB_HOST ||  '192.168.1.25',
    dialect: 'postgres'
  }

  const {Agent, Metric} = await db(config).catch(handleFatalError)

  const agent = await Agent.findByUuid('yyy').catch(handleFatalError)


  const agents = await Agent.findAll().catch(handleFatalError)

  console.log('--agent--')
  console.log(agents)

  const metrics = await Metric.findByAgentUuid('yyy').catch(handleFatalError)

  console.log('--metrics--')
  console.log(metrics)
}

function handleFatalError(err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()