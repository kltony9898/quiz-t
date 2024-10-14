import type { H3Event, EventHandlerRequest } from 'h3'

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  const body = await readBody(event)
  const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.tImCzvIkqaNmGB5mMAG1DZRnZO56sjoYO5nU2YUdRK4'
  const delay = Math.floor(Math.random() * 2000) + 1000
  await new Promise(resolve => setTimeout(resolve, delay))

  if (body.code === '6666') {
    return {
      success: true,
      data: {
        valid: true,
        token: fakeToken
      }
    }
  } else {
    throw createError({
      statusCode: 400,
      data: {
        valid: false
      }
    })
  }
})
