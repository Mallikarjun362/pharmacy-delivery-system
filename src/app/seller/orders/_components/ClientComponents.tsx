'use client';
import { ActionButton } from "@/app/_components/EntityComponent";

export const btn_reject = (
  <ActionButton
    bg="lightblue"
    txt="Reject"
    key={'reject'}
    cb={() => alert('HELLO')}
  />
);
