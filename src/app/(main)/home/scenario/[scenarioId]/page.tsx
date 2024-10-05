import { getScenarioById } from '@/db/scenario';
import { auth } from '@/auth';
import ScenarioImage from '@/app/(main)/home/_components/Scenario/ScenarioImage/ScenarioImage';
import { FaUsers, FaClock, FaExclamationTriangle, FaBan, FaFileAlt, FaVideo, FaInfoCircle } from 'react-icons/fa';

interface Params {
    params: {
        scenarioId: string;
    };
}

export default async function ScenarioSummaryPage({ params }: Params) {
    const session = await auth();
    const scenario = await getScenarioById(params.scenarioId);

    if (!scenario) {
        return <div>シナリオが見つかりませんでした。</div>;
    }

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col">
            <div className='flex flex-col md:flex-row'>
                <div className="md:w-1/3 pr-0 md:pr-6 mb-6 md:mb-0">
                    <ScenarioImage imageName={scenario.imageNames[0]} altText={scenario.title} className="w-full h-full rounded-lg shadow-md" />
                </div>
                <div className="md:w-2/3">
                    <h1 className="text-3xl font-extrabold mb-6 text-gray-800">{scenario.title}</h1>
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-800 flex items-center"><FaInfoCircle className="mr-2" />ストーリー</h2>
                        <p className="mb-4 text-gray-700" style={{ whiteSpace: 'pre-line' }}>{scenario.introduction}</p>
                    </div>
                    <p className="mb-2 text-gray-600 flex items-center"><FaUsers className="mr-2" />プレイ人数: <span className="font-medium ml-1">{scenario.expectedPlayers}人</span></p>
                    <p className="mb-2 text-gray-600 flex items-center"><FaClock className="mr-2" />想定プレイ時間: <span className="font-medium ml-1">{scenario.expectedPlayTime}</span></p>
                    <p className="mb-4 text-gray-600"><span className="font-medium">{scenario.isGMless ? 'ゲームマスターが不要' : 'ゲームマスターが必要'}</span></p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {scenario.tags.map((tag, index) => (
                            <span key={index} className="text-sm bg-blue-200 text-blue-800 rounded-full px-3 py-1 shadow-sm">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
            {scenario.scenarioDetail && (
                <div className="mt-6 bg-white p-6 rounded-lg shadow-inner">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center"><FaFileAlt className="mr-2" />シナリオ詳細</h2>
                    <p className="mb-4 text-gray-700" style={{ whiteSpace: 'pre-line' }}>{scenario.scenarioDetail.contents}</p>
                    {scenario.scenarioDetail.url && <p className="mb-4 text-gray-700">URL: <a href={scenario.scenarioDetail.url} className="text-blue-500 underline">{scenario.scenarioDetail.url}</a></p>}
                    {scenario.scenarioDetail.precaution && <p className="mb-4 text-gray-700" style={{ whiteSpace: 'pre-line' }}><FaExclamationTriangle className="inline-block mr-2" />注意事項: {scenario.scenarioDetail.precaution}</p>}
                    {scenario.scenarioDetail.prohibition && <p className="mb-4 text-gray-700" style={{ whiteSpace: 'pre-line' }}><FaBan className="inline-block mr-2" />禁止事項: {scenario.scenarioDetail.prohibition}</p>}
                    <p className="mb-4 text-gray-700" style={{ whiteSpace: 'pre-line' }}><FaFileAlt className="inline-block mr-2" />利用規約: {scenario.scenarioDetail.termsOfUse}</p>
                    <p className="mb-4 text-gray-700" style={{ whiteSpace: 'pre-line' }}><FaFileAlt className="inline-block mr-2" />商用利用: {scenario.scenarioDetail.commercialUse}</p>
                    {scenario.scenarioDetail.videoUrls.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 flex items-center"><FaVideo className="mr-2" />ビデオURL</h3>
                            <ul className="list-disc list-inside text-blue-500">
                                {scenario.scenarioDetail.videoUrls.map((url, index) => (
                                    <li key={index}><a href={url} className="underline">{url}</a></li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {scenario.scenarioDetail.description && <p className="mb-4 text-gray-700" style={{ whiteSpace: 'pre-line' }}>{scenario.scenarioDetail.description}</p>}
                </div>
            )}
        </div>
    );
}