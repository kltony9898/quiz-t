interface Response<T> {
  success: boolean
  data: T
}

type VerifyCode = {
  code: string
}

interface OtpVerifyData {
  valid: boolean
  token: string
}
type OtpVerifyResponse = Response<OtpVerifyData>

const otpVerify = (data: VerifyCode) => useHttp().post('/api/verify', {
  body: data
}) as Promise<OtpVerifyResponse>

interface UserInfoData {
  username: string
  quote: string
  photo: string
}

type UserInfoResponse = Response<UserInfoData>
const getUserInfo = () => useHttp().get('/api/auth') as Promise<UserInfoResponse>

export default {
  otpVerify, getUserInfo
}
