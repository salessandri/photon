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

  OperationService.parseCreateAccount(accountId, rawCreateAccount)

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

  OperationService.parsePayment(accountId, rawCreateAccount)

  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0]).toEqual(expectedAction)
})

it('"path_payment" is parsed correctly', () => {
  let accountId = 'GAMQWR5ULFVVQWCLU7PL6ZCW7M2IQGJP5FY6LG3HXS4XWPM3F5VDN5IV'
  let rawCreateAccount = {
    id: '34806814398746625',
    paging_token: '34806814398746625',
    source_account: 'GC2QUFK2ZSFWJG55WKTD5Z73L66RX2J26ZB54B2OGJPSRKEDTLQ4XKBL',
    type: 'path_payment',
    type_i: 2,
    created_at: '2018-03-26T00:18:52Z',
    transaction_hash: '6e538492f66a458a51b93bde82dbdc813effe654bb1b02f59be619ebabf42818',
    asset_type: 'credit_alphanum4',
    asset_code: 'EUR',
    asset_issuer: 'GC36Q3ZUPX254VPPDWNTJBWLOV3DEZNIIYKVNB3QY4A5WYZYQCEE5UFP',
    from: 'GC2QUFK2ZSFWJG55WKTD5Z73L66RX2J26ZB54B2OGJPSRKEDTLQ4XKBL',
    to: 'GC3SUVTE2ATAZYPMNHRIYZBHROPR62MX2V4AW4ARC2SQB5QMY4YA4KPL',
    amount: '1.0000000',
    path:
      [{
        asset_type: 'credit_alphanum4',
        asset_code: 'USD',
        asset_issuer: 'GC36Q3ZUPX254VPPDWNTJBWLOV3DEZNIIYKVNB3QY4A5WYZZQCEE5UFP'
      },
      {
        asset_type: 'credit_alphanum4',
        asset_code: 'EUR',
        asset_issuer: 'GC36Q3ZUPX254VPPDWNTJBWLOV3DEZNIIYKVNB3QY4A5WYZYQCEE5UFP'
      }],
    source_max: '20.0000000',
    source_asset_type: 'native'
  }

  let expectedOperation = {
    id: '34806814398746625',
    sourceAccount: 'GC2QUFK2ZSFWJG55WKTD5Z73L66RX2J26ZB54B2OGJPSRKEDTLQ4XKBL',
    type: 'path_payment',
    createdAt: '2018-03-26T00:18:52Z',
    transactionId: '6e538492f66a458a51b93bde82dbdc813effe654bb1b02f59be619ebabf42818',
    destinationAssetType: 'credit_alphanum4',
    destinationAssetIssuer: 'GC36Q3ZUPX254VPPDWNTJBWLOV3DEZNIIYKVNB3QY4A5WYZYQCEE5UFP',
    destinationAssetCode: 'EUR',
    sourceAssetType: 'native',
    sourceAssetIssuer: undefined,
    sourceAssetCode: undefined,
    from: 'GC2QUFK2ZSFWJG55WKTD5Z73L66RX2J26ZB54B2OGJPSRKEDTLQ4XKBL',
    to: 'GC3SUVTE2ATAZYPMNHRIYZBHROPR62MX2V4AW4ARC2SQB5QMY4YA4KPL',
    destinationAmount: '1.0000000',
    sourceMaxAmount: '20.0000000',
    path: [
      {
        assetType: 'credit_alphanum4',
        assetIssuer: 'GC36Q3ZUPX254VPPDWNTJBWLOV3DEZNIIYKVNB3QY4A5WYZZQCEE5UFP',
        assetCode: 'USD'
      },
      {
        assetType: 'credit_alphanum4',
        assetCode: 'EUR',
        assetIssuer: 'GC36Q3ZUPX254VPPDWNTJBWLOV3DEZNIIYKVNB3QY4A5WYZYQCEE5UFP'
      }
    ]
  }

  let expectedAction = {
    type: 'ADD_PATH_PAYMENT_OPERATION',
    accountId: accountId,
    operation: expectedOperation
  }

  const mockDispatch = jest.fn()
  OperationService.dispatch = mockDispatch

  OperationService.parsePathPayment(accountId, rawCreateAccount)

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

  OperationService.parseManageOffer(accountId, rawCreateAccount)

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

  OperationService.parseCreatePassiveOffer(accountId, rawCreateAccount)

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

  OperationService.parseSetOptions(accountId, rawCreateAccount)

  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0]).toEqual(expectedAction)
})

