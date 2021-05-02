import React from 'react'
import axios from 'axios'
import {baseUrl} from "./configs";

export const userIn = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/user_in`,
      {withCredentials: true})
      .then(resp => {
        resolve(resp)
      })
  })
}

export const login = (params) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.defaults.headers.post['Accept'] = '*/*'
    axios.post(`${baseUrl}/login`,
      params,
      {withCredentials: true}
    )
      .then(resp => {
        resolve(resp)
      })
  }
)
}

export const logout = () => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.defaults.headers.post['Accept'] = '*/*'
    axios.delete(`${baseUrl}/logout`,
      {withCredentials: true}
    )
      .then(resp => {
        resolve(resp)
      })
    }
  )
}

export const modelShow = (params) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.get['Accept'] = '*/*'
    axios.get(`${baseUrl}/${params.model}/${params.userId}`, {withCredentials: true})
      .then(resp => {
        resolve(resp)
      })
    }
  )
}