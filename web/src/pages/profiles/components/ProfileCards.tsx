import React from 'react';
import ProfileCard from './ProfileCard';
import { IconCar, IconCertificate, IconGavel, IconReceipt, IconSword } from '@tabler/icons-react';
import { Badge, Group, Stack } from '@mantine/core';
import ProfileReport from './ProfileReport';
import { useProfile } from '../../../state/profiles/profile';

const ProfileCards: React.FC = () => {
  const profile = useProfile();

  if (!profile) return <></>;

  return (
    <>
      {profile.licenses && (
        <ProfileCard title="Licenses" icon={IconCertificate}>
          <Group spacing={8}>
            {profile.licenses.map((license) =>
              typeof license === 'string' ? (
                <Badge>{license}</Badge>
              ) : (
                <Badge>
                  {license.label} ({license.points} points)
                </Badge>
              )
            )}
          </Group>
        </ProfileCard>
      )}
      {profile.vehicles && (
        <ProfileCard title="Vehicles" icon={IconCar}>
          <Group spacing={8}>
            {profile.vehicles.map((vehicle) => (
              <Badge>
                {vehicle.label} ({vehicle.plate})
              </Badge>
            ))}
          </Group>
        </ProfileCard>
      )}
      {profile.pastCharges && (
        <ProfileCard title="Past charges" icon={IconGavel}>
          <Group spacing={8}>
            {profile.pastCharges.map((charge) => (
              <Badge>
                {charge.count}x {charge.label}
              </Badge>
            ))}
          </Group>
        </ProfileCard>
      )}
      {profile.relatedReports && (
        <ProfileCard title="Related reports" icon={IconReceipt}>
          {/*Might become an issue when there is too many reports?*/}
          <Stack spacing="sm">
            {profile.relatedReports.map((report) => (
              <ProfileReport title={report.title} id={report.id} author={report.author} date={report.date} />
            ))}
          </Stack>
        </ProfileCard>
      )}
    </>
  );
};

export default ProfileCards;
