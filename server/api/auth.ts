import type { H3Event, EventHandlerRequest } from 'h3'

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  const body = await readBody(event)

  if (body.code === '6666') {
    return {
      success: true,
      token: 'example_token',
      data: {
        username: 'johnDoe',
        quote: 'Hello, World!',
        photo: 'https://example.com/image.jpg'
      }
    }
  } else {
    throw createError({
      statusCode: 400,
      data: {
        message: 'unauthorized'
      }
    })
  }
})
