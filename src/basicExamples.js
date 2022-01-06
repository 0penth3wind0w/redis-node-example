const redis = require('redis');

(async () => {
  const client = redis.createClient()

  client.on('error', (err) => console.log('Redis Client Error', err))
  client.on('connect', () => {console.log('Redis client connected')})

  await client.connect()

  let setResult = await client.set('foo', 'bar1', {EX: 5})
  console.log(setResult)

  setInterval(async () => {
    let result = await client.get('foo')
    console.log('GET result: foo -> ' + result)
  },1000)

  // await client.del('foo')
})();
