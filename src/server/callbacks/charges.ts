import { oxmysql } from "@communityox/oxmysql";
import { registerAuthorisedCallback } from "../utils/callback";

const chargeCategories: Record<string, string> = {
  'OFFENSES AGAINST PERSONS': 'Offenses Against Persons',
	'OFFENSES INVOLVING THEFT': 'Offenses Involving Theft',
	'OFFENSES INVOLVING FRAUD': 'Offenses Involving Fraud',
	'OFFENSES INVOLVING DAMAGE TO PROPERTY': 'Offenses Involving Damage To Property',
	'OFFENSES AGAINST PUBLIC ADMINISTRATION': 'Offenses Against Public Administration',
	'OFFENSES AGAINST PUBLIC ORDER': 'Offenses Against Public Order',
	'OFFENSES AGAINST HEALTH AND MORALS': 'Offenses Agaisnt Health And Morals',
	'OFFENSES AGAINST PUBLIC SAFETY': 'Offenses Against Public Safety',
	'OFFENSES INVOLVING THE OPERATION OF A VEHICLE': 'Offenses Involving The Operation Of A Vehicle',
	'OFFENSES INVOLVING THE WELL-BEING OF WILDLIFE': 'Offenses Involving The Well-Being Of Wildlife',
};

type ChargeCategoryKey = keyof typeof chargeCategories;

const charges: Record<ChargeCategoryKey, DbCharge[]> = {};

for (let category of Object.keys(chargeCategories)) {
  charges[category] = [];
}

interface DbCharge {
  label: string;
  type: 'misdemeanor' | 'felony' | 'infraction';
  category: ChargeCategoryKey;
  description: string;
  time: number;
  fine: number;
}

oxmysql.ready(async () => {
  const dbCharges = await oxmysql.rawExecute<DbCharge[]>('SELECT * FROM `ox_mdt_offenses`');

  dbCharges.forEach(charge => {
    const category = charge.category;

    charges[category].push(charge);
  });
});

registerAuthorisedCallback('ox_mdt:getAllCharges', () => charges);
