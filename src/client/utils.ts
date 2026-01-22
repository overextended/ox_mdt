import { triggerServerCallback } from '@communityox/ox_lib/client';

export const serverNuiCallback = (event: string) => {
  RegisterNuiCallback(event, async (data: unknown, cb: (data: any) => void) => {
    const response = await triggerServerCallback<Promise<unknown>>(`ox_mdt:${event}`, null, data);
    cb(response);
  });
};

export function SendTypedNUIMessage<T = any>(action: string, data: T) {
  SendNUIMessage({
    action,
    data,
  });
}
