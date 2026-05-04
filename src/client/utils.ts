export function SendTypedNUIMessage<T = any>(action: string, data: T) {
  SendNUIMessage({
    action,
    data,
  });
}
