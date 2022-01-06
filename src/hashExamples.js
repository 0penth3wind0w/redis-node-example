const redis = require('redis');

// All redis command provide camelStyle or UPPERCASESTYLE
// e.g. hSet() and HSET()

// HSET & HGET
// https://redis.io/commands/hset
// https://redis.io/commands/gset
const hSetExample = async (client) => {
  console.log('=== HGET Example ===')
  await client.hSet('testId', 'hashKey', 'value1')
  await client.hSet('testId', ['hashKey', 'value1', 'hashKey2', 'value2'])
  
  let hit1 = await client.hGet('testId', 'hashKey')
  console.log("Hit result 1:", hit1)

  let hit2 = await client.hGet('testId', 'hashKey2')
  console.log('Hit result 2:', hit2)

  let miss = await client.hGet('testId', 'hashKey1')
  console.log('Miss result:', miss)
  
  await client.del('testId')
}

// HLEN
// https://redis.io/commands/hlen
const hLenExample = async (client) => {
  console.log('=== HLEN Example ===')
  await client.hSet('testId', 'hashKey', 'value1')
  await client.hSet('testId', 'hashKey', 'value2')
  await client.hSet('testId', 'hashKey', 'value3')

  let result = await client.hLen('id')
  console.log('Result:', result)

  await client.del('testId')
}

// HEXISTS
// https://redis.io/commands/hexists
const hExistsExample = async (client) => {
  console.log('=== HEXISTS Example ===')
  await client.hSet('testId', 'hKey', 'hValue')

  let hit = await client.hExists('testId', 'hKey')
  console.log('Hit result:', hit)
  let miss1 = await client.hExists('testId', 'hKey1')
  console.log('Miss result 1:', miss1)
  let miss2 = await client.hExists('testId1', 'hKey')
  console.log('Miss result 2:', miss2)

  await client.del('testId')
}

// HGETALL
// https://redis.io/commands/hgetall
const hGetAllExample = async (client) => {
  console.log('=== HGETALL Example ===')
  await client.hSet('testId', 'testKey1', 'testValue1')
  await client.hSet('testId', 'testKey2', 'testValue2')

  let result = await client.hGetAll('testId')
  console.log('Result:', result)

  await client.del('testId')
}

// HINCRBY
// https://redis.io/commands/hincrby
const hIncrByExample = async (client) => {
  console.log('=== HINCRBY Example ===')
  await client.hSet('testId', 'hashKey', 1, redis.print)
  console.log('Original value:', await client.hGet('testId', 'hashKey'))

  await client.hIncrBy('testId', 'hashKey', 2)
  let result = await client.hGet('testId', 'hashKey')
  console.log('Updated value:', result)
  
  await client.del('testId')
}

// HINCRBYFLOAT
// https://redis.io/commands/hincrbyfloat
const hIncrByFloatExaple = async (client) => {
  console.log('=== HINCRBYFLOAT Example ===')
  await client.hSet('testId', 'hashKey', 1)
  console.log('Original value:', await client.hGet('testId', 'hashKey'))
  
  await client.hIncrByFloat('testId', 'hashKey', '0.2')
  console.log('Updated value:', await client.hGet('testId', 'hashKey'))

  await client.del('testId')
}

// HKEYS
// https://redis.io/commands/hkeys
const hKeysExample = async (client) => {
  console.log('=== HKEYS Example ===')
  await client.hSet('testId', 'hashKey1', 1)
  await client.hSet('testId', 'hashKey2', 2)
  await client.hSet('testId', 'hashKe3', 3)

  let result = await client.hKeys('testId')
  console.log('Result:', result)

  await client.del('testId')
}

// HMGET
// https://redis.io/commands/hmget
const hmGetExample = async (client) => {
  console.log('=== HMGET Example ===')
  await client.hSet('testId', 'hashKey1', 1)
  await client.hSet('testId', 'hashKey2', 2)
  await client.hSet('testId', 'hashKey3', 3)

  let result = await client.hmGet('testId', ['hashKey1', 'hashKey2'])
  console.log('Result:', result)

  await client.del('testId')
}

const hRandFieldExample = async (client) => {
  console.log('=== HRANDFIELD Example ===')
  await client.hSet('testId', 'hashKey1', 1)
  await client.hSet('testId', 'hashKey2', 2)
  await client.hSet('testId', 'hashKey3', 3)
  await client.hSet('testId', 'hashKey4', 4)
  await client.hSet('testId', 'hashKey5', 5)

  let result = await client.hRandField('testId')
  console.log('Result:', result)

  await client.del('testId')
}

// HSETNX
// https://redis.io/commands/hsetnx
const hSetNXExample = async (client) => {
  console.log('=== HSETNX Example ===')
  await client.hSet('testId', 'hashKey1', '1')
  console.log('Original testId.hashKey1:', await client.hGet('testId', 'hashKey1'))
  console.log('Original testId.hashKey2:', await client.hGet('testId', 'hashKey2'))
  console.log('Original testId1.hashKey1:', await client.hGet('testI1', 'hashKey1'))

  await client.hSetNX('testId', 'hashKey1', '2')
  await client.hSetNX('testId', 'hashKey2', '3')
  await client.hSetNX('testId1', 'hashKey1', '4')
  console.log('New testId.hashKey1:', await client.hGet('testId', 'hashKey1'))
  console.log('New testId.hashKey2:', await client.hGet('testId', 'hashKey2'))
  console.log('New testId1.hashKey1:', await client.hGet('testId1', 'hashKey1'))

  await client.del('testId')
  await client.del('testId1')
}

// HSTRLEN
// https://redis.io/commands/hstrlen
const hStrLenExample = async (client) => {
  console.log('=== HSTRLEN Example ===')
  await client.hSet('testId', ['hashKey1', 'sadfjlkj', 'hashKey2', 'skddl'])

  console.log('Lengeh of testId.hashKey1:', await client.hStrLen('testId', 'hashKey1'))
  console.log('Lengeh of testId.hashKey2:', await client.hStrLen('testId', 'hashKey2'))

  await client.del('testId')
}

// HVALS
// https://redis.io/commands/hvals
const hValsExample = async (client) => {
  console.log('=== HVALS Example ===')
  await client.hSet('testId', ['hashKey1', 'Val1', 'hashKey2', 'Val2', 'hashKey3', 'Val3'])

  console.log('Resilt', await client.hVals('testId'))
  
  await client.del('testId')
}

(async () => {
  const client = redis.createClient()
  client.on('error', (err) => console.log('Redis Client Error', err))
  client.on('connect', () => {console.log('Redis client connected')})
  await client.connect()
  
  await hSetExample(client)
  await hLenExample(client)
  await hExistsExample(client)
  await hGetAllExample(client)
  await hIncrByExample(client)
  await hIncrByFloatExaple(client)
  await hKeysExample(client)
  await hmGetExample(client)
  await hRandFieldExample(client)
  await hSetNXExample(client)
  await hStrLenExample(client)
  await hValsExample(client)

  process.exit(0)
})();
