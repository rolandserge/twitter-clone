"use client"

import React, { useCallback, useState } from 'react'
import Input from '../input'
import Modal from '../modal'
import useRegisterModal from '@/zustand/useRegisterModal'
import useLoginModal from '@/zustand/useLoginModal'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

export default function RegisterModal() {

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const onToggle = useCallback(() => {
        if(isLoading) return

        registerModal.onClose()
        loginModal.onOpen()
    }, [isLoading, loginModal, registerModal])

    const handleSubmit = useCallback(async() => {
        try {
            setIsLoading(true)

            const res = await axios.post('/api/register', { email, password, username, name})
            
            toast.success("Account created with successfully")

            await signIn("credentials", { email, password})

            registerModal.onClose()
        } catch (error) {
            console.log(error)
            toast.error("Error creating account")
        } finally {
            setIsLoading(false)
        }
    }, [registerModal, email, password, username, name])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input
                placeholder='Enter your name here ...'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
            />
            <Input
                placeholder='Enter your username here ...'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
            />
            <Input
                placeholder='Enter your email here ...'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
            />
            <Input
                placeholder='Enter your password here ...'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className='text-neutral-400 text-center mt-4'>
            <p>Already have an account ?</p>
            <span
                className="
                    text-white
                    cursor-pointer hover:underline
                "
                onClick={onToggle}
            >
                Sign In
            </span>
        </div>
    )

    return (
        <>
            <Modal
                disabled={isLoading}
                body={bodyContent}
                footer={footerContent}
                isOpen={registerModal.isOpen}
                onSubmit={handleSubmit}
                onClose={registerModal.onClose}
                title='Create an account'
                actionLabel='Register'
            />
        </>
    )
}
