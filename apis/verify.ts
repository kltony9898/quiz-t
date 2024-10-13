type VerifyCode = {
  code: string
}

type Response = {
  success: boolean
  data: {
    method: 'get' | 'post' | 'put' | 'delete'
    body?: Record<string, unknown>
    query?: Record<string, unknown>
  }
}

const otpVerify = (data: VerifyCode) => useHttp().post('/api/verify', {
  body: data
}) as Promise<Response>

export default {
  otpVerify
}
