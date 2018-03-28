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

it('"account_created" double dispatched correctly', () => {
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

  let parsedEffect = EffectService.parseEffect(rawEffect)
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

it('"signer_removed" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034946873282281473-0000000001',
    paging_token: '34946873282281473-1',
    account: 'GAPNXKCJQUZ3OFLSCR5XM2EHYWD3CABWORY66UDXJEL3YDZYBFGHU4ZR',
    type: 'signer_removed',
    type_i: 11,
    weight: 0,
    public_key: 'GAPNXKCJQUZ3OFLSCR5XM2EHYWD3CABWORY66UDXJEL3YDZYBFGHU4ZR',
    key: '',
  }

  let expectedEffect = {
    id: '0034946873282281473-0000000001',
    account: 'GAPNXKCJQUZ3OFLSCR5XM2EHYWD3CABWORY66UDXJEL3YDZYBFGHU4ZR',
    type: 'signer_removed',
    publicKey: 'GAPNXKCJQUZ3OFLSCR5XM2EHYWD3CABWORY66UDXJEL3YDZYBFGHU4ZR',
    key: '',
    weight: 0
  }

  let parsedEffect = EffectService.parseSignerRemoved(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"signer_updated" effect is parsed correctly', () => {
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

it('"trustline_created" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034970083285536769-0000000001',
    paging_token: '34970083285536769-1',
    account: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
    type: 'trustline_created',
    type_i: 20,
    asset_type: 'credit_alphanum4',
    asset_code: 'HEIR',
    asset_issuer: 'GBNM2P6S3ZJ37JTHIA36RIJPXEL5SMP55CWRPUFUB5TXGUZUD7UNXMNO',
    limit: '1000000.0000000',
  }

  let expectedEffect = {
    id: '0034970083285536769-0000000001',
    account: 'GCQILV76QLVPFNU3UIW62XEPNAPCSCOM5KVKOUCDQNP7QOFOV4SZ72Q2',
    type: 'trustline_created',
    assetType: 'credit_alphanum4',
    assetIssuer: 'GBNM2P6S3ZJ37JTHIA36RIJPXEL5SMP55CWRPUFUB5TXGUZUD7UNXMNO',
    assetCode: 'HEIR',
    limit: '1000000.0000000',
  }

  let parsedEffect = EffectService.parseTrustlineCreated(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"trustline_removed" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034968077535809537-0000000001',
    paging_token: '34968077535809537-1',
    account: 'GDXOA4HTIKVTDF6TO2TWFMZB44Y44UUBGFQN3WWCWDNN6AEYWHIQYFZW',
    type: 'trustline_removed',
    type_i: 21,
    asset_type: 'credit_alphanum4',
    asset_code: 'CM10',
    asset_issuer: 'GBUJJAYHS64L4RDHPLURQJUKSHHPINSAYXYVMWPEF4LECHDKB2EFMKBX',
    limit: '0.0000000',
  }

  let expectedEffect = {
    id: '0034968077535809537-0000000001',
    account: 'GDXOA4HTIKVTDF6TO2TWFMZB44Y44UUBGFQN3WWCWDNN6AEYWHIQYFZW',
    type: 'trustline_removed',
    assetType: 'credit_alphanum4',
    assetIssuer: 'GBUJJAYHS64L4RDHPLURQJUKSHHPINSAYXYVMWPEF4LECHDKB2EFMKBX',
    assetCode: 'CM10',
    limit: '0.0000000',
  }

  let parsedEffect = EffectService.parseTrustlineRemoved(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"trustline_updated" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034969555004567553-0000000001',
    paging_token: '34969555004567553-1',
    account: 'GBDT76UCEYIFHMOWA2WGGG4R7R4R2GZUH5OMTLTB5NDF6C6L5PFI7KHG',
    type: 'trustline_updated',
    type_i: 22,
    asset_type: 'credit_alphanum4',
    asset_code: 'IBTC',
    asset_issuer: 'GB7ZHXCNHG5IMEHIS2MG54DR3QJIPAQIBFBKZDMCHSDLJYNJNZXKS4SO',
    limit: '999999999.0000000',
  }

  let expectedEffect = {
    id: '0034969555004567553-0000000001',
    account: 'GBDT76UCEYIFHMOWA2WGGG4R7R4R2GZUH5OMTLTB5NDF6C6L5PFI7KHG',
    type: 'trustline_updated',
    assetType: 'credit_alphanum4',
    assetIssuer: 'GB7ZHXCNHG5IMEHIS2MG54DR3QJIPAQIBFBKZDMCHSDLJYNJNZXKS4SO',
    assetCode: 'IBTC',
    limit: '999999999.0000000',
  }

  let parsedEffect = EffectService.parseTrustlineUpdated(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"trustline_authorized" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034969559299526657-0000000001',
    paging_token: '34969559299526657-1',
    account: 'GB7ZHXCNHG5IMEHIS2MG54DR3QJIPAQIBFBKZDMCHSDLJYNJNZXKS4SO',
    type: 'trustline_authorized',
    type_i: 23,
    trustor: 'GBDT76UCEYIFHMOWA2WGGG4R7R4R2GZUH5OMTLTB5NDF6C6L5PFI7KHG',
    asset_type: 'credit_alphanum4',
    asset_code: 'IBTC',
  }

  let expectedEffect = {
    id: '0034969559299526657-0000000001',
    account: 'GB7ZHXCNHG5IMEHIS2MG54DR3QJIPAQIBFBKZDMCHSDLJYNJNZXKS4SO',
    type: 'trustline_authorized',
    assetType: 'credit_alphanum4',
    assetCode: 'IBTC',
    trustor: 'GBDT76UCEYIFHMOWA2WGGG4R7R4R2GZUH5OMTLTB5NDF6C6L5PFI7KHG',
  }

  let parsedEffect = EffectService.parseTrustlineAuthorized(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"trustline_deauthorized" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034943420128567297-0000000001',
    paging_token: '34943420128567297-1',
    account: 'GCJMLJ7ZVJVFBNTJZ2BL4UUHQGVWVRHJ4354PZ3BK6FDMF2KGDLCF7KP',
    type: 'trustline_deauthorized',
    type_i: 24,
    trustor: 'GC7VTRQU5CPV5GVDWBE346LGKWLHE43M5ERW4QQEHZ5KK77H36BDECTN',
    asset_type: 'credit_alphanum4',
    asset_code: 'USD',
  }

  let expectedEffect = {
    id: '0034943420128567297-0000000001',
    account: 'GCJMLJ7ZVJVFBNTJZ2BL4UUHQGVWVRHJ4354PZ3BK6FDMF2KGDLCF7KP',
    type: 'trustline_deauthorized',
    assetType: 'credit_alphanum4',
    assetCode: 'USD',
    trustor: 'GC7VTRQU5CPV5GVDWBE346LGKWLHE43M5ERW4QQEHZ5KK77H36BDECTN',
  }

  let parsedEffect = EffectService.parseTrustlineDeauthorized(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"trade" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034972106215141377-0000000002',
    paging_token: '34972106215141377-2',
    account: 'GBH25RYXAEDKPZUIMC5VJBKNYRUULY5B2LH5NVG6Q3RZPHK5KPFBZX7T',
    type: 'trade',
    type_i: 33,
    seller: 'GCVHU53NNG3GCCZP5W5EFFDRM2SGT4UXS3UABJ6M6TMJL6S74EOKBHXJ',
    offer_id: 145229,
    sold_amount: '0.0028237',
    sold_asset_type: 'credit_alphanum4',
    sold_asset_code: 'LTC',
    sold_asset_issuer: 'GA77B6GK5K3FH2YJ6I5VJ7VPFZKPBQUX2IIC2MJYAERQTGJI4VOPKRYJ',
    bought_amount: '0.0000483',
    bought_asset_type: 'credit_alphanum4',
    bought_asset_code: 'BTC',
    bought_asset_issuer: 'GA77B6GK5K3FH2YJ6I5VJ7VPFZKPBQUX2IIC2MJYAERQTGJI4VOPKRYJ',
  }

  let expectedEffect = {
    id: '0034972106215141377-0000000002',
    account: 'GBH25RYXAEDKPZUIMC5VJBKNYRUULY5B2LH5NVG6Q3RZPHK5KPFBZX7T',
    type: 'trade',
    offerId: 145229,
    seller: 'GCVHU53NNG3GCCZP5W5EFFDRM2SGT4UXS3UABJ6M6TMJL6S74EOKBHXJ',
    soldAmount: '0.0028237',
    soldAssetType: 'credit_alphanum4',
    soldAssetIssuer: 'GA77B6GK5K3FH2YJ6I5VJ7VPFZKPBQUX2IIC2MJYAERQTGJI4VOPKRYJ',
    soldAssetCode: 'LTC',
    boughtAmount: '0.0000483',
    boughtAssetType: 'credit_alphanum4',
    boughtAssetIssuer: 'GA77B6GK5K3FH2YJ6I5VJ7VPFZKPBQUX2IIC2MJYAERQTGJI4VOPKRYJ',
    boughtAssetCode: 'BTC'
  }

  let parsedEffect = EffectService.parseTrade(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"data_created" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034951687940612100-0000000001',
    paging_token: '34951687940612100-1',
    account: 'GCJSP5ZAYKJD3DN2CT5MTAQRIGMOOUJY7OVCNAQKAAOYETZ3GAJ42TAY',
    type: 'data_created',
    type_i: 40,
  }

  let expectedEffect = {
    id: '0034951687940612100-0000000001',
    account: 'GCJSP5ZAYKJD3DN2CT5MTAQRIGMOOUJY7OVCNAQKAAOYETZ3GAJ42TAY',
    type: 'data_created'
  }

  let parsedEffect = EffectService.parseDataCreated(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"data_removed" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034945331389009921-0000000001',
    paging_token: '34945331389009921-1',
    account: 'GCVS5ETD7BHUOZV74T22JSBEQ5K5IH3GE54WQCVEIQJAAPI7DYC7HQ54',
    type: 'data_removed',
    type_i: 41,
  }

  let expectedEffect = {
    id: '0034945331389009921-0000000001',
    account: 'GCVS5ETD7BHUOZV74T22JSBEQ5K5IH3GE54WQCVEIQJAAPI7DYC7HQ54',
    type: 'data_removed'
  }

  let parsedEffect = EffectService.parseDataRemoved(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})

it('"data_updated" effect is parsed correctly', () => {
  let rawEffect = {
    id: '0034951687940612103-0000000001',
    paging_token: '34951687940612103-1',
    account: 'GCJSP5ZAYKJD3DN2CT5MTAQRIGMOOUJY7OVCNAQKAAOYETZ3GAJ42TAY',
    type: 'data_updated',
    type_i: 42,
  }

  let expectedEffect = {
    id: '0034951687940612103-0000000001',
    account: 'GCJSP5ZAYKJD3DN2CT5MTAQRIGMOOUJY7OVCNAQKAAOYETZ3GAJ42TAY',
    type: 'data_updated'
  }

  let parsedEffect = EffectService.parseDataUpdated(rawEffect)
  expect(parsedEffect).toEqual(expectedEffect)
})
