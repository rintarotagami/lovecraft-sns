import Link from 'next/link'
import { MdAddTask } from 'react-icons/md'
import { getScenarioSummary } from '@/db/scenario'
import ScenarioCard from '@/components/Scenario/ScenarioCard/ScenarioCard'

let cache: any[] = [];

export default async function ScenarioPage() {
    if (cache.length === 0) {
        cache = await getScenarioSummary();
    }
    const allScenarios = cache;
    // console.log(allScenarios)

    return (
        <div className='text-gray-800 p-8 h-full overflow-y-auto pb-24'>
            <header className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold flex items-center'>全てのシナリオ</h1>
                {/* <Link href='/home/scenario/new' className='flex items-center gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700'>
                    <MdAddTask className='size-5' />
                    <div>シナリオを追加</div>
                </Link> */}
            </header>
            <div className='mt-8 flex flex-wrap gap-4'>
                {allScenarios.map((scenario) => (
                    <ScenarioCard key={scenario.id} scenario={scenario} />
                ))}
            </div>
        </div>
    );
}