import { IconCheck, IconX } from '@tabler/icons-solidjs';
import { Component, JSX, Show, createSignal } from 'solid-js';
import IconButton from './IconButton';
import Button from './Button';

interface ModalProps {
  children: JSX.Element;
}

const Modal: Component = () => {
  const [visible, setVisible] = createSignal(true);

  return (
    <Show when={visible()}>
      <div class="absolute h-full w-full bg-black/20">
        <div class="absolute left-1/2 top-1/2 flex min-w-[250px] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-4 rounded-md bg-durple-200 p-4 font-main text-dark-50 shadow-md">
          <div class="flex w-full items-center justify-between">
            <p class="text-lg font-bold">Title</p>
            <IconButton variant="subtle" icon={IconX} onClick={() => setVisible(false)} />
          </div>
          <p>Content</p>
          <div class="flex justify-end gap-2">
            <Button onClick={() => setVisible(false)} variant="subtle" class="bg-red-500">
              Cancel
            </Button>
            <Button onClick={() => setVisible(false)}>Confirm</Button>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default Modal;
