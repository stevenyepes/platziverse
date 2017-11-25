## platziverse-mqtt

# `agent/connected`

``` js
{
  agent: {
    uuid, // auto generate
    username, // defined by conf
    name, // defined by conf
    hostname, // get by OS
    pid // get by the process
  }
}
```

# `agent/disconnected`

``` js
{
  agent: {
    uuid
  }
}

```

# `agent/message`

``` js
{
  agent,
  metrics: [
    type,
    value
  ],
  timestamp // generated when message is created
}
```