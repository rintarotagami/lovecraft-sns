import { ScenarioSummarySchema } from '@/zod-schemas/scenario';
import Link from 'next/link';

interface ScenarioCardProps {
    scenario: ScenarioSummarySchema
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario }) => {
    return (
        <Link href={`/scenario/${scenario.scenarioDetailId}`} className="w-64 h-64 p-4 bg-white rounded-md shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
            <header>
                <h1 className="text-lg font-semibold">{scenario.title}</h1>
            </header>
            <div>
                <div className="text-sm line-clamp-2">{scenario.overview}</div>
                <div className="text-sm mt-2">プレイ人数: {scenario.expectedPlayers}人</div>
                <div className="text-sm">想定プレイ時間: {scenario.expectedPlayTime}</div>
                <div className="text-sm">GMなし: {scenario.isGMless ? 'はい' : 'いいえ'}</div>
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