it('"change_trust" is parsed correctly', () => {
  let accountId = 'GAMQWR5ULFVVQWCLU7PL6ZCW7M2IQGJP5FY6LG3HXS4XWPM3F5VDN5IV'
  let rawCreateAccount = {
    id: '34823560476233729',
    paging_token: '34823560476233729',
    source_account: 'GBDKJ5MYONYCYKS3HSKTP33DZGWKDDDJ3OY6TOSOZX7AKJ3YVFSEPJMK',
    type: 'change_trust',
    type_i: 6,
    created_at: '2018-03-26T05:44:22Z',
    transaction_hash: '2cd7c742a3b43b8daf643d13e28ca1685895bfa35049820f0e2f04f7cc834377',
    asset_type: 'credit_alphanum4',
    asset_code: 'OG',
    asset_issuer: 'GB6ASOXVGN7TJ4XHQX7JRJHWRXLS52R44ZIS77HUCUGVQBTUZRSMIDIW',
    limit: '50000000000.0000000',
    trustee: 'GB6ASOXVGN7TJ4XHQX7JRJHWRXLS52R44ZIS77HUCUGVQBTUZRSMIDIW',
    trustor: 'GBDKJ5MYONYCYKS3HSKTP33DZGWKDDDJ3OY6TOSOZX7AKJ3YVFSEPJMK'
  }

  let expectedOperation = {
    id: '34823560476233729',
    sourceAccount: 'GBDKJ5MYONYCYKS3HSKTP33DZGWKDDDJ3OY6TOSOZX7AKJ3YVFSEPJMK',
    type: 'change_trust',
    createdAt: '2018-03-26T05:44:22Z',
    transactionId: '2cd7c742a3b43b8daf643d13e28ca1685895bfa35049820f0e2f04f7cc834377',
    assetType: 'credit_alphanum4',
    assetCode: 'OG',
    assetIssuer: 'GB6ASOXVGN7TJ4XHQX7JRJHWRXLS52R44ZIS77HUCUGVQBTUZRSMIDIW',
    limit: '50000000000.0000000',
    trustee: 'GB6ASOXVGN7TJ4XHQX7JRJHWRXLS52R44ZIS77HUCUGVQBTUZRSMIDIW',
    trustor: 'GBDKJ5MYONYCYKS3HSKTP33DZGWKDDDJ3OY6TOSOZX7AKJ3YVFSEPJMK'
  }

  let expectedAction = {
    type: 'ADD_CHANGE_TRUST_OPERATION',
    accountId: accountId,
    operation: expectedOperation
  }

  const mockDispatch = jest.fn()
  OperationService.dispatch = mockDispatch

  OperationService.parseChangeTrust(accountId, rawCreateAccount)

  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0]).toEqual(expectedAction)
})

it('"allow_trust" is parsed correctly', () => {
  let accountId = 'GAMQWR5ULFVVQWCLU7PL6ZCW7M2IQGJP5FY6LG3HXS4XWPM3F5VDN5IV'
  let rawCreateAccount = {
    id: '34823564771201025',
    paging_token: '34823564771201025',
    source_account: 'GB6ASOXVGN7TJ4XHQX7JRJHWRXLS52R44ZIS77HUCUGVQBTUZRSMIDIW',
    type: 'allow_trust',
    type_i: 7,
    created_at: '2018-03-26T05:44:27Z',
    transaction_hash: '48971e81c3da68ed2f3cf047cd8372b2c68306c50de0ca33be2878f6c3e918b1',
    asset_type: 'credit_alphanum4',
    asset_code: 'OG',
    asset_issuer: 'GB6ASOXVGN7TJ4XHQX7JRJHWRXLS52R44ZIS77HUCUGVQBTUZRSMIDIW',
    trustee: 'GB6ASOXVGN7TJ4XHQX7JRJHWRXLS52R44ZIS77HUCUGVQBTUZRSMIDIW',
    trustor: 'GBDKJ5MYONYCYKS3HSKTP33DZGWKDDDJ3OY6TOSOZX7AKJ3YVFSEPJMK',
    authorize: true
  }

  let expectedOperation = {
    id: '34823564771201025',
    sourceAccount: 'GB6ASOXVGN7TJ4XHQX7JRJHWRXLS52R44ZIS77HUCUGVQBTUZRSMIDIW',
    type: 'allow_trust',
    createdAt: '2018-03-26T05:44:27Z',
    transactionId: '48971e81c3da68ed2f3cf047cd8372b2c68306c50de0ca33be2878f6c3e918b1',
    assetType: 'credit_alphanum4',
    assetCode: 'OG',
    assetIssuer: 'GB6ASOXVGN7TJ4XHQX7JRJHWRXLS52R44ZIS77HUCUGVQBTUZRSMIDIW',
    trustee: 'GB6ASOXVGN7TJ4XHQX7JRJHWRXLS52R44ZIS77HUCUGVQBTUZRSMIDIW',
    trustor: 'GBDKJ5MYONYCYKS3HSKTP33DZGWKDDDJ3OY6TOSOZX7AKJ3YVFSEPJMK',
    authorize: true
  }

  let expectedAction = {
    type: 'ADD_ALLOW_TRUST_OPERATION',
    accountId: accountId,
    operation: expectedOperation
  }

  const mockDispatch = jest.fn()
  OperationService.dispatch = mockDispatch

  OperationService.parseAllowTrust(accountId, rawCreateAccount)

  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0]).toEqual(expectedAction)
})

