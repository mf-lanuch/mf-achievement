import request from '@/utils/request'

export function getOverTimeRate (data) {
  return request({
    url: '/api/mfPart/getOverTimeRate',
    method: 'post',
    data: data
  })
}

export function getPersonalOvertime (data) {
  return request({
    url: '/api/mfUserInfo/getPersonalOvertime',
    method: 'post',
    data: data
  })
}

export function getPeriodOvertimeWeek (data) {
  return request({
    url: '/api/mfPart/getPeriodOvertimeWeek',
    method: 'POST',
    data: data
  })
}

export function getPeriodOvertime (data) {
  return request({
    url: '/api/mfPart/getPeriodOvertime',
    method: 'POST',
    data: data
  })
}

export function getPartOvertime (data) {
  return request({
    url: '/api/mfPart/getPartOvertime',
    method: 'POST',
    data: data
  })
}

export function getDeptOvertimeMonth (data) {
  return request({
    url: '/api/mfPart/getDeptOvertimeMonth',
    method: 'POST',
    data: data
  })
}

export function listPersonalOtDetail (data) {
  return request({
    url: '/api/mfUserInfo/listPersonalOtDetail',
    method: 'POST',
    data: data
  })
}

export function listPersonaOvertime (data) {
  return request({
    url: '/api/mfUserInfo/listPersonaOvertime',
    method: 'POST',
    data: data
  })
}

export function getPersonalAttenceList (data) {
  return request({
    url: '/api/mfUserInfo/getPersonalAttenceList',
    method: 'POST',
    data: data
  })
}

export function getOverTimeForAll (data) {
  return request({
    url: '/api/mfPart/getOverTimeForAll',
    method: 'POST',
    data: data
  })
}

export function listMfMagnification (data) {
  return request({
    url: '/api/mfMagnification/listMfMagnification',
    method: 'POST',
    data: data
  })
}

export function updateMfMagnification (data) {
  return request({
    url: '/api/mfMagnification/updateMfMagnification',
    method: 'POST',
    data: data
  })
}
