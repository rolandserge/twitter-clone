"use client"

import React, { useCallback, useEffect, useState } from 'react'
import Input from '../input'
import Modal from '../modal'
import useEditUserModal from '@/zustand/useEditUserModal'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useUser } from '@/hooks/useUser'
import axios from 'axios'
import toast from 'react-hot-toast'
import ImageUpload from '../imageUpload'

export default function EditUserModal() {

    const { currentUser } = useCurrentUser()
    const { data: user} = useUser(currentUser?.id as string)

    const editModal = useEditUserModal()

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        setName(user?.name)
        setUsername(user?.username)
        setBio(user?.bio)
        setCoverImage(user?.coverImage)
        setProfileImage(user?.profileImage)
    }, [user])

    const handleSubmit = useCallback(async() => {
        try {
            setIsLoading(true)

            await axios.patch('/api/users/edit', { name, username, bio, coverImage, profileImage })

            toast.success('Updated profile')

            editModal.onClose()
        } catch (error) {
            console.log(error)
            toast.error("Une erreur est survenu la modification du compte")
        } finally {
            setIsLoading(false)
        }
    }, [editModal, name, username, bio, coverImage, profileImage])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <ImageUpload
                value={profileImage}
                disabled={isLoading}
                onChange={(image) => setProfileImage(image)}
                label='Upload profile image'
            />
            <ImageUpload
                value={coverImage}
                disabled={isLoading}
                onChange={(image) => setCoverImage(image)}
                label='Upload cover image'
            />
            <Input
                placeholder='Enter your nom here ...'
                value={name}
                type='text'
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
            />
            <Input
                placeholder='Enter your username here ...'
                value={username}
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
            />
            <Input
                placeholder='Enter your bio here ...'
                value={bio}
                type='text'
                onChange={(e) => setBio(e.target.value)}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <>
            <Modal
                title='Edit your profile'
                actionLabel='Save Profile'
                isOpen={editModal.isOpen}
                disabled={isLoading}
                onClose={editModal.onClose}
                body={bodyContent}
                onSubmit={handleSubmit}
            />
        </>
    )
}
