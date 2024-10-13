"use client"
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/Spinner/Spinner';
import { registerPlayerToSession } from '@/actions/session';
import { toast } from 'sonner';

interface SessionEntryButtonProps {
    sessionId: string
}

const SessionEntryButton = ({ sessionId }: SessionEntryButtonProps) => {
    const [isPending, startTransition] = useTransition();

    const handleRegisterPlayer = async () => {
        startTransition(async () => {
            const result = await registerPlayerToSession(sessionId);
            console.log(result);
            
            if (result.isSuccess) {
                toast.success(result.message);
            } else if (result.error) {
                toast.error(result.error.message);
            }
        })
    };

    return (
        <div className='flex w-fit gap-4'>
            <Button disabled={isPending} type='button' className='w-fit' onClick={handleRegisterPlayer}>
                {(isPending) && <Spinner className='mr-2 h-4 w-4 animate-spin' />}
                このゲームに参加する
            </Button>
            <Button disabled={isPending} type='submit' className='w-fit'>
                {isPending && <Spinner className='mr-2 h-4 w-4 animate-spin' />}
                このゲームを観戦する
            </Button>
        </div>
    )
};

export default SessionEntryButton;
