import Link from 'next/link'
import { MdAddTask } from 'react-icons/md'
import { getGameSession } from '@/db/session'
import SessionCard from '@/components/SessionCard/SessionCard'

let cache: any[] = [];

export default async function SessionPage() {
    if (cache.length === 0) {
        cache = await getGameSession();
    }
    const allGameSessions = cache;    

    return (
        <div className='text-gray-800 p-8 h-dull overflow-y-auto pb-24'>
            <header className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold flex items-center'>募集中のセッション一覧</h1>
                <Link href='/session/new' className='flex items-center gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700'>
                    <MdAddTask className='size-5' />
                    <div>新しくセッションを募集する</div>
                </Link>
            </header>
            <div className='md-8 flex flex-wrap gap-4'>
                {allGameSessions.map((session) => (
                    <SessionCard s={session} />
                ))}
            </div>
        </div>
    );
}