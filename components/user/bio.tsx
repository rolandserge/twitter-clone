import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useUser } from '@/hooks/useUser'
import { format } from 'date-fns'
import React, { useMemo } from 'react'
import Button from '../button'
import { BiCalendar } from 'react-icons/bi'
import useEditUserModal from '@/zustand/useEditUserModal'
import { useFollow } from '@/hooks/useFollow'

interface BioProps {
    userId: string
}

export default function Bio({ userId } : BioProps ) {
    // avoir la personne qui est connecter
    const { currentUser } = useCurrentUser()
    // avoir les informations sur l'utilisateur qu'on a cliqué dessus
    const { data: user } = useUser(userId)

    const { isFollowing, toggleFollow } = useFollow(userId)

    const editModal = useEditUserModal()

    const createdAt = useMemo(() => {
        if(!user?.createdAt) return null

        return format(new Date(user.createdAt), "MMMM yyyy")
    }, [user?.createdAt])    

    return (
        <div className='border-b-[1px] border-neutral-800 pb-4'>
            <div className='flex justify-end p-2'>
                { currentUser?.id === userId ? (
                    <Button 
                        secondary 
                        label='Edit' 
                        onClick={editModal.onOpen} 
                    />
                ) : (
                    <Button 
                        label={isFollowing ? "Unfollow" : "Follow"} 
                        secondary={!isFollowing}
                        onClick={toggleFollow} 
                        outline={isFollowing}
                    />
                )
                }
            </div>
            <div className='mt-8 px-4'>
                <div className='flex flex-col'>
                    <p className='text-white text-2xl font-semibold'>
                        {user?.name}
                    </p>
                    <p className='text-sm text-neutral-500'>
                        @{user?.username}
                    </p>
                </div>
                <div className='flex flex-col mt-4'>
                    <p className='text-white'>
                        {user?.bio}
                    </p>
                    <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                        <BiCalendar size={24} />
                        <p>
                           Joined {createdAt} 
                        </p>
                    </div>
                </div>
                <div className='flex flex-row items-center mt-4 gap-6'>
                    <div className='flex flex-row items-center gap-1'>
                        <p className='text-white'>
                            {user?.followingIds?.length}
                        </p>
                        <p className='text-neutral-500'>
                            Following
                        </p>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <p className='text-white'>
                            {user?.followinsCount || 0}
                        </p>
                        <p className='text-neutral-500'>
                            Followers
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