it('"account_merge" is parsed correctly', () => {
  let accountId = 'GAMQWR5ULFVVQWCLU7PL6ZCW7M2IQGJP5FY6LG3HXS4XWPM3F5VDN5IV'
  let rawCreateAccount = {
    id: '34806625420185601',
    paging_token: '34806625420185601',
    source_account: 'GBI6ETOOH625NEDWPN752FSG2PUS3HHLPTPI5JKNKQCVXRLKKC33L4GP',
    type: 'account_merge',
    type_i: 8,
    created_at: '2018-03-26T00:15:12Z',
    transaction_hash: '24c2febdd241e6c7d312c4ffaa03eb3848e18e25125097cd8b1ac519c68d0261',
    account: 'GBI6ETOOH625NEDWPN752FSG2PUS3HHLPTPI5JKNKQCVXRLKKC33L4GP',
    into: 'GBXQXNLHQESJZTSUB5OK5UVG5M66S6F6DKCMUPN77L4MZ4VYVMLFMTQ4',
  }

  let expectedOperation = {
    id: '34806625420185601',
    sourceAccount: 'GBI6ETOOH625NEDWPN752FSG2PUS3HHLPTPI5JKNKQCVXRLKKC33L4GP',
    type: 'account_merge',
    createdAt: '2018-03-26T00:15:12Z',
    transactionId: '24c2febdd241e6c7d312c4ffaa03eb3848e18e25125097cd8b1ac519c68d0261',
    account: 'GBI6ETOOH625NEDWPN752FSG2PUS3HHLPTPI5JKNKQCVXRLKKC33L4GP',
    into: 'GBXQXNLHQESJZTSUB5OK5UVG5M66S6F6DKCMUPN77L4MZ4VYVMLFMTQ4'
  }

  let expectedAction = {
    type: 'ADD_ACCOUNT_MERGE_OPERATION',
    accountId: accountId,
    operation: expectedOperation
  }

  const mockDispatch = jest.fn()
  OperationService.dispatch = mockDispatch

  OperationService.parseAccountMerge(accountId, rawCreateAccount)

  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0]).toEqual(expectedAction)
})

it('"inflation" is parsed correctly', () => {
  let accountId = 'GAMQWR5ULFVVQWCLU7PL6ZCW7M2IQGJP5FY6LG3HXS4XWPM3F5VDN5IV'
  let rawCreateAccount = {
    id: '34769035866411009',
    paging_token: '34769035866411009',
    source_account: 'GDFVVULVNBTKPHYNYRNZWBIJVE33FNMKES4OWVOW4362LELITDNQSR34',
    type: 'inflation',
    type_i: 9,
    created_at: '2018-03-25T12:05:52Z',
    transaction_hash: '56fff225470dd77387863bd0bf0190227bdbd23842dc3cfd219264a8c0fec1ac',
  }

  let expectedOperation = {
    id: '34769035866411009',
    sourceAccount: 'GDFVVULVNBTKPHYNYRNZWBIJVE33FNMKES4OWVOW4362LELITDNQSR34',
    type: 'inflation',
    createdAt: '2018-03-25T12:05:52Z',
    transactionId: '56fff225470dd77387863bd0bf0190227bdbd23842dc3cfd219264a8c0fec1ac'
  }

  let expectedAction = {
    type: 'ADD_INFLATION_OPERATION',
    accountId: accountId,
    operation: expectedOperation
  }

  const mockDispatch = jest.fn()
  OperationService.dispatch = mockDispatch

  OperationService.parseInflation(accountId, rawCreateAccount)

  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0]).toEqual(expectedAction)
})

it('"manage_data" is parsed correctly', () => {
  let accountId = 'GAMQWR5ULFVVQWCLU7PL6ZCW7M2IQGJP5FY6LG3HXS4XWPM3F5VDN5IV'
  let rawCreateAccount = {
    id: '34820472394747905',
    paging_token: '34820472394747905',
    source_account: 'GD6GAIICLFQOID6SQPRTZWA6NLU4YHSDF7ITBKHH3HRGJERRE3RPHIUD',
    type: 'manage_data',
    type_i: 10,
    created_at: '2018-03-26T04:44:26Z',
    transaction_hash: '93c39a59d0afa588e905b6ba0fad991d9dffeacf28e492435a2b2b2faec4831f',
    name: 'rewardShareSize',
    value: 'MS4w',
  }

  let expectedOperation = {
    id: '34820472394747905',
    sourceAccount: 'GD6GAIICLFQOID6SQPRTZWA6NLU4YHSDF7ITBKHH3HRGJERRE3RPHIUD',
    type: 'manage_data',
    createdAt: '2018-03-26T04:44:26Z',
    transactionId: '93c39a59d0afa588e905b6ba0fad991d9dffeacf28e492435a2b2b2faec4831f',
    name: 'rewardShareSize',
    value: 'MS4w'
  }

  let expectedAction = {
    type: 'ADD_MANAGE_DATA_OPERATION',
    accountId: accountId,
    operation: expectedOperation
  }

  const mockDispatch = jest.fn()
  OperationService.dispatch = mockDispatch

  OperationService.parseManageData(accountId, rawCreateAccount)

  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0]).toEqual(expectedAction)
})
