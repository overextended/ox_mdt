import { registerAuthorisedCallback } from '../utils/callback';
import { ProfileCard } from '../utils/profileCards';

registerAuthorisedCallback('ox_mdt:getCustomProfileCards', async () => {
  return ProfileCard.getAll();
});
