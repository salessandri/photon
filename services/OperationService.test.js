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

it('"payment" is parsed correctly', () => {
  let accountId = 'GAMQWR5ULFVVQWCLU7PL6ZCW7M2IQGJP5FY6LG3HXS4XWPM3F5VDN5IV'
  let rawCreateAccount = {
    _links:
      {
        self:
          { href: 'https://horizon-testnet.stellar.org/operations/10157597659144' },
        transaction:
          { href: 'https://horizon-testnet.stellar.org/transactions/17a670bc424ff5ce3b386dbfaae9990b66a2a37b4fbe51547e8794962a3f9e6a' },
        effects:
          { href: 'https://horizon-testnet.stellar.org/operations/10157597659144/effects' },
        succeeds:
          { href: 'https://horizon-testnet.stellar.org/effects?order=desc&cursor=10157597659144' },
        precedes:
          { href: 'https://horizon-testnet.stellar.org/effects?order=asc&cursor=10157597659144' }
      },
    id: '10157597659144',
    paging_token: '10157597659144',
    source_account: 'GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB',
    type: 'payment',
    type_i: 1,
    created_at: '2017-03-20T19:50:52Z',
    transaction_hash: '17a670bc424ff5ce3b386dbfaae9990b66a2a37b4fbe51547e8794962a3f9e6a',
    asset_type: 'credit_alphanum4',
    asset_code: 'TEST',
    asset_issuer: 'GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB',
    from: 'GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB',
    to: 'GAAJKG3WQKHWZJ5RGVVZMVV6X3XYU7QUH2YVATQ2KBVR2ZJYLG35Z65A',
    amount: '1000000.0000000'
  }

  let expectedOperation = {
    id: '10157597659144',
    sourceAccount: 'GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB',
    type: 'payment',
    createdAt: '2017-03-20T19:50:52Z',
    transactionId: '17a670bc424ff5ce3b386dbfaae9990b66a2a37b4fbe51547e8794962a3f9e6a',
    assetType: 'credit_alphanum4',
    assetIssuer: 'GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB',
    assetCode: 'TEST',
    from: 'GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB',
    to: 'GAAJKG3WQKHWZJ5RGVVZMVV6X3XYU7QUH2YVATQ2KBVR2ZJYLG35Z65A',
    amount: '1000000.0000000'
  }

  let expectedAction = {
    type: 'ADD_PAYMENT_OPERATION',
    accountId: accountId,
    operation: expectedOperation
  }

  const mockDispatch = jest.fn()
  OperationService.dispatch = mockDispatch

  OperationService.processPayment(accountId, rawCreateAccount)

  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0]).toEqual(expectedAction)
})

it('"manage_offer" is parsed correctly', () => {
  let accountId = 'GAMQWR5ULFVVQWCLU7PL6ZCW7M2IQGJP5FY6LG3HXS4XWPM3F5VDN5IV'
  let rawCreateAccount = {
    _links:
      {
        self:
          { href: 'https://horizon-testnet.stellar.org/operations/13237089210369' },
        transaction:
          { href: 'https://horizon-testnet.stellar.org/transactions/6a1e3ff103473d8edbdb05a7a4bd17c9e84c310ff4f52b80596441d9e814e180' },
        effects:
          { href: 'https://horizon-testnet.stellar.org/operations/13237089210369/effects' },
        succeeds:
          { href: 'https://horizon-testnet.stellar.org/effects?order=desc&cursor=13237089210369' },
        precedes:
          { href: 'https://horizon-testnet.stellar.org/effects?order=asc&cursor=13237089210369' }
      },
    id: '13237089210369',
    paging_token: '13237089210369',
    source_account: 'GBU2RKB43SAUK2D2OAHJ5LNP7FXP6LUDSZON2KWQPAWSLZPXECUUUADI',
    type: 'manage_offer',
    type_i: 3,
    created_at: '2017-03-20T20:34:38Z',
    transaction_hash: '6a1e3ff103473d8edbdb05a7a4bd17c9e84c310ff4f52b80596441d9e814e180',
    amount: '1.0000000',
    price: '1.0000000',
    price_r: { n: 1, d: 1 },
    buying_asset_type: 'native',
    selling_asset_type: 'credit_alphanum4',
    selling_asset_code: 'A',
    selling_asset_issuer: 'GAX64FB2RUZLB4YJFRWQ7H27FKYUPK3YGKTS6LNOHMASNOVYJWYYR2G4',
    offer_id: 0
  }

  let expectedOperation = {
    id: '13237089210369',
    sourceAccount: 'GBU2RKB43SAUK2D2OAHJ5LNP7FXP6LUDSZON2KWQPAWSLZPXECUUUADI',
    type: 'manage_offer',
    createdAt: '2017-03-20T20:34:38Z',
    transactionId: '6a1e3ff103473d8edbdb05a7a4bd17c9e84c310ff4f52b80596441d9e814e180',
    offerId: 0,
    amount: '1.0000000',
    price: '1.0000000',
    priceRatio: { n: 1, d: 1 },
    buyingAssetType: 'native',
    buyingAssetIssuer: undefined,
    buyingAssetCode: undefined,
    sellingAssetType: 'credit_alphanum4',
    sellingAssetIssuer: 'GAX64FB2RUZLB4YJFRWQ7H27FKYUPK3YGKTS6LNOHMASNOVYJWYYR2G4',
    sellingAssetCode: 'A',
  }

  let expectedAction = {
    type: 'ADD_MANAGE_OFFER_OPERATION',
    accountId: accountId,
    operation: expectedOperation
  }

  const mockDispatch = jest.fn()
  OperationService.dispatch = mockDispatch

  OperationService.processManageOffer(accountId, rawCreateAccount)

  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0]).toEqual(expectedAction)
})
