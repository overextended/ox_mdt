import { Component, ComponentProps, ParentComponent, JSX } from 'solid-js';
import { classNames } from '../utils/classNames';

type ButtonVariants = 'primary' | 'default' | 'tonal' | 'subtle';

const variants: Record<ButtonVariants, string> = {
  primary: 'bg-sky-600 text-white hover:bg-sky-500',
  default: 'bg-durple-25 text-dark-50 hover:bg-durple-10 hover:text-white',
  tonal: 'bg-sky-600/20 text-sky-300 hover:bg-sky-600/40',
  subtle: 'bg-transparent text-dark-50 hover:bg-durple-25 hover:text-white',
};

interface ButtonProps extends ComponentProps<'button'> {
  leftIcon?: Component;
  rightIcon?: Component;
  variant?: ButtonVariants;
  disabled?: boolean;
  children: JSX.Element;
}

const Button: Component<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      disabled={props.disabled}
      class={classNames(
        variants[props.variant || 'default'],
        'flex items-center justify-center gap-1 rounded-md p-2 disabled:bg-dark-400 disabled:text-dark-600',
        props.class
      )}
    >
      {props?.leftIcon && <props.leftIcon />}
      {props.children}
      {props?.rightIcon && <props.rightIcon />}
    </button>
  );
};

export default Button;
