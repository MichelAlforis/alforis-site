// app/ClientSideScrollRestorer.jsx
'use client';

import { useScrollRestorer } from 'next-scroll-restorer';

export default function ClientSideScrollRestorer() {
  useScrollRestorer();
  return null;
}
