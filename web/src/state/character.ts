import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Character } from '../typings';
import { isEnvBrowser } from '../utils/misc';

const DEBUG_CHARACTER: Character = {
  stateId: '1993201',
  firstName: 'Svetozar',
  lastName: 'Miletić',
  title: 'LSPD Officer',
  grade: 5,
  callSign: '103',
  group: 'police',
  permissions: {
    create_announcement: true,
    delete_announcement: true,
    create_bolo: true,
    delete_bolo: true,
    change_profile_picture: true,
    edit_profile_notes: true,
    create_report: true,
    delete_report: true,
    edit_report_contents: true,
    edit_report_title: true,
    add_criminal: true,
    remove_criminal: true,
    save_criminal: true,
    add_officer_involved: true,
    add_evidence: true,
    remove_officer_involved: true,
    remove_evidence: true,
    create_unit: true,
    mark_call_completed: true,
    set_call_sign: true,
    set_officer_rank: true,
    fire_officer: true,
    hire_officer: true,
  },
};

const characterAtom = atom<Character>(
  isEnvBrowser()
    ? DEBUG_CHARACTER
    : {
        stateId: '',
        firstName: '',
        lastName: '',
        title: '',
        grade: 0,
        group: '',
        callSign: '',
        permissions: {
          create_announcement: true,
          delete_announcement: true,
          create_bolo: true,
          delete_bolo: true,
          change_profile_picture: true,
          edit_profile_notes: true,
          create_report: true,
          delete_report: true,
          edit_report_contents: true,
          edit_report_title: true,
          add_criminal: true,
          remove_criminal: true,
          save_criminal: true,
          add_officer_involved: true,
          add_evidence: true,
          remove_officer_involved: true,
          remove_evidence: true,
          create_unit: true,
          mark_call_completed: true,
          set_call_sign: true,
          set_officer_rank: true,
          fire_officer: true,
          hire_officer: true,
        },
      }
);

export const useCharacter = () => useAtomValue(characterAtom);
export const useSetCharacter = () => useSetAtom(characterAtom);
export const useCharacterState = () => useAtom(characterAtom);
