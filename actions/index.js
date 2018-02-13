
export const addAcccount = (id, name, privateKey) => {
  return {
    type: 'ADD_ACCOUNT',
    id,
    name,
    privateKey
  }
}

export const updateAcccount = (id, name) => {
  return {
    type: 'UPDATE_ACCOUNT',
    id,
    name
  }
}

export const deleteAcccount = id => {
  return {
    type: 'DELETE_ACCOUNT',
    id
  }
}
