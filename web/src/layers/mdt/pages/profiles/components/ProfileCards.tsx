import React from 'react';
import ProfileCard from './ProfileCard';
import { IconCar, IconCertificate, IconGavel, IconReceipt } from '@tabler/icons-react';
import { Badge, Group, Stack } from '@mantine/core';
import ProfileReport from './ProfileReport';
import { useProfile } from '../../../../../state';
import locales from '../../../../../locales';

const ProfileCards: React.FC = () => {
  const profile = useProfile();

  if (!profile) return <></>;

  return (
    <>
      {profile.licenses && (
        <ProfileCard title={locales.licenses} icon={IconCertificate}>
          <Group spacing={8}>
            {profile.licenses.map((license) => (
              <Badge key={license.label}>{license.label}</Badge>
            ))}
          </Group>
        </ProfileCard>
      )}
      {profile.vehicles && (
        <ProfileCard title={locales.vehicles} icon={IconCar}>
          <Group spacing={8}>
            {profile.vehicles.map((vehicle) => (
              <Badge key={vehicle.label}>
                {vehicle.label} ({vehicle.plate})
              </Badge>
            ))}
          </Group>
        </ProfileCard>
      )}
      {profile.pastCharges && (
        <ProfileCard title={locales.past_charges} icon={IconGavel}>
          <Group spacing={8}>
            {profile.pastCharges.map((charge) => (
              <Badge key={charge.label}>
                {charge.count}x {charge.label}
              </Badge>
            ))}
          </Group>
        </ProfileCard>
      )}
      {profile.relatedReports && (
        <ProfileCard title={locales.related_reports} icon={IconReceipt}>
          {/*Might become an issue when there is too many reports?*/}
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
