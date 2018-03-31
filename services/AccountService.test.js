import AccountService from './AccountService'

/* eslint-env jest */

it('Operation received is properly dispatched after getting its effects', done => {
  let accountId = 'GBZOAKBYRW6O4GUNT2CKSHR4JZ4FE757Z5VQW4YETQRPZP45IQC2UWAQ'

  let operationReceived = {
    id: '31726300645306369',
    sourceAccount: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
    type: 'create_account',
    createdAt: '2018-02-16T07:07:14Z',
    transactionId: '5a54f104b5effc385b4ac575730861ae4eca952dba33bfc4749a520071f2227c',
    startingBalance: '10000.0000000',
    funder: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
    account: 'GBZOAKBYRW6O4GUNT2CKSHR4JZ4FE757Z5VQW4YETQRPZP45IQC2UWAQ'
  }

  let operationEffects = [
    {
      id: '0034970078990577665-0000000001',
      account: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
      type: 'account_created',
      startingBalance: '10000.0000000'
    }
  ]

  let expectedAction = {
    type: 'ADD_OPERATION',
    accountId: accountId,
    operation: operationReceived,
    effects: operationEffects
  }

  const dispatchCallback = jest.fn()
  const effectServiceMock = {
    getEffectsForOperation: jest.fn()
  }

  effectServiceMock.getEffectsForOperation.mockReturnValueOnce(Promise.resolve(operationEffects))

  dispatchCallback.mockImplementationOnce(action => {
    expect(action).toEqual(expectedAction)
    done()
  })

  AccountService.dispatch = dispatchCallback
  AccountService._effectService = effectServiceMock

  AccountService._processOperation(accountId, operationReceived)
})

it('Keep retrying to get the effects prior dispatching an operation', done => {
  let accountId = 'GBZOAKBYRW6O4GUNT2CKSHR4JZ4FE757Z5VQW4YETQRPZP45IQC2UWAQ'

  let operationReceived = {
    id: '31726300645306369',
    sourceAccount: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
    type: 'create_account',
    createdAt: '2018-02-16T07:07:14Z',
    transactionId: '5a54f104b5effc385b4ac575730861ae4eca952dba33bfc4749a520071f2227c',
    startingBalance: '10000.0000000',
    funder: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
    account: 'GBZOAKBYRW6O4GUNT2CKSHR4JZ4FE757Z5VQW4YETQRPZP45IQC2UWAQ'
  }

  let operationEffects = [
    {
      id: '0034970078990577665-0000000001',
      account: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
      type: 'account_created',
      startingBalance: '10000.0000000'
    }
  ]

  let expectedAction = {
    type: 'ADD_OPERATION',
    accountId: accountId,
    operation: operationReceived,
    effects: operationEffects
  }

  const dispatchCallback = jest.fn()
  const effectServiceMock = {
    getEffectsForOperation: jest.fn()
  }

  effectServiceMock.getEffectsForOperation.mockReturnValueOnce(Promise.reject('Error'))
  effectServiceMock.getEffectsForOperation.mockReturnValueOnce(Promise.reject('Error'))
  effectServiceMock.getEffectsForOperation.mockReturnValueOnce(Promise.resolve(operationEffects))

  dispatchCallback.mockImplementationOnce(action => {
    expect(action).toEqual(expectedAction)
    done()
  })

  AccountService.dispatch = dispatchCallback
  AccountService._effectService = effectServiceMock

  AccountService._processOperation(accountId, operationReceived)
})
