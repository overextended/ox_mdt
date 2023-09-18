import React from 'react';
import ProfileCard from './ProfileCard';
import { IconReceipt } from '@tabler/icons-react';
import { Badge, Group, Stack } from '@mantine/core';
import ProfileReport from './ProfileReport';
import { useProfile } from '../../../../../../state';
import locales from '../../../../../../locales';
import { useProfileCards } from '../../../../../../state/profiles/profileCards';

const ProfileCards: React.FC = () => {
  const profile = useProfile();
  const profileCards = useProfileCards();

  if (!profile) return <></>;

  return (
    <>
      {profileCards.map((card) => (
        <ProfileCard title={card.title} icon={card.icon}>
          <Group spacing={8}>
            {profile[card.id].map((label: string) => (
              <Badge key={label}>{label}</Badge>
            ))}
          </Group>
        </ProfileCard>
      ))}
      {profile.relatedReports && (
        <ProfileCard title={locales.related_reports} icon={IconReceipt}>
          <Stack spacing="sm">
            {profile.relatedReports.map((report) => (
              <ProfileReport
                key={report.id}
                title={report.title}
                id={report.id}
                author={report.author}
                date={report.date}
              />
            ))}
          </Stack>
        </ProfileCard>
      )}
    </>
  );
};

export default ProfileCards;
