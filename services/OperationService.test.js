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
    id: '34824857556357125',
    paging_token: '34824857556357125',
    source_account: 'GCR6TSGRME5EA6D6LNUJ4PHXMYHFNRH4JSC7M6WFMJVHFDZDSLT6QULP',
    type: 'manage_offer',
    type_i: 3,
    created_at: '2018-03-26T06:09:32Z',
    transaction_hash: 'e0bae8db8f5d59c568a0af8247711e2993b3809bb31151783ee85dabfde3b429',
    amount: '0.7204998',
    price: '57.2229000',
    price_r: { n: 572229, d: 10000 },
    buying_asset_type: 'credit_alphanum4',
    buying_asset_code: 'LTC',
    buying_asset_issuer: 'GA77B6GK5K3FH2YJ6I5VJ7VPFZKPBQUX2IIC2MJYAERQTGJI4VOPKRYJ',
    selling_asset_type: 'credit_alphanum4',
    selling_asset_code: 'BTC',
    selling_asset_issuer: 'GAX64FB2RUZLB4YJFRWQ7H27FKYUPK3YGKTS6LNOHMASNOVYJWYYR2G4',
    offer_id: 148609
  }

  let expectedOperation = {
    id: '34824857556357125',
    sourceAccount: 'GCR6TSGRME5EA6D6LNUJ4PHXMYHFNRH4JSC7M6WFMJVHFDZDSLT6QULP',
    type: 'manage_offer',
    createdAt: '2018-03-26T06:09:32Z',
    transactionId: 'e0bae8db8f5d59c568a0af8247711e2993b3809bb31151783ee85dabfde3b429',
    offerId: 148609,
    amount: '0.7204998',
    price: '57.2229000',
    priceRatio: { n: 572229, d: 10000 },
    buyingAssetType: 'credit_alphanum4',
    buyingAssetIssuer: 'GA77B6GK5K3FH2YJ6I5VJ7VPFZKPBQUX2IIC2MJYAERQTGJI4VOPKRYJ',
    buyingAssetCode: 'LTC',
    sellingAssetType: 'credit_alphanum4',
    sellingAssetIssuer: 'GAX64FB2RUZLB4YJFRWQ7H27FKYUPK3YGKTS6LNOHMASNOVYJWYYR2G4',
    sellingAssetCode: 'BTC',
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

it('"create_passive_offer" is parsed correctly', () => {
  let accountId = 'GAMQWR5ULFVVQWCLU7PL6ZCW7M2IQGJP5FY6LG3HXS4XWPM3F5VDN5IV'
  let rawCreateAccount = {
    id: '34823581951074305',
    paging_token: '34823581951074305',
    source_account: 'GBMTGMQXBXZS5XJROQQOZB7TU4ACBIXTJJEG7WTXP4ZEARPGQGDWHWIS',
    type: 'create_passive_offer',
    type_i: 4,
    created_at: '2018-03-26T05:44:47Z',
    transaction_hash: '20e018aaa071019a94021bd99bca875816085986d61228b777d5ab5395803409',
    amount: '3636.3636363',
    price: '0.0275000',
    price_r: { n: 11, d: 400 },
    buying_asset_type: 'native',
    selling_asset_type: 'credit_alphanum4',
    selling_asset_code: 'OG',
    selling_asset_issuer: 'GB6ASOXVGN7TJ4XHQX7JRJHWRXLS52R44ZIS77HUCUGVQBTUZRSMIDIW'
  }

  let expectedOperation = {
    id: '34823581951074305',
    sourceAccount: 'GBMTGMQXBXZS5XJROQQOZB7TU4ACBIXTJJEG7WTXP4ZEARPGQGDWHWIS',
    type: 'create_passive_offer',
    createdAt: '2018-03-26T05:44:47Z',
    transactionId: '20e018aaa071019a94021bd99bca875816085986d61228b777d5ab5395803409',
    amount: '3636.3636363',
    price: '0.0275000',
    priceRatio: { n: 11, d: 400 },
    buyingAssetType: 'native',
    buyingAssetIssuer: undefined,
    buyingAssetCode: undefined,
    sellingAssetType: 'credit_alphanum4',
    sellingAssetIssuer: 'GB6ASOXVGN7TJ4XHQX7JRJHWRXLS52R44ZIS77HUCUGVQBTUZRSMIDIW',
    sellingAssetCode: 'OG',
  }

  let expectedAction = {
    type: 'ADD_CREATE_PASSIVE_OFFER_OPERATION',
    accountId: accountId,
    operation: expectedOperation
  }

  const mockDispatch = jest.fn()
  OperationService.dispatch = mockDispatch

  OperationService.processCreatePassiveOffer(accountId, rawCreateAccount)

  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0]).toEqual(expectedAction)
})

it('"set_options" is parsed correctly', () => {
  let accountId = 'GAMQWR5ULFVVQWCLU7PL6ZCW7M2IQGJP5FY6LG3HXS4XWPM3F5VDN5IV'
  let rawCreateAccount = {
    id: '34823135274471425',
    paging_token: '34823135274471425',
    source_account: 'GDGYWCVS2KVYKI4D5RVEDP42MNITYGGA4GSXWO4CWIC5RJUEGGYHJQGH',
    type: 'set_options',
    type_i: 5,
    created_at: '2018-03-26T05:36:07Z',
    transaction_hash: '8fd9ecb42e5639800de2f5de20fe3b1d4182617cebbbf4cf7a886970ac007d4b',
    set_flags: [1],
    set_flags_s: ['auth_required']
  }

  let expectedOperation = {
    id: '34823135274471425',
    sourceAccount: 'GDGYWCVS2KVYKI4D5RVEDP42MNITYGGA4GSXWO4CWIC5RJUEGGYHJQGH',
    type: 'set_options',
    createdAt: '2018-03-26T05:36:07Z',
    transactionId: '8fd9ecb42e5639800de2f5de20fe3b1d4182617cebbbf4cf7a886970ac007d4b',
    flagsSet: ['auth_required'],
    flagsCleared: undefined,
    signerKey: undefined,
    signerWeight: undefined,
    masterKeyWeight: undefined,
    lowThreshold: undefined,
    mediumThreshold: undefined,
    highThreshold: undefined,
    homeDomain: undefined,
  }

  let expectedAction = {
    type: 'ADD_SET_OPTIONS_OPERATION',
    accountId: accountId,
    operation: expectedOperation
  }

  const mockDispatch = jest.fn()
  OperationService.dispatch = mockDispatch

  OperationService.processSetOptions(accountId, rawCreateAccount)

  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0]).toEqual(expectedAction)
})
