"use client"

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { usePosts } from '@/hooks/usePosts'
import { FormProps } from '@/types'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import Avatar from '../avatar'
import Button from '../button'
import useLoginModal from '@/zustand/useLoginModal'
import useRegisterModal from '@/zustand/useRegisterModal'
import { usePost } from '@/hooks/usePost'

export default function Form({ placeholder, isComment, postId } : FormProps) {

    const { currentUser } = useCurrentUser()
    const { mutate: mutatePosts } = usePosts()
    const { mutate: mutatePost} = usePost(postId as string)
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const [body, setBody] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = useCallback(async() => {
        try {
            setIsLoading(true)

            isComment ? 
                    await axios.post('/api/comment/create', { body, postId })
                :
                    await axios.post('/api/posts/create', { body }) ;

            toast.success('Tweet created successfully')

            setBody('')

            mutatePosts()
            mutatePost()
            
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }, [mutatePosts, body, postId, isComment, mutatePost])

    return (
        <div className='border-b-[1px] border-neutral-800 px-5 py-2 '>
            { currentUser ? (
                <div className='flex flex-row gap-4'>
                    <div>
                        <Avatar userId={currentUser.id as string } />
                    </div>
                    <div className='w-full'>
                        <textarea
                            disabled={isLoading}
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                            className='
                                disabled:opacity-80 peer resize-none mt-3
                                w-full bg-black ring-0 outline-none text-[20px] 
                                placeholder-neutral-500 text-white
                            '
                            placeholder={placeholder}
                        >

                        </textarea>
                        <hr 
                            className='
                                opacity-0 peer-focus:opacity-100 
                                h-[1px] w-full border-neutral-800 transition
                            ' 
                        />
                        <div className='mt-4 flex flex-row justify-end'>
                            <Button
                                label='Tweet'
                                disabled={isLoading || !body}
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='py-8'>
                    <h1 className='text-white text-2xl text-center mb-4 font-bold'>
                        Welcome to Twitter
                    </h1>
                    <div className='flex flex-row items-center justify-center gap-4'>
                        <Button label='Login' onClick={loginModal.onOpen} />
                        <Button label='Register' secondary onClick={registerModal.onOpen} />
                    </div>  
                </div>
            )}
        </div>
    )
}
