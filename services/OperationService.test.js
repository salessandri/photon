import OperationService from './OperationService'

/* eslint-env jest */

it('"create_account" is parsed correctly', () => {
  let accountId = 'GAMQWR5ULFVVQWCLU7PL6ZCW7M2IQGJP5FY6LG3HXS4XWPM3F5VDN5IV'
  let rawCreateAccount = {
    _links:
      {
        self:
          { href: 'https://horizon-testnet.stellar.org/operations/31726300645306369' },
        transaction:
          { href: 'https://horizon-testnet.stellar.org/transactions/5a54f104b5effc385b4ac575730861ae4eca952dba33bfc4749a520071f2227c' },
        effects:
          { href: 'https://horizon-testnet.stellar.org/operations/31726300645306369/effects' },
        succeeds:
          { href: 'https://horizon-testnet.stellar.org/effects?order=desc&cursor=31726300645306369' },
        precedes:
          { href: 'https://horizon-testnet.stellar.org/effects?order=asc&cursor=31726300645306369' }
      },
    id: '31726300645306369',
    paging_token: '31726300645306369',
    source_account: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
    type: 'create_account',
    type_i: 0,
    created_at: '2018-02-16T07:07:14Z',
    transaction_hash: '5a54f104b5effc385b4ac575730861ae4eca952dba33bfc4749a520071f2227c',
    starting_balance: '10000.0000000',
    funder: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
    account: 'GBZOAKBYRW6O4GUNT2CKSHR4JZ4FE757Z5VQW4YETQRPZP45IQC2UWAQ'
  }

  let expectedOperation = {
    id: '31726300645306369',
    sourceAccount: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
    type: 'create_account',
    createdAt: '2018-02-16T07:07:14Z',
    transactionId: '5a54f104b5effc385b4ac575730861ae4eca952dba33bfc4749a520071f2227c',
    startingBalance: '10000.0000000',
    funder: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
    account: 'GBZOAKBYRW6O4GUNT2CKSHR4JZ4FE757Z5VQW4YETQRPZP45IQC2UWAQ'
  }

  let expectedAction = {
    type: 'ADD_CREATE_ACCOUNT_OPERATION',
    accountId: accountId,
    operation: expectedOperation
  }

  const mockDispatch = jest.fn()
  OperationService.dispatch = mockDispatch

  OperationService.processCreateAccount(accountId, rawCreateAccount)

  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0]).toEqual(expectedAction)
})
