import { ProfileCardData } from '@common/typings';
import { locale } from '@communityox/ox_lib';
import { DB } from '../framework/db';

export class ProfileCard {
  private static customProfileCards: ProfileCardData[] = [];

  static checkCardExists(card: ProfileCardData) {
    const exists = this.customProfileCards.some((refCard) => refCard.id === card.id);
    if (exists) {
      // Print an error because you're not supposed to try and overwrite a card
      console.error(`Custom Card with id "${card.id}" already exists!`);
    }
    return exists;
  }

  static createCustomCard(data: ProfileCardData | ProfileCardData[]) {
    if (!Array.isArray(data)) data = [data];

    for (const card of data) {
      if (!this.checkCardExists(card)) {
        this.customProfileCards.push(card);
      }
    }
  }

  static getAll() {
    return this.customProfileCards;
  }
}

exports('createProfileCard', ProfileCard.createCustomCard);

ProfileCard.createCustomCard([
  {
    id: 'licenses',
    title: locale('licenses'),
    icon: 'certificate',
    getData: async (profile) => {
      const licenses = await DB.getLicenses([profile.charid]);
      return licenses.map((lic) => (typeof lic === 'string' ? lic : lic.label));
    },
  },
  {
    id: 'vehicles',
    title: locale('vehicles'),
    icon: 'car',
    getData: async (profile) => {
      const vehicles = await DB.getVehicles([profile.charid]);
      return vehicles.map((v) => `${v.label} (${v.plate})`);
    },
  },
  {
    id: 'pastCharges',
    title: locale('past_charges'),
    icon: 'gavel',
    getData: async (profile) => {
      const charges = await DB.getPastCharges(profile.stateId);
      return charges.map((c) => `${c.count}x ${c.label}`);
    },
  },
]);
