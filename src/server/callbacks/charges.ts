import { oxmysql } from '@communityox/oxmysql';
import { registerAuthorisedCallback } from '../utils/callback';
import { CHARGE_CATEGORIES, ChargeCategoryKey, DbCharge } from '@common/typings';

const charges: Record<ChargeCategoryKey, DbCharge[]> = {};

for (let category of Object.keys(CHARGE_CATEGORIES)) {
  charges[category] = [];
}

oxmysql.ready(async () => {
  const dbCharges = await oxmysql.rawExecute<DbCharge[]>('SELECT * FROM `ox_mdt_offenses`');

  dbCharges.forEach((charge) => {
    const category = charge.category;

    charges[category].push(charge);
  });
});

registerAuthorisedCallback('ox_mdt:getAllCharges', () => charges);
