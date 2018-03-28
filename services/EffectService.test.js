import EffectService from './EffectService'

/* eslint-env jest */

it('"account_created" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034970078990577665-0000000001',
    paging_token: '34970078990577665-1',
    account: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
    type: 'account_created',
    type_i: 0,
    starting_balance: '10000.0000000',
  }

  let expectedEffect = {
    id: '0034970078990577665-0000000001',
    account: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
    type: 'account_created',
    startingBalance: '10000.0000000'
  }

  let parsedEffect = EffectService.parseAccountCreated(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"account_removed" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034967523485032449-0000000003',
    paging_token: '34967523485032449-3',
    account: 'GCAVCSO7WF5FPZEOHYTBLIRWH2XD4Y76U3ZO5T64ENVRFQTJN32HUVTI',
    type: 'account_removed',
    type_i: 1,
  }

  let expectedEffect = {
    id: '0034967523485032449-0000000003',
    account: 'GCAVCSO7WF5FPZEOHYTBLIRWH2XD4Y76U3ZO5T64ENVRFQTJN32HUVTI',
    type: 'account_removed'
  }

  let parsedEffect = EffectService.parseAccountRemoved(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"account_credited" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034970031745929217-0000000001',
    paging_token: '34970031745929217-1',
    account: 'GDZXM6232OJYT6B2IQGFASUJEPPIS5I5XROU7MEHGHKLWFVEJ5UPS4CN',
    type: 'account_credited',
    type_i: 2,
    asset_type: 'credit_alphanum4',
    asset_code: 'ATN',
    asset_issuer: 'GCAUZH5OGE4HU4NZPBXX67A66D6DVR2IIZMT2BU635UN5PJXWUPUO3A7',
    amount: '1.0000000',
  }

  let expectedEffect = {
    id: '0034970031745929217-0000000001',
    account: 'GDZXM6232OJYT6B2IQGFASUJEPPIS5I5XROU7MEHGHKLWFVEJ5UPS4CN',
    type: 'account_credited',
    assetType: 'credit_alphanum4',
    assetIssuer: 'GCAUZH5OGE4HU4NZPBXX67A66D6DVR2IIZMT2BU635UN5PJXWUPUO3A7',
    assetCode: 'ATN',
    amount: '1.0000000',
  }

  let parsedEffect = EffectService.parseAccountCredited(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})
