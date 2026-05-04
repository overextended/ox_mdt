import React from 'react';
import { useVisibilityState } from '../../state/visibility';
import { useSetCharacter } from '../../state';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { default as locales, setLocale } from '../../locales';
import { Character, Charge, CustomProfileData } from '../../typings';
import { fetchNui } from '../../utils/fetchNui';
import { AppShell, Box, createStyles, Transition } from '@mantine/core';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Profiles from './pages/profiles/Profiles';
import Reports from './pages/reports/Reports';
import Dispatch from './pages/dispatch/Dispatch';
import LoaderModal from './components/LoaderModal';
import { ModalsProvider } from '@mantine/modals';
import { useSetProfileCards } from '../../state/profiles/profileCards';
import { useSetCharges } from '../../state/charges';
import Roster from './pages/roster/Roster';
import dayjs from 'dayjs';
import Charges from './pages/charges/Charges';

const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    width: 1650,
    height: 825,
    zIndex: 1,
    ['@media (max-width: 1599px)']: {
      width: 1200,
      height: 700,
    },

    ['@media (max-width: 1279px)']: {
      width: 1000,
      height: 600,
    },
  },
  body: {
    width: 'inherit',
    height: 'inherit',
    backgroundColor: theme.colors.durple[7],
    borderRadius: theme.radius.md,
  },
  main: {
    padding: theme.spacing.xs,
  },
}));

const MDT: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useVisibilityState();
  const setCharacter = useSetCharacter();
  const setProfileCards = useSetProfileCards();
  const setCategoryCharges = useSetCharges();

  useNuiEvent(
    'setInitData',
    async (data: {
      locale: string;
      locales: typeof locales;
      profileCards: CustomProfileData[];
      charges: { [category: string]: Charge[] };
    }) => {
      setLocale(data.locales);
      setProfileCards(data.profileCards);
      setCategoryCharges(data.charges);
      await import(`../../../node_modules/dayjs/locale/${data.locale}.js`);
      dayjs.locale(data.locale);
    }
  );

  useNuiEvent('setVisible', (data?: Character) => {
    setVisible(!!data);
    data && setCharacter(data);
  });

  const handleESC = (e: KeyboardEvent) => {
    if (visible && e.key === 'Escape') {
      setVisible(false);
      fetchNui('hideMDT');
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleESC);

    return () => window.removeEventListener('keydown', handleESC);
  }, [visible]);

  return (
    <>
      <Box className={classes.container}>
        <Transition transition="slide-up" mounted={visible}>
          {(style) => (
            <AppShell
              style={style}
              navbar={<Navbar />}
              fixed={false}
              className="modal-container"
              classNames={{ root: classes.root, body: classes.body, main: classes.main }}
            >
              <ModalsProvider modalProps={{ target: '.modal-container' }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/profiles" element={<Profiles />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/dispatch" element={<Dispatch />} />
                  <Route path="/charges" element={<Charges />} />
                  <Route path="/roster" element={<Roster />} />
                </Routes>
                <LoaderModal />
              </ModalsProvider>
            </AppShell>
          )}
        </Transition>
      </Box>
    </>
  );
};

export default MDT;
