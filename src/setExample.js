const redis = require('redis');



// SADD
// https://redis.io/commands/sadd
const sAddExample = async (client) => {
  console.log('=== SADD Example ===')

  await client.sAdd('testSet', 'value1')
  await client.sAdd('testSet', 'value2')

  console.log("Values inside testSet:", await client.sMembers('testSet'))

  await client.del('testSet')
}

// SCARD
// https://redis.io/commands/scard
const sCardExample = async (client) => {
  console.log('=== SCARD Example ===')
  await client.sAdd('testSet', ['value1', 'value2', 'value3'])
  await client.sAdd('testSet1', 'value')

  console.log('SCARD for testSet:', await client.sCard('testSet'))
  console.log('SCARD for testSet1:', await client.sCard('testSet1'))
  
  await client.del(['testSet', 'testSet1'])
}

// SDIFF
// https://redis.io/commands/sdiff
const sDiffExample = async (client) => {
  console.log('=== SDIFF Example ===')
  await client.sAdd('testSet1', ['1', '2', '3'])
  await client.sAdd('testSet2', '1')
  await client.sAdd('testSet3', '2')

  let result = await client.sDiff(['testSet1', 'testSet2', 'testSet3'])
  console.log('Result:', result)

  await client.del(['testSet1', 'testSet2', 'testSet3'])
}

// SINTR
// https://redis.io/commands/sinter
const sInterExample = async (client) => {
  console.log('=== SINTR Example ===')
  await client.sAdd('testSet1', ['1', '2', '3'])
  await client.sAdd('testSet2', ['1', '2'])
  await client.sAdd('testSet3', '2')

  let result = await client.sInter(['testSet1', 'testSet2', 'testSet3'])
  console.log('Result:', result)

  await client.del(['testSet1', 'testSet2', 'testSet3'])
}

// SISMEMBER
// https://redis.io/commands/sismember
const sIsMemberExample = async (client) => {
  console.log('=== SISMEMBER Example ===')
  await client.sAdd('testSet', 'exist')

  console.log('Result found:', await client.sIsMember('testSet', 'exist'))
  console.log('Result not found:', await client.sIsMember('testSet', '123'))

  await client.del('testSet')
}

// SMSMBERS
// https://redis.io/commands/smembers
const sMembersExample = async (client) => {
  console.log('=== SISMEMBER Example ===')
  await client.sAdd('testSet', ['test1', 'test2', 'test3'])
  
  console.log('SMEMBERS result for testSet:', await client.sMembers('testSet'))

  await client.del('testSet', redis.print)
}

// SMISMEMBER
// https://redis.io/commands/smismember
const smIsMemberExample = async (client) => {
  console.log('=== SMISMEMBER Example ===')
  await client.sAdd('testSet', ['test1', 'test2', 'test3'])

  console.log('Rseult 1:', await client.smIsMember('testSet', ['test1', 'test3']))
  console.log('Rseult 2:', await client.smIsMember('testSet', ['test2', 'test4']))
  
  
  await client.del('testSet')
}

// SMOVE
// https://redis.io/commands/smove
const sMoveExample = async (client) => {
  console.log('=== SMOVE Example ===')
  await client.sAdd('testSet1', ['test1', 'test2', 'test3'])
  await client.sAdd('testSet2', 'test4')
  console.log('Original testSet1:', await client.sMembers('testSet1'))
  console.log('Original testSet2:', await client.sMembers('testSet2'))

  await client.sMove('testSet1', 'testSet2', 'test2')
  console.log('Updated testSet1:', await client.sMembers('testSet1'))
  console.log('Updated testSet2:', await client.sMembers('testSet2'))

  await client.del(['testSet1', 'testSet2'])
}

// SPOP
// https://redis.io/commands/spop
const sPopExample = async (client) => {
  console.log('=== SPOP Example ===')
  await client.sAdd('testSet', ['test1', 'test2', 'test3', 'test4'])
  console.log('Original testSet:', await client.sMembers('testSet'))

  let popResult = await client.sPop('testSet', 2)
  // pop items are randomly picked
  console.log('Poped items:', popResult)
  console.log('testSet after ptp:', await client.sMembers('testSet'))

  await client.del('testSet')
}

// SRANDMEMBER
// https://redis.io/commands/srandmember
const sRanMemberExample = async (client) => {
  console.log('=== SRANDMEMBER Example ===')
  await client.sAdd('testSet', ['test1', 'test2', 'test3', 'test4'])

  console.log('Random member:', await client.sRandMember('testSet'))

  await client.del('testSet')
}

// SREM
// https://redis.io/commands/srem
const sRemExample = async (client) => {
  console.log('=== SREM Example ===')
  await client.sAdd('testSet', ['test1', 'test2', 'test3'])
  console.log('Original testSet:', await client.sMembers('testSet'))

  let success = await client.sRem('testSet', 'test1')
  console.log('Success return:', success)
  let fail = await client.sRem('testSet', ['test4', 'test5'])
  console.log('Fail return:', fail)
  console.log('Updated testSet:', await client.sMembers('testSet'))

  await client.del('testSet')
}

// SUNION
// https://redis.io/commands/sunion
const sUnionExample = async (client) => {
  console.log('=== SUNION Example ===')
  await client.sAdd('testSet1', ['test1', 'test2', 'test3'])
  await client.sAdd('testSet2', ['test1', 'test4', 'test5'])

  let result = await client.sUnion(['testSet1', 'testSet2'])
  console.log('Result:', result)

  await client.del(['testSet1', 'testSet2']) 
}

(async () => {
  const client = redis.createClient()
  client.on('error', (err) => console.log('Redis Client Error', err))
  client.on('connect', () => {console.log('Redis client connected')})
  await client.connect()

  await sAddExample(client)
  await sCardExample(client)
  await sDiffExample(client)
  await sInterExample(client)
  await sIsMemberExample(client)
  await sMembersExample(client)
  await smIsMemberExample(client)
  await sMoveExample(client)
  await sPopExample(client)
  await sRanMemberExample(client)
  await sRemExample(client)
  await sUnionExample(client)

  process.exit(0)
})()





