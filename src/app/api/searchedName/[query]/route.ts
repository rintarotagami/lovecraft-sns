import { NextResponse,NextRequest } from 'next/server';
import { getSearchedNamesByPartialMatch } from '@/db/searched-name';
import { getUserById } from '@/db/user';

export const GET = async (
    request: NextRequest, 
    { params }: { params: { query: string } }
) => {
    
    const { query } = params;

    if (!query) {
        return NextResponse.json({ error: 'クエリが指定されていません。' }, { status: 400 });
    }

    try {
        const searchedNames = await getSearchedNamesByPartialMatch(query);        

        if (!searchedNames || searchedNames.length === 0) {
            return NextResponse.json({ error: '一致する名前が見つかりませんでした。' }, { status: 404 });
        }

        const results: { name: string; image: string; searchedName: string }[] = await Promise.all(searchedNames.map(async (name) => {
            const user = await getUserById(name.userId);
            return {
                name: user?.name ?? 'Unknown',
                image: user?.image ?? 'No Image',
                searchedName: name.searchedName , 
            };
        }));

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error('エラーが発生しました:', error);
        return NextResponse.json({ error: 'サーバーエラーが発生しました。' }, { status: 500 });
    }
}

export const dynamic = "force-dynamic"
//キャッシュを利用せずに常に最新のデータを取得するように指示