import { Component, ComponentProps } from 'solid-js';
import { classNames } from '../utils/classNames';

type ButtonVariants = 'subtle' | 'primary' | 'tonal';

const variants: Record<ButtonVariants, string> = {
  subtle: 'bg-durple-200 hover:bg-durple-50 text-dark-50 hover:text-white',
  primary: 'bg-cyan-600 hover:bg-cyan-500 text-white',
  tonal: 'bg-sky-600/20 text-sky-300 hover:bg-sky-600/40',
};

interface IconButtonProps extends ComponentProps<'button'> {
  icon: Component;
  variant?: ButtonVariants;
  disabled?: boolean;
}

const IconButton: Component<IconButtonProps> = (props) => {
  return (
    <button
      disabled={props.disabled}
      {...props}
      class={classNames(
        variants[props.variant || 'subtle'],
        'rounded-md p-1 disabled:bg-dark-400 disabled:text-dark-600'
      )}
    >
      <props.icon />
    </button>
  );
};

export default IconButton;
