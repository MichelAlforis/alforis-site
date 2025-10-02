"use client"

import RdvTel   from "@/app/particulier/prendre-rendez-vous/RdvTel"
import RdvVisio from "@/app/particulier/prendre-rendez-vous/RdvVisio"
import RdvPat   from "@/app/particulier/prendre-rendez-vous/RdvPat"

export default function BookingEmded({ type /* "appel" | "visio" | "patrimonial" */ }) {
  switch (type) {
    case "appel":
      return <RdvTel />
    case "visio":
      return <RdvVisio />
    case "patrimonial":
      return <RdvPat />
    default:
      return null
  }
}
