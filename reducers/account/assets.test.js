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

it("Create account targeting account increases the native asset balance", () => {
  let accountId = 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2'

  let currentState = {
    assetsBalanceById: {}
  }

  let dispatchedAction = {
    type: 'ADD_OPERATION',
    accountId: accountId,
    operation: {
      id: '31726300645306369',
      pagingToken: '31726300645306369',
      sourceAccount: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
      type: 'create_account',
      createdAt: '2018-02-16T07:07:14Z',
      transactionId: '5a54f104b5effc385b4ac575730861ae4eca952dba33bfc4749a520071f2227c',
      startingBalance: '10000.0000000',
      funder: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
      account: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2'
    },
    effects: [
      {
        id: '0031726300645306369-0000000001',
        account: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
        type: 'account_created',
        startingBalance: '10000.0000000',
      },
      {
        id: '0031726300645306369-0000000002',
        account: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
        type: 'account_debited',
        assetType: 'native',
        assetIssuer: undefined,
        assetCode: undefined,
        amount: '10000.0000000',
      },
      {
        id: '0031726300645306369-0000000003',
        account: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
        type: 'signer_created',
        weight: 1,
        publicKey: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
        key: '',
      }
    ]
  }

  let expectedState = {
    assetsBalanceById: {
      'native:undefined:undefined': {
        balance: '10000.0000000',
        movements: [
          {
            transactionId: '5a54f104b5effc385b4ac575730861ae4eca952dba33bfc4749a520071f2227c',
            amount: '10000.0000000',
            date: '2018-02-16T07:07:14Z'
          }
        ]
      }
    }
  }

  expect(assetsReducer(currentState, dispatchedAction)).toEqual(expectedState)
})

it("Create account from account decreases the native asset balance", () => {
  let accountId = 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2'

  let currentState = {
    assetsBalanceById: {
      'native:undefined:undefined': {
        balance: '12345.7890123',
        movements: []
      }
    }
  }

  let dispatchedAction = {
    type: 'ADD_OPERATION',
    accountId: accountId,
    operation: {
      id: '31726300645306369',
      pagingToken: '31726300645306369',
      sourceAccount: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
      type: 'create_account',
      createdAt: '2018-02-16T07:07:14Z',
      transactionId: '5a54f104b5effc385b4ac575730861ae4eca952dba33bfc4749a520071f2227c',
      startingBalance: '10000.0000000',
      funder: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
      account: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR'
    },
    effects: [
      {
        id: '0031726300645306369-0000000001',
        account: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
        type: 'account_created',
        startingBalance: '10000.0000000',
      },
      {
        id: '0031726300645306369-0000000002',
        account: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
        type: 'account_debited',
        assetType: 'native',
        assetIssuer: undefined,
        assetCode: undefined,
        amount: '10000.0000000',
      },
      {
        id: '0031726300645306369-0000000003',
        account: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
        type: 'signer_created',
        weight: 1,
        publicKey: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
        key: '',
      }
    ]
  }

  let expectedState = {
    assetsBalanceById: {
      'native:undefined:undefined': {
        balance: '2345.7890123',
        movements: [
          {
            transactionId: '5a54f104b5effc385b4ac575730861ae4eca952dba33bfc4749a520071f2227c',
            amount: '-10000.0000000',
            date: '2018-02-16T07:07:14Z'
          }
        ]
      }
    }
  }

  expect(assetsReducer(currentState, dispatchedAction)).toEqual(expectedState)
})
