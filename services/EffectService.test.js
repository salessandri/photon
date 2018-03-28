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

it('"account_debited" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034970078990577665-0000000002',
    paging_token: '34970078990577665-2',
    account: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
    type: 'account_debited',
    type_i: 3,
    asset_type: 'native',
    amount: '10000.0000000',
  }

  let expectedEffect = {
    id: '0034970078990577665-0000000002',
    account: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
    type: 'account_debited',
    assetType: 'native',
    assetIssuer: undefined,
    assetCode: undefined,
    amount: '10000.0000000',
  }

  let parsedEffect = EffectService.parseAccountDebited(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"account_thresholds_updated" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034969061083320321-0000000001',
    paging_token: '34969061083320321-1',
    account: 'GCWWC4CDCERQBNORFAWMSKKZOZG3DADS7UXCC2LHRUILRTV2KIUA4X5V',
    type: 'account_thresholds_updated',
    type_i: 4,
    low_threshold: 2,
    med_threshold: 3,
    high_threshold: 5,
  }

  let expectedEffect = {
    id: '0034969061083320321-0000000001',
    account: 'GCWWC4CDCERQBNORFAWMSKKZOZG3DADS7UXCC2LHRUILRTV2KIUA4X5V',
    type: 'account_thresholds_updated',
    lowThreshold: 2,
    mediumThreshold: 3,
    highThreshold: 5
  }

  let parsedEffect = EffectService.parseAccountThresholdsUpdated(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"account_home_domain_updated" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034969550709596161-0000000001',
    paging_token: '34969550709596161-1',
    account: 'GB7ZHXCNHG5IMEHIS2MG54DR3QJIPAQIBFBKZDMCHSDLJYNJNZXKS4SO',
    type: 'account_home_domain_updated',
    type_i: 5,
    home_domain: 'horizon.globalblockchain.io',
  }

  let expectedEffect = {
    id: '0034969550709596161-0000000001',
    account: 'GB7ZHXCNHG5IMEHIS2MG54DR3QJIPAQIBFBKZDMCHSDLJYNJNZXKS4SO',
    type: 'account_home_domain_updated',
    homeDomain: 'horizon.globalblockchain.io'
  }

  let parsedEffect = EffectService.parseAccountHomeDomainUpdated(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"account_flags_updated" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034969550709596161-0000000002',
    paging_token: '34969550709596161-2',
    account: 'GB7ZHXCNHG5IMEHIS2MG54DR3QJIPAQIBFBKZDMCHSDLJYNJNZXKS4SO',
    type: 'account_flags_updated',
    type_i: 6,
    auth_required_flag: true,
  }

  let expectedEffect = {
    id: '0034969550709596161-0000000002',
    account: 'GB7ZHXCNHG5IMEHIS2MG54DR3QJIPAQIBFBKZDMCHSDLJYNJNZXKS4SO',
    type: 'account_flags_updated',
    authRequiredFlag: true,
    authRevocableFlag: undefined,
    authImmutableFlag: undefined
  }

  let parsedEffect = EffectService.parseAccountFlagsUpdated(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"account_inflation_destination_updated" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034969116917899265-0000000001',
    paging_token: '34969116917899265-1',
    account: 'GBKTCGKGJ36T3VOUAMQA24WKYSLC2BXEJIKJABOOLWJQ2LWBH72R4SX6',
    type: 'account_inflation_destination_updated',
    type_i: 7,
  }

  let expectedEffect = {
    id: '0034969116917899265-0000000001',
    account: 'GBKTCGKGJ36T3VOUAMQA24WKYSLC2BXEJIKJABOOLWJQ2LWBH72R4SX6',
    type: 'account_inflation_destination_updated'
  }

  let parsedEffect = EffectService.parseAccountInflationDestinationUpdated(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"signer_created" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034970078990577665-0000000003',
    paging_token: '34970078990577665-3',
    account: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
    type: 'signer_created',
    type_i: 10,
    weight: 1,
    public_key: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
    key: '',
  }

  let expectedEffect = {
    id: '0034970078990577665-0000000003',
    account: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
    type: 'signer_created',
    publicKey: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
    key: '',
    weight: 1
  }

  let parsedEffect = EffectService.parseSignerCreated(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"signer_created" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034969348846141441-0000000002',
    paging_token: '34969348846141441-2',
    account: 'GCWWC4CDCERQBNORFAWMSKKZOZG3DADS7UXCC2LHRUILRTV2KIUA4X5V',
    type: 'signer_updated',
    type_i: 12,
    weight: 1,
    public_key: 'GB43TTNF3FDDT2UH3F62L2BLZXJSDN2UFIDMLDBAAKOLH6ZR6CHZZ6EF',
    key: '',
  }

  let expectedEffect = {
    id: '0034969348846141441-0000000002',
    account: 'GCWWC4CDCERQBNORFAWMSKKZOZG3DADS7UXCC2LHRUILRTV2KIUA4X5V',
    type: 'signer_updated',
    publicKey: 'GB43TTNF3FDDT2UH3F62L2BLZXJSDN2UFIDMLDBAAKOLH6ZR6CHZZ6EF',
    key: '',
    weight: 1
  }

  let parsedEffect = EffectService.parseSignerUpdated(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})
