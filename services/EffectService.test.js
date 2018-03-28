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
