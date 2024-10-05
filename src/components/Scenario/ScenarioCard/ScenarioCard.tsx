import { ScenarioSummarySchema } from '@/zod-schemas/scenario';
import Link from 'next/link';
import ScenarioImage from '@/components/Scenario/ScenarioImage/ScenarioImage';
import Loading from '@/components/Scenario/ScenarioImage/loading/loading';


interface ScenarioCardProps {
    scenario: ScenarioSummarySchema
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario }) => {
    return (
        <Link href={`/home/scenario/${scenario.id}`} className="w-64 h-30 p-4 bg-white rounded-md shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
            <header>
                <h1 className="text-lg font-semibold">{scenario.title}</h1>
            </header>
            <div>

                <ScenarioImage imageName={scenario.imageNames[0]} altText={scenario.title} className="w-full h-32 rounded-lg mb-2" />
                <div className="text-xs line-clamp-3">{scenario.introduction}</div>
                <div className="text-xs mt-2">プレイ人数: {scenario.expectedPlayers}人</div>
                <div className="text-xs">想定プレイ時間: {scenario.expectedPlayTime}</div>
                <div className="text-xs">GMなし: {scenario.isGMless ? 'はい' : 'いいえ'}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                    {scenario.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-200 rounded-full px-2 py-1">{tag}</span>
                    ))}
                </div>
            </div>
        </Link>
    )
}

export default ScenarioCard
