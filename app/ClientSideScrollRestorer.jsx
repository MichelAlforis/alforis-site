'use client';
// app/ClientSideScrollRestorer.jsx
import { useScrollRestorer } from 'next-scroll-restorer';

export default function ClientSideScrollRestorer() {
  useScrollRestorer();
  return null;
}
