import React from 'react';
import { Button, Stack, TextInput } from '@mantine/core';
import { useSetProfile } from '../../../../../../state';
import { modals } from '@mantine/modals';
import { fetchNui } from '../../../../../../utils/fetchNui';
import locales from '../../../../../../locales';
import { queryClient } from '../../../../../../main';
import { PartialProfileData } from '../../../../../../typings';

interface Props {
  image?: string;
}

const AvatarModal: React.FC<Props> = (props) => {
  const setProfile = useSetProfile();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
    setProfile((prev) => {
      if (!prev) return null;

      const image = inputRef.current?.value;

      fetchNui('saveProfileImage', { stateId: prev.stateId, image }, { data: 1 }).then((res) => {
        setIsLoading(false);
        queryClient.setQueriesData<{
          pages: { profiles: PartialProfileData[]; hasMore: boolean }[];
          pageParams: number[];
        }>(['profiles'], (data) => {
          if (!data) return undefined;
          return {
            ...data,
            pages: data.pages.map((page) => ({
              ...page,
              profiles: page.profiles.map((profile) =>
                profile.stateId === prev.stateId ? { ...profile, image } : profile
              ),
            })),
          };
        });
        modals.closeAll();
      });
      return { ...prev, image };
    });
  };

  return (
    <Stack>
      <TextInput
        defaultValue={props.image}
        ref={inputRef}
        label={locales.image}
        description={locales.avatar_description}
        placeholder="https://i.imgur.com/dqopYB9b.jpg"
      />
      <Button variant="light" onClick={handleConfirm} loading={isLoading}>
        Confirm
      </Button>
    </Stack>
  );
};

export default AvatarModal;
