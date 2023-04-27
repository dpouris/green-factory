import axios, { AxiosError, AxiosResponse } from 'axios'

let API_ADDRESS = "https://localhost:8000/"

export type ErrorDetail =
  { type: 'invalid_field_reference', ref_column_id: string, column_id: string }
  | { type: 'workspace_not_setup' }
  // billing:
  | { type: 'unrecognized_location' }
  | { type: 'location_recognition_failed' }
  | { type: 'billing_details_missing' }
  // invites:
  | { type: 'invitation_does_not_exist' }
  | { type: 'invitation_expired' }
  | { type: 'invitation_forbidden', invitation_email: string, user_email: string }
  | { type: 'invitation_already_accepted' }
  /* | { type: string } */

interface ErrorPayload {
  detail: ErrorDetail
}

export interface HTTPError extends AxiosError {
  response: AxiosResponse<ErrorPayload | object>
}

export function isHTTPError(error: any): error is HTTPError {
  return "response" in error && axios.isAxiosError(error)
}

export type APIError = HTTPError & { response: AxiosResponse<ErrorPayload> }

export function isAPIError(error: any): error is APIError {
  return isHTTPError(error) && (typeof error.response.data === 'string' && error.response.data !== 'Internal Server Error') && 'detail' in error.response.data
}

const api = {
  loadConfig: async () => {
    if (!API_ADDRESS) {
      try {
        const response = await axios({ method: 'GET', url: '/data/config.json' })
        const config = response.data
        if (config.apiAddress) {
          API_ADDRESS = config.apiAddress
        } else {
          API_ADDRESS = "http://localhost:8000"
        }
      } catch (err) {
        API_ADDRESS = "http://localhost:8000"
      }
      console.log('API ADDRESS', API_ADDRESS)
    }
  },
  getCompanyPositions: async (): Promise<string[]> => {
    try {
      return (await axios.get('/data/company-positions.json')).data
    } catch (err) {
      return []
    }
  },
  discoverAddress: async () => {
    if (!API_ADDRESS) {
      await api.loadConfig();
    }
    return API_ADDRESS
  },
  post: async (endpoint: string, data={}, headers={}, params={}) => {
    const address = await api.discoverAddress()
    return await axios({
      method: 'POST',
      headers,
      data,
      params,
      url: address + endpoint,
    })
  },
  get: async (endpoint: string, params={}, headers={}) => {
    const address = await api.discoverAddress()
    return await axios({
      method: 'GET',
      headers,
      params,
      url: address + endpoint,
    })
  },
  put: async (endpoint: string, data={}, headers={}, params={}) => {
    const address = await api.discoverAddress()
    return await axios({
      method: 'PUT',
      headers,
      data,
      params,
      url: address + endpoint,
    })
  },
  delete: async (endpoint: string, headers={}, params={}) => {
    const address = await api.discoverAddress()
    return await axios({
      method: 'DELETE',
      headers,
      params,
      url: address + endpoint,
    })
  },
  patch: async (endpoint: string, params={}, headers={}) => {
    const address = await api.discoverAddress();
    return await axios.patch(address + endpoint, params, { headers })
  },
  getMean: async (image: string) => {
    const formData = new FormData();
    formData.append('image', image);
    return (await api.post('image/mean', formData, {
        'Content-Type': 'multipart/form-data'
    })).data
  },
  getMaterials: async () => {
    return (await api.get('materials')).data
  },
  addMaterial: async (material: {name: string, description: string, mean: number[]}) => {
    return (await api.post('materials/add/', material)).data
  }
}

export default api;