import SessionEditButton from "@/components/SessionCard/SessionEditButton/SessionEditButton"
import SessionDeleteButton from "@/components/SessionCard/SessionDeleteButton/SessionDeleteButton"
import { GameSessionSummarySchema } from '@/zod-schemas/game-session';

interface GameSessionCardProps {
    s: GameSessionSummarySchema
}

const GameSessionCard: React.FC<GameSessionCardProps> = ({ s }) => {
    return (
        <div className="w-64 h-52 p-4 bg-white rounded-md shadow-md flex flex-col justify-between">
            <header>
                <h1 className="text-lg font-semibold">{s.title}</h1>
            </header>
            <div>
                <div className="text-sm">締切日: {s.dueDate.toLocaleDateString()}</div>
                <div className="text-sm">コミュニケーションタイプ: {s.communicationType}</div>
                <div className="text-sm">資格: {s.qualification}</div>
                <div className="text-sm">シナリオID: {s.scenarioId}</div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                        <SessionEditButton id={s.detailId || ''} />
                        <SessionDeleteButton id={s.detailId || ''} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameSessionCard
