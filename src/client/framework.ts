import type { Officer } from '@common/typings';
import { GetGroup } from '@communityox/ox_core';

export function getOfficerWithTitle(officers: Officer[]) {
  officers.forEach((officer) => {
    const group = GetGroup(officer.group);
    const grade = group.grades[officer.grade];

    officer.title = `${group.label} ${grade}`;
  });

  return officers;
}
