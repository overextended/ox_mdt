import React from 'react';
import ProfileCard from './ProfileCard';
import { IconCar, IconCertificate, IconGavel, IconQuestionMark, IconReceipt } from '@tabler/icons-react';
import { Badge, Group, Stack } from '@mantine/core';
import ProfileReport from './ProfileReport';
import { useProfile } from '../../../../../state';
import locales from '../../../../../locales';
import { useProfileCards } from '../../../../../state/profiles/profileCards';

const ProfileCards: React.FC = () => {
  const profile = useProfile();
  const profileCards = useProfileCards();

  if (!profile) return <></>;

  return (
    <>
      {Object.entries(profileCards).map((entry) => (
        <ProfileCard title={entry[1].title} icon={IconQuestionMark}>
          <Group spacing={8}>
            {profile[entry[0]].map((label: string) => (
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
