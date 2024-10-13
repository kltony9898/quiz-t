import type { H3Event, EventHandlerRequest } from 'h3'

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  const body = await readBody(event)

  const delay = Math.floor(Math.random() * 2000) + 1000
  await new Promise(resolve => setTimeout(resolve, delay))

  if (body.code === '6666') {
    return {
      success: true,
      token: 'example_token',
      data: {
        valid: true
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
