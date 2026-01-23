import { Announcement } from '@common/typings';
import { DB } from '../framework/db';
import { OfficerManager } from '../managers/officerManager';
import { registerAuthorisedCallback } from '../utils/callback';
import { off } from 'process';

registerAuthorisedCallback('ox_mdt:getAnnouncements', async (source, page: number) => {
  const announcements = await DB.getAnnouncements([page]);

  return {
    hasMore: announcements.length === 5,
    announcements,
  };
});

registerAuthorisedCallback(
  'ox_mdt:createAnnouncement',
  (source, contents: string) => {
    const officer = OfficerManager.get(source);

    if (!officer) return true;

    return DB.createAnnouncement(officer.stateId, contents);
  },
  'create_announcement'
);

type AnnouncementEditData = {
  id: number;
  announcement: Announcement;
  value: string;
};
registerAuthorisedCallback('ox_mdt:editAnnouncement', async (source, data: AnnouncementEditData) => {
  const officer = OfficerManager.get(source);

  if (!officer) return false;

  const announcement = await DB.selectAnnouncement(data.id);

  if (announcement.creator !== officer.stateId) return;

  return await DB.updateAnnouncementContents(announcement.id, data.value);
});

registerAuthorisedCallback('ox_mdt:deleteAnnouncement', async (source, id) => {
  const officer = OfficerManager.get(source);

  const announcement = await DB.selectAnnouncement(id);

  if (announcement.creator !== officer.stateId) return;

  return await DB.removeAnnouncement(id);
}, 'delete_announcement');
