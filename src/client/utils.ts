import { triggerServerCallback } from '@communityox/ox_lib/client';

export const serverNuiCallback = (
  event: string,
  clientCb?: (data: unknown, cb: (data: any) => void) => void
) => {
  RegisterNuiCallback(event, async (data: unknown, cb: (data: any) => void) => {
    const response = await triggerServerCallback<Promise<unknown>>(`ox_mdt:${event}`, null, data);

    if (clientCb) {
      clientCb(response, cb);
    } else {
      cb(response);
    }
  });
};

export function SendTypedNUIMessage<T = any>(action: string, data: T) {
  SendNUIMessage({
    action,
    data,
  });
}
