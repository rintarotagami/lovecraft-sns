import Link from 'next/link'
import { FaBookSkull } from "react-icons/fa6";
import { FaArrowRight } from 'react-icons/fa'


export default async function SessionPage() {
    return (
        <div className='text-gray-800 p-8 h-dull overflow-y-auto pb-24'>
            <header className='flex justify-between items-center'>
                <Link href='/home/scenario' className='flex items-center gap-2 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gradient-to-r from-purple-200 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300'>
                    <FaBookSkull className='size-5' />
                    <div>マーダーミステリーのシナリオ一覧を見る</div>
                    <FaArrowRight className='ml-2' />
                </Link>
            </header>
        </div>
    );
}