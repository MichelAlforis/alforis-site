'use client'

import { useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { Input } from '../ui/input'

export default function AddressInput({ value, onSelect }) {
  const [address, setAddress] = useState(value || '')

  const handleSelect = async (val) => {
    setAddress(val)
    try {
      const results = await geocodeByAddress(val)
      const { lat, lng } = await getLatLng(results[0])
      onSelect(val, { lat, lng })
    } catch (err) {
      console.error('Erreur géocodage:', err)
    }
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div className="relative">
          <Input
            {...getInputProps({ placeholder: 'Votre adresse' })}
            className="w-full bg-white"
          />
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-ivoire z-10 shadow-lg">
              {suggestions.map((s, i) => {
                // On extrait 'key' pour éviter le warning React
                const { key, ...restProps } = getSuggestionItemProps(s)
                return (
                  <li
                    key={s.placeId || i}
                    {...restProps}
                    className="px-4 py-2 hover:bg-doré/20 cursor-pointer"
                  >
                    {s.description}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </PlacesAutocomplete>
  )
}
