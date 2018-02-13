import accounts from './accounts'
import { addAcccount, updateAcccount, deleteAcccount } from '../actions/index'

/* eslint-env jest */
it('Account is added', () => {
  let originalState = {}
  let expectedState = {
    'accountId 1': {
      id: 'accountId 1',
      name: 'accountName 1',
      privateKey: 'privateKey 1'
    }
  }
  let action = addAcccount('accountId 1', 'accountName 1', 'privateKey 1')
  expect(accounts(originalState, action)).toEqual(expectedState)
})

it('Account is updated', () => {
  let originalState = {
    'accountId 1': {
      id: 'accountId 1',
      name: 'accountName 1',
      privateKey: 'privateKey 1'
    },
    'accountId 2': {
      id: 'accountId 2',
      name: 'accountName 2',
      privateKey: 'privateKey 2'
    }
  }
  let expectedState = {
    ...originalState,
    'accountId 1': {
      ...originalState['accountId 1'],
      name: 'new accountName'
    }
  }
  let action = updateAcccount('accountId 1', 'new accountName')
  expect(accounts(originalState, action)).toEqual(expectedState)
})

it('Account is deleted', () => {
  let originalState = {
    'accountId 1': {
      id: 'accountId 1',
      name: 'accountName 1',
      privateKey: 'privateKey 1'
    },
    'accountId 2': {
      id: 'accountId 2',
      name: 'accountName 2',
      privateKey: 'privateKey 2'
    }
  }
  let expectedState = {
    'accountId 2': {
      id: 'accountId 2',
      name: 'accountName 2',
      privateKey: 'privateKey 2'
    }
  }
  let action = deleteAcccount('accountId 1')
  expect(accounts(originalState, action)).toEqual(expectedState)
})
