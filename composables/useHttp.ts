import type { NitroFetchOptions } from 'nitropack'

type Method = 'get' | 'post' | 'put' | 'delete'

const replaceUrlParams = (url: string, params: Record<string, unknown>) => url.replace(/:(\w+)/g, (_, key) => String(params[key]))

const fetch = (url: string, options?: NitroFetchOptions<Method>) => {
  const { public: { baseApiUrl } } = useRuntimeConfig()
  const token = localStorage.getItem('token')
  const newURL = options?.params ? replaceUrlParams(url, options.params) : url

  const newOptions: NitroFetchOptions<Method> = {
    ...options,
    baseURL: baseApiUrl,
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {},
    onResponseError ({ response }) {
      response.status === 401 && localStorage.removeItem('token')
    }
  }

  return $fetch(newURL, newOptions)
}

export default () => ({
  get: (url: string, options?: NitroFetchOptions<'get'>) => fetch(url, {
    method: 'get',
    ...options
  }),
  post: (url: string, options?: NitroFetchOptions<'post'>) => fetch(url, {
    method: 'post',
    ...options
  }),
  put: (url: string, options?: NitroFetchOptions<'put'>) => fetch(url, {
    method: 'put',
    ...options
  }),
  delete: (url: string, options?: NitroFetchOptions<'delete'>) => fetch(url, {
    method: 'delete',
    ...options
  })
})
