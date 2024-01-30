'use client';
import { useGlobalContext } from '../_context/store';
import { CSSProperties } from 'react';

export default function HoverTriggerButton({
  the_component = 'CONTENT',
  txt,
  button_style = {},
}: {
  button_style?: CSSProperties;
  the_component?: any;
  txt: string;
}) {
  const { setHoverContent } = useGlobalContext();
  return (
    <button style={button_style} onClick={() => setHoverContent(the_component)}>
      {txt}
    </button>
  );
}
