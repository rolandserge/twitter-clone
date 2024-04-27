import { InputProps } from '@/types'
import React from 'react'

export default function Input({ placeholder, value, onChange, disabled, type} : InputProps) {

    return (
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            required
            onChange={onChange}
            className="
                w-full p-4 text-lg
                bg-black border-2
                border-neutral-800
                rounded-md outline-none
                text-white transition
                focus:border-2
                disabled:bg-neutral-900
                disabled:opacity-70
                disabled:cursor-not-allowed
            "
        />
    )
}
