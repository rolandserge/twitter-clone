"use client"

import useLoginModal from '@/zustand/useLoginModal'
import React, { useCallback, useState } from 'react'
import Input from '../input'
import Modal from '../modal'
import useRegisterModal from '@/zustand/useRegisterModal'
import { signIn } from 'next-auth/react'

export default function LoginModal() {

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const onToggle = useCallback(() => {
        if(isLoading) return

        loginModal.onClose()
        registerModal.onOpen()
    }, [isLoading, loginModal, registerModal])
    

    const handleSubmit = useCallback(async() => {
        try {
            setIsLoading(true)

           await signIn('credentials', { email, password })

            loginModal.onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [loginModal, email, password])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
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
            <p>First time using Twitter ?</p>
            <span
                className="
                    text-white
                    cursor-pointer hover:underline
                "
                onClick={onToggle}
            >
                Create an account
            </span>
        </div>
    )

    return (
        <>
            <Modal
                disabled={isLoading}
                body={bodyContent}
                footer={footerContent}
                isOpen={loginModal.isOpen}
                onSubmit={handleSubmit}
                onClose={loginModal.onClose}
                title='Login'
                actionLabel='Sign in'
            />
        </>
    )
}
