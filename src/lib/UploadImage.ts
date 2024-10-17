import { v4 as uuidv4 } from 'uuid'

export const uploadImg = async (file: File) => {
    const fileName = `scenarioImages/${uuidv4()}`
    const res = await fetch(`/api/uploadScenarioImage?file=${fileName}`)

    const { url, fields } = await res.json();
    const body = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
        body.append(key, value as string | Blob);
    });
    const upload = await fetch(url, { method: "POST", body })

    if (!upload.ok) {
        throw new Error('画像のアップロードに失敗しました')
    }
    return fileName
}
