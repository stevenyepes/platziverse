'use strict'

const agentFixtures = require('./agent')

const metric = {
  id: 1,
  agentId: 1,
  type: 'memory',
  value: '45%',
  createdAt: new Date(),
  updatedAt: new Date(),
  agent: agentFixtures.byId(1)
}

const metrics = [
  metric,
  extend(metric, { id: 2, type: 'temperature', value: '45C' }),
  extend(metric, { id: 3, type: 'humidity', value: '45%' }),
  extend(metric, { id: 4, type: 'distance', value: '43m' })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: metric,
  all: metrics,
  byAgentUuid: uuid => metrics.filter(a => a.agent['uuid'] === uuid).map(b => b.type).filter((v, i, a) => a.indexOf(v) === i),
  byTypeAgentUuid: (type, uuid) => metrics.filter(a => a.type === type && a.agent['uuid'] === uuid)
                      .map(b => {
                        const m = {
                          id: b.id,
                          type: b.type,
                          value: b.value,
                          createdAt: b.createdAt
                        }
                        return m
                      }).sort((a, b) => {
                        return new Date(b.date) - new Date(a.date)
                      })
}
