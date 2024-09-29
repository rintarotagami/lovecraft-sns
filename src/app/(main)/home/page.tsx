import Link from 'next/link'
import { MdAddTask } from 'react-icons/md'
import { getGameSessionSummary } from '@/db/session'
import SessionCard from '@/components/SessionCard/SessionCard'


export default async function SessionPage() {
    const allGameSessions = await getGameSessionSummary()
    console.log(allGameSessions)

    return (
        <div className='text-gray-800 p-8 h-dull overflow-y-auto pb-24'>
            <header className='flex justify-between items-center'>
                <Link href='/home/scenario' className='flex items-center gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700'>
                    <MdAddTask className='size-5' />
                    <div>シナリオを見る</div>
                </Link>
            </header>
            {/* <div className='md-8 flex flex-wrap gap-4'>
                {allGameSessions.map((session) => (
                    <SessionCard key={session.id} s={session} />
                ))}
            </div> */}
        </div>
    );
}