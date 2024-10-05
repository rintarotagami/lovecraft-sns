import { NextResponse, NextRequest } from 'next/server';
import { getScenariosByPartialMatch } from '@/db/scenario';
import { SelectedScenario } from '@/types/SessionScenarioSchema';

export const GET = async (
    request: NextRequest, 
    { params }: { params: { query: string } }
) => {
    
    const { query } = params;
    console.log(query);
    

    if (!query) {
        return NextResponse.json({ error: 'クエリが指定されていません。' }, { status: 400 });
    }

    try {
        const scenarios = await getScenariosByPartialMatch(query);        

        if (!scenarios || scenarios.length === 0) {
            return NextResponse.json({ error: '一致するシナリオが見つかりませんでした。' }, { status: 404 });
        }

        const results: SelectedScenario[] = scenarios.map((scenario) => ({
            id: scenario.id,
            title: scenario.title,
            expectedPlayers: scenario.expectedPlayers,
            imageNames: scenario.imageNames,
            isGMless: scenario.isGMless,
            expectedPlayTime: scenario.expectedPlayTime,
        }));

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error('エラーが発生しました:', error);
        return NextResponse.json({ error: 'サーバーエラーが発生しました。' }, { status: 500 });
    }
}

export const dynamic = "force-dynamic"
//キャッシュを利用せずに常に最新のデータを取得するように指示
