'use strict'

const debug = require('debug')('platziverse:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const db = require('platziverse-db')
const config = require('./config')

const api = asyncify(express.Router())

let services, Agent, Metric

api.use('*', async(req, res, next) => {
  if (!services) {
    debug('conecting to database...')
    try {
      services = await db(config.db)
    } catch (err) {
      return next(err)
    }

    Agent = services.Agent
    Metric = services.Metric
  }

  next()
})

api.get('/agents', async (req, res, next) => {
  debug('A request has come to /agents')

  let agents = []
  try {
    agents = await Agent.findConnected()
  } catch (err) {
    return next(err)
  }

  res.send(agents)
})

api.get('/agent/:uuid', async (req, res, next) => {
  const {uuid} = req.params
  debug(`request to /agent/${uuid}`)
  let agent = null
  try {
    agent = await Agent.findByUuid(uuid)
  } catch (err) {
    return next(err)
  }

  if (!agent) {
    return next(new Error(`Agent not found with uuid ${uuid}`))
  }

  res.send(agent)
})

api.get('/metrics/:uuid', async (req, res, next) => {
  const {uuid} = req.params

  debug(`request to /metrics/${uuid}`)

  let metrics = []
  try {
    metrics = await Metric.findByAgentUuid(uuid)
  } catch (err) {
    next(err)
  }

  if (!metrics || metrics.length === 0) {
    return next(new Error(`There is no metrics for agent ${uuid}`))
  }

  res.send(metrics)
})

api.get('/metrics/:uuid/:type', async (req, res, next) => {
  const {uuid, type} = req.params

  debug(`request to /metrics/${uuid}/${type}`)

  let metrics = []
  try {
    metrics = await Metric.findByTypeAgentUuid(type, uuid)
  } catch (err) {
    next(err)
  }

  if (!metrics || metrics.length === 0) {
    return next(new Error(`There is no metrics for type ${type} and agent ${uuid}`))
  }

  res.send(metrics)
})

module.exports = api
