import { useLocation, useNavigate } from '@solidjs/router';
import { Component } from 'solid-js';

export const NavButton: Component<{ label: string; path: string; icon: Component }> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(props.path)}
      class={`transition-color flex w-full gap-4 rounded-md p-4 font-bold duration-150 ${
        location.pathname === props.path
          ? 'bg-sky-600/20 text-sky-300 hover:bg-sky-600/20'
          : 'text-dark-50 hover:bg-durple-200 hover:text-white'
      }`}
    >
      <props.icon />
      {props.label}
    </button>
  );
};

export default NavButton;
