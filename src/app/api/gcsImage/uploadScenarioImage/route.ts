import { Storage } from "@google-cloud/storage";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const storage = new Storage({
            projectId: process.env.PROJECT_ID,
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        });
        const bucketName = process.env.BUCKET_NAME ?? '';
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(req.nextUrl.searchParams.get('file') ?? '');
        const options = {
            expires: Date.now() + 1 * 60 * 1000,
            fields: { "x-goog-meta-test": "data" }
        };
        const [response] = await file.generateSignedPostPolicyV4(options);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('シナリオ画像のアップロードに失敗しました', error);
        return NextResponse.json({ error: 'シナリオ画像のアップロードに失敗しました' }, { status: 500 });
    }
}
