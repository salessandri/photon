
const infoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return {
        id: action.id,
        name: action.name,
        privateKey: action.privateKey
      }
    default:
      return state
  }
}

export default infoReducer
