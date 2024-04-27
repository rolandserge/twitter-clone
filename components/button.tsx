import { ButtonProps } from '@/types'
import React from 'react'

export default function Button({label, fullWidth, secondary, large, outline, disabled, onClick}: ButtonProps) {

    return (
        <button
            onClick={onClick}
            className={`
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-full font-semibold
                hover:opacity-80 transition
                border-2
                ${fullWidth ? 'w-full' : "w-fit"}
                ${secondary ? "bg-white" : "bg-sky-500"}
                ${secondary ? "text-black" : "text-white"}
                ${secondary ? "border-black" : "border-sky-500"}
                ${large ? "text-xl" : "text-md"}
                ${large ? "px-5" : "px-4"}
                ${large ? "py-3" : "py-2"}
                ${outline ? "bg-transparent" : ""}
                ${outline ? "border-white" : ""}
                ${outline ? "text-white" : ""}
            `}
            
        >
            {label}
        </button>
    )
}