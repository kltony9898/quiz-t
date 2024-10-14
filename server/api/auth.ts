import type { H3Event, EventHandlerRequest } from 'h3'

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  const authHeader = getHeader(event, 'Authorization')
  const fakeToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.tImCzvIkqaNmGB5mMAG1DZRnZO56sjoYO5nU2YUdRK4'
  if (authHeader === fakeToken) {
    return {
      success: true,
      data: {
        username: 'johnDoe',
        quote: 'Hello, World!',
        photo: 'https://upload.wikimedia.org/wikipedia/zh/b/bd/Homer_Simpson.png'
      }
    }
  } else {
    throw createError({
      statusCode: 401,
      data: {
        message: 'unauthorized'
      }
    })
  }
})
