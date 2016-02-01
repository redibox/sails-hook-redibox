# sails-hook-redibox

![Build Status](https://img.shields.io/travis/salakar/sails-hook-redibox.svg)
![Downloads](https://img.shields.io/npm/dm/sails-hook-redibox.svg)
![Downloads](https://img.shields.io/npm/dt/sails-hook-redibox.svg)
![npm version](https://img.shields.io/npm/v/sails-hook-redibox.svg)
![dependencies](https://img.shields.io/david/salakar/sails-hook-redibox.svg)
![dev dependencies](https://img.shields.io/david/dev/salakar/sails-hook-redibox.svg)
![License](https://img.shields.io/npm/l/sails-hook-redibox.svg)

Sails hook for [RediBox](https://github.com/Salakar/redibox)

## Getting Started

Install it via npm:

```shell
npm install sails-hook-redibox
```

Sails config can be placed in `config/hooks/redibox.js` or `config/redibox.js`.

## Configuration Example

```javascript
export default {
  hooks: {
    redibox: {
      redis: {
        prefix: 'my-project',
        cluster: true,
        clusterScaleReads: false,
        subscriber: true,
        publisher: true,
        hosts: [
          {host: 'localhost', port: 30001},
          {host: 'localhost', port: 30002},
          {host: 'localhost', port: 30003},
          {host: 'localhost', port: 30004},
          {host: 'localhost', port: 30005},
          {host: 'localhost', port: 30006}
        ]
      },
      job: {
        prefix: 'job',
        enabled: true,
        queues: [
          // example queues
          {name: 'my-queue-1', concurrency: 35},
          {name: 'my-queue-2', concurrency: 10},
          {name: 'my-queue-3', concurrency: 25}
        ]
      },
      cache: {
        enabled: true,
        prefix: 'cache',
        defaultTTL: 600
      },
      log: {
        level: 'warn'
      }
    }
  }
};
```

## License

MIT
