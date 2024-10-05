import ScenarioImage from '@/components/Scenario/ScenarioImage/ScenarioImage';
import { gameSessionSchema } from '@/zod-schemas/game-session';
import { MdDateRange, MdAccessTime, MdTimer } from 'react-icons/md';
import Link from "next/link";

interface GameSessionCardProps {
    s: typeof gameSessionSchema._type
}

const GameSessionCard: React.FC<GameSessionCardProps> = ({ s }) => {
    return (
        <>
            {s && (
                <Link 
                    href={{ 
                        pathname: `/session/${s.id}`, 
                        query: { gameSession: JSON.stringify(s) } 
                    }} 
                    className="w-64 h-30 p-4 bg-white rounded-md shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow"
                >
                    <div>
                        <header>
                            <h1 className="text-lg font-semibold">{s.scenario?.title}</h1>
                        </header>
                        <div className="mb-5">
                            <ScenarioImage imageName={s.scenario?.imageNames[0] || ''} altText={s.scenario?.title || ''} className="w-full h-32 rounded-lg mb-2" />
                            <h2 className="text-sm">{s.description}</h2>
                        </div>
                    </div>
                    <div>
                        
                        <p className="text-xs flex items-center"><MdDateRange className="mr-1" />プレイ日: {new Date(s.playDate).toLocaleDateString()}</p>
                        <p className="text-xs flex items-center"><MdAccessTime className="mr-1" />開始時間: {s.startTime}</p>
                        <p className="text-xs flex items-center"><MdTimer className="mr-1" />予想プレイ時間: {s.scenario?.expectedPlayTime}</p>
                    </div>
                    {/* <div className="flex justify-between items-center">
                            <div className="flex gap-4">
                                <SessionEditButton id={s.scenarioId || ''} />
                                <SessionDeleteButton id={s.scenarioId || ''} />
                            </div>
                        </div> */}

                </Link>
            )}
        </>
    )
}

export default GameSessionCard
