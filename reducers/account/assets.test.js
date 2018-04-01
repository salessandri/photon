import assetsReducer from './assets'

/* eslint-env jest */

it("Native asset's state is updated correctly from a transaction of that account", () => {
  let accountId = 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2'

  let currentState = {
    assetsBalanceById: {
      'native:undefined:undefined': {
        balance: '123.4567890',
        movements: []
      }
    }
  }

  let dispatchedAction = {
    type: 'ADD_TRANSACTION',
    accountId: accountId,
    transaction: {
      id: 'ca9a1da5d731780e790641ef2b4dcdd3b0d8eac463aa830ec2d9ae68059347ff',
      createdAt: '2018-03-21T06:57:29Z',
      fee: 100,
      memoType: 'none',
      operationCount: 1,
      pagingToken: '34456276347916288',
      signatures: [
        "eyNyB0nVzvydSI/o1AA5L3l0DGItu54SGqvnDNdVodw438jLFr7l788WBwtlb/Qw8r+prS2bHFeGRh5cS9mjBw=="
      ],
      sourceAccount: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2'
    }
  }

  let expectedState = {
    assetsBalanceById: {
      'native:undefined:undefined': {
        balance: '123.4567790',
        movements: [
          {
            transactionId: 'ca9a1da5d731780e790641ef2b4dcdd3b0d8eac463aa830ec2d9ae68059347ff',
            amount: '-0.0000100',
            date: '2018-03-21T06:57:29Z'
          }
        ]
      }
    }
  }

  expect(assetsReducer(currentState, dispatchedAction)).toEqual(expectedState)
})

it("Native asset's state is untouched from a transaction of other account", () => {
  let accountId = 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2'

  let currentState = {
    assetsBalanceById: {
      'native:undefined:undefined': {
        balance: '123.4567890',
        movements: []
      }
    }
  }

  let dispatchedAction = {
    type: 'ADD_TRANSACTION',
    accountId: accountId,
    transaction: {
      id: 'ca9a1da5d731780e790641ef2b4dcdd3b0d8eac463aa830ec2d9ae68059347ff',
      createdAt: '2018-03-21T06:57:29Z',
      fee: 100,
      memoType: 'none',
      operationCount: 1,
      pagingToken: '34456276347916288',
      signatures: [
        "eyNyB0nVzvydSI/o1AA5L3l0DGItu54SGqvnDNdVodw438jLFr7l788WBwtlb/Qw8r+prS2bHFeGRh5cS9mjBw=="
      ],
      sourceAccount: 'GCAVCSO7WF5FPZEOHYTBLIRWH2XD4Y76U3ZO5T64ENVRFQTJN32HUVTI'
    }
  }

  let expectedState = {
    assetsBalanceById: {
      'native:undefined:undefined': {
        balance: '123.4567890',
        movements: []
      }
    }
  }

  expect(assetsReducer(currentState, dispatchedAction)).toEqual(expectedState)
})
