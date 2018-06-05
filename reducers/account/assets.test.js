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

  let currentState = undefined

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
            operationId: '31726300645306369',
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
            operationId: '31726300645306369',
            amount: '-10000.0000000',
            date: '2018-02-16T07:07:14Z'
          }
        ]
      }
    }
  }

  expect(assetsReducer(currentState, dispatchedAction)).toEqual(expectedState)
})

it("Payment operation increases the asset balance on the receiver side", () => {
  let accountId = 'GAAJKG3WQKHWZJ5RGVVZMVV6X3XYU7QUH2YVATQ2KBVR2ZJYLG35Z65A'

  let currentState = {
    assetsBalanceById: {
      'native:undefined:undefined': {
        balance: '12345.7890123',
        movements: []
      },
      'credit_alphanum4:GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB:TEST': {
        balance: '1.0000002',
        movements: [
          {
            operationId: '1',
            date: '2017-02-20T19:50:52Z',
            amount: '1.0000002'
          }
        ]
      },
    }
  }

  let dispatchedAction = {
    type: 'ADD_OPERATION',
    accountId: accountId,
    operation: {
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
      amount: '1234567.1234567'
    },
    effects: [
      {
        id: '0000010157597659144-0000000001',
        account: 'GAAJKG3WQKHWZJ5RGVVZMVV6X3XYU7QUH2YVATQ2KBVR2ZJYLG35Z65A',
        type: 'account_credited',
        assetType: 'credit_alphanum4',
        assetCode: 'TEST',
        assetIssuer: 'GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB',
        amount: '1234567.1234567',
      },
      {
        id: '0000010157597659144-0000000002',
        account: 'GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB',
        type: 'account_debited',
        assetType: 'credit_alphanum4',
        assetCode: 'TEST',
        assetIssuer: 'GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB',
        amount: '1234567.1234567',
      }
    ]
  }

  let expectedState = {
    assetsBalanceById: {
      'native:undefined:undefined': {
        balance: '12345.7890123',
        movements: []
      },
      'credit_alphanum4:GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB:TEST': {
        balance: '1234568.1234569',
        movements: [
          {
            operationId: '1',
            date: '2017-02-20T19:50:52Z',
            amount: '1.0000002'
          },
          {
            operationId: dispatchedAction.operation.id,
            date: dispatchedAction.operation.createdAt,
            amount: '1234567.1234567'
          }
        ]
      }
    }
  }

  expect(assetsReducer(currentState, dispatchedAction)).toEqual(expectedState)
})

it("Payment operation reduces the asset balance on the sender side", () => {
  let accountId = 'GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB'

  let currentState = {
    assetsBalanceById: {
      'native:undefined:undefined': {
        balance: '12345.7890123',
        movements: []
      },
      'credit_alphanum4:GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB:TEST': {
        balance: '1234567.1234568',
        movements: [
          {
            operationId: '1',
            date: '2017-02-20T19:50:52Z',
            amount: '1234567.1234568'
          }
        ]
      },
    }
  }

  let dispatchedAction = {
    type: 'ADD_OPERATION',
    accountId: accountId,
    operation: {
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
      amount: '1234567.1234567'
    },
    effects: [
      {
        id: '0000010157597659144-0000000001',
        account: 'GAAJKG3WQKHWZJ5RGVVZMVV6X3XYU7QUH2YVATQ2KBVR2ZJYLG35Z65A',
        type: 'account_credited',
        assetType: 'credit_alphanum4',
        assetCode: 'TEST',
        assetIssuer: 'GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB',
        amount: '1234567.1234567',
      },
      {
        id: '0000010157597659144-0000000002',
        account: 'GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB',
        type: 'account_debited',
        assetType: 'credit_alphanum4',
        assetCode: 'TEST',
        assetIssuer: 'GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB',
        amount: '1234567.1234567',
      }
    ]
  }

  let expectedState = {
    assetsBalanceById: {
      'native:undefined:undefined': {
        balance: '12345.7890123',
        movements: []
      },
      'credit_alphanum4:GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB:TEST': {
        balance: '0.0000001',
        movements: [
          {
            operationId: '1',
            date: '2017-02-20T19:50:52Z',
            amount: '1234567.1234568'
          },
          {
            operationId: dispatchedAction.operation.id,
            date: dispatchedAction.operation.createdAt,
            amount: '-1234567.1234567'
          }
        ]
      }
    }
  }

  expect(assetsReducer(currentState, dispatchedAction)).toEqual(expectedState)
})

