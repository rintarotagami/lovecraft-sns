import { Storage } from '@google-cloud/storage';
import { NextRequest, NextResponse } from "next/server"
import { getGCPCredentials } from '@/lib/gcp';

export const GET = async (
    request: NextRequest, 
    { params }: { params: { imageName: string } }
) => {
    try {
        // getGCPCredentialsを使用してStorageインスタンスを作成
        const storage = new Storage(getGCPCredentials());

        const bucketName = process.env.BUCKET_NAME ?? '';
        const folderName = 'userIcons';
        const fileName = `${folderName}/${params.imageName ?? ''}`; 

        if (fileName === `${folderName}/`) {
            // console.log('ファイル名が空です');
            return NextResponse.json({ message: 'ファイル名が空です' }, { status: 400 });
        }

        // console.log('ファイル名:', fileName); // デバッグ用ログ

        const bucket = storage.bucket(bucketName);
        const [files] = await bucket.getFiles({ prefix: folderName });

        const file = files.find(file => file.name === fileName);

        if (!file) {
            return NextResponse.json({ message: 'ファイルが見つかりません' }, { status: 404 });
        }

        // 有効期間を指定してSigned URLを生成する
        const options = {
            version: 'v4' as const,
            action: "read" as const,
            expires: Date.now() + 5 * 60 * 1000, // 5分間有効
        };

        const [url] = await file.getSignedUrl(options);        
        // console.log('署名付きURLを生成しました:', url); // URL生成のログ
        return NextResponse.json({ url }, { status: 200 });
    } catch (error) {
        // console.error('署名付きURLの生成中にエラーが発生しました', error); // エラーログをconsole.errorに変更
        
        return NextResponse.json({ error: '署名付きURLの生成中にエラーが発生しました' }, { status: 500 });
    }
}