it("Path payment operation reduces the asset balance on the sender side", () => {
  let accountId = 'GC2QUFK2ZSFWJG55WKTD5Z73L66RX2J26ZB54B2OGJPSRKEDTLQ4XKBL'

  let currentState = {
    assetsBalanceById: {
      'native:undefined:undefined': {
        balance: '12345.7890123',
        movements: []
      },
      'credit_alphanum4:GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB:TEST': {
        balance: '1234567.1234568',
        movements: [
          {
            operationId: '1',
            date: '2017-02-20T19:50:52Z',
            amount: '1234567.1234568'
          }
        ]
      },
    }
  }

  let dispatchedAction = {
    type: 'ADD_OPERATION',
    accountId: accountId,
    operation: {
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
      destinationAmount: '3.0000000',
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
    },
    effects: [
      {
        id: '0034806814398746625-0000000001',
        account: 'GC2QUFK2ZSFWJG55WKTD5Z73L66RX2J26ZB54B2OGJPSRKEDTLQ4XKBL',
        type: 'trade',
        seller: 'GD23QNWY2N6DOO5AGNNNKG46QSOZAFTM4GIAIG7QZJAFSX2EDT7LBKVL',
        offerId: 161886,
        soldAmount: '2.0000000',
        soldAssetType: 'native',
        soldAssetIssuer: undefined,
        soldAssetCode: undefined,
        boughtAmount: '1.0000000',
        boughtAssetType: 'credit_alphanum4',
        boughtAssetCode: 'USD',
        boughtAssetIssuer: 'GC36Q3ZUPX254VPPDWNTJBWLOV3DEZNIIYKVNB3QY4A5WYZYQCEE5UFP',
      },
      {
        id: '0034806814398746625-0000000002',
        account: 'GD23QNWY2N6DOO5AGNNNKG46QSOZAFTM4GIAIG7QZJAFSX2EDT7LBKVL',
        type: 'trade',
        seller: 'GC2QUFK2ZSFWJG55WKTD5Z73L66RX2J26ZB54B2OGJPSRKEDTLQ4XKBL',
        offerId: 161886,
        soldAmount: '1.0000000',
        soldAssetType: 'credit_alphanum4',
        soldAssetCode: 'USD',
        soldAssetIssuer: 'GC36Q3ZUPX254VPPDWNTJBWLOV3DEZNIIYKVNB3QY4A5WYZYQCEE5UFP',
        boughtAmount: '2.0000000',
        boughtAssetType: 'native',
        boughtAssetIssuer: undefined,
        boughtAssetCode: undefined
      },
      {
        id: '0034806814398746625-0000000003',
        account: 'GC2QUFK2ZSFWJG55WKTD5Z73L66RX2J26ZB54B2OGJPSRKEDTLQ4XKBL',
        type: 'trade',
        seller: 'GCUSS3RPQYSJXXJBH2DZQCMLC2NSHKI5QVXCL34CWLOGNYWHGVUE7XPH',
        offerId: 161885,
        soldAmount: '1.0000000',
        soldAssetYype: 'credit_alphanum4',
        soldAssetCode: 'USD',
        soldAssetIssuer: 'GC36Q3ZUPX254VPPDWNTJBWLOV3DEZNIIYKVNB3QY4A5WYZYQCEE5UFP',
        boughtAmount: '3.0000000',
        boughtAssetType: 'credit_alphanum4',
        boughtAssetCode: 'EUR',
        boughtAssetIssuer: 'GC36Q3ZUPX254VPPDWNTJBWLOV3DEZNIIYKVNB3QY4A5WYZYQCEE5UFP',
      },
      {
        id: '0034806814398746625-0000000004',
        account: 'GCUSS3RPQYSJXXJBH2DZQCMLC2NSHKI5QVXCL34CWLOGNYWHGVUE7XPH',
        type: 'trade',
        seller: 'GC2QUFK2ZSFWJG55WKTD5Z73L66RX2J26ZB54B2OGJPSRKEDTLQ4XKBL',
        offerId: 161885,
        soldAmount: '3.0000000',
        soldAssetType: 'credit_alphanum4',
        soldAssetCode: 'EUR',
        soldAssetIssuer: 'GC36Q3ZUPX254VPPDWNTJBWLOV3DEZNIIYKVNB3QY4A5WYZYQCEE5UFP',
        boughtAmount: '1.0000000',
        boughtAssetType: 'credit_alphanum4',
        boughtAssetCode: 'USD',
        boughtAssetIssuer: 'GC36Q3ZUPX254VPPDWNTJBWLOV3DEZNIIYKVNB3QY4A5WYZYQCEE5UFP',
      }
    ]
  }

  let expectedState = {
    assetsBalanceById: {
      'native:undefined:undefined': {
        balance: '12343.7890123',
        movements: [
          {
            operationId: dispatchedAction.operation.id,
            date: dispatchedAction.operation.createdAt,
            amount: '-2.0000000'
          }
        ]
      },
      'credit_alphanum4:GDNFUWF2EO4OWXYLI4TDEH4DXUCN6PB24R6XQW4VATORK6WGMHGRXJVB:TEST': {
        balance: '1234567.1234568',
        movements: [
          {
            operationId: '1',
            date: '2017-02-20T19:50:52Z',
            amount: '1234567.1234568'
          }
        ]
      }
    }
  }

  expect(assetsReducer(currentState, dispatchedAction)).toEqual(expectedState)
})
