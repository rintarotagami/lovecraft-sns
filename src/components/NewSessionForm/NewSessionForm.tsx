"use client"

import { createGameSession, FormState } from "@/actions/session"
import { useFormState, useFormStatus } from "react-dom"

const NewSessionForm = () => {
    const initialState: FormState = { error: '' }
    const [state, formAction] = useFormState(createGameSession, initialState)

    const SubmitButton = () => {
        const { pending } = useFormStatus()

        return (
            <button
                type="submit"
                className="mt-8 py-2 w-full rounded-md text-white bg-gray-800 hover:bg-gray-700 text-sm font-semibold shadow-sm disabled:bg-gray-400"
                disabled={pending}
            >
                作成
            </button>
        )
    }

    return (
        <div className="mt-10 mx-auto w-full max-w-sm">
            <form action={formAction} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">
                        タイトル
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="mt-2 block py-1.5 px-2 w-full rounded-md border border-gray-300 shadow-sm ring-1 ring-inset ring-gray-300"
                        placeholder="セッションのタイトルを入力"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium">
                        説明
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        className="mt-2 block py-1.5 px-2 w-full rounded-md border border-gray-300 shadow-sm ring-1 ring-inset ring-gray-300"
                        placeholder="セッションの説明を入力"
                    />
                </div>
                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium">
                        期限
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        min="2020-01-01"
                        max="2999-12-31"
                        required
                        className="mt-2 block py-1.5 px-2 w-full rounded-md border border-gray-300 shadow-sm ring-1 ring-inset ring-gray-300"
                    />
                </div>
                <div>
                    <label htmlFor="communicationType" className="block text-sm font-medium">
                        コミュニケーションタイプ
                    </label>
                    <select
                        id="communicationType"
                        name="communicationType"
                        required
                        className="mt-2 block w-full rounded-md border border-gray-300 bg-white py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300"
                    >
                        <option value="">選択してください</option>
                        <option value="CHAT">チャット</option>
                        <option value="VC">ボイスチャット</option>
                        <option value="IN_PERSON">対面</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="qualification" className="block text-sm font-medium">
                        資格（任意）
                    </label>
                    <select
                        id="qualification"
                        name="qualification"
                        className="mt-2 block w-full rounded-md border border-gray-300 bg-white py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300"
                    >
                        <option value="">選択してください</option>
                        <option value="ANYONE">誰でも</option>
                        <option value="MUTUAL_FOLLOW">相互フォロー</option>
                        <option value="COMMUNITY_MEMBER">コミュニティメンバー</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="scenarioId" className="block text-sm font-medium">
                        シナリオID
                    </label>
                    <input
                        type="text"
                        id="scenarioId"
                        name="scenarioId"
                        required
                        className="mt-2 block py-1.5 px-2 w-full rounded-md border border-gray-300 shadow-sm ring-1 ring-inset ring-gray-300"
                        placeholder="シナリオのIDを入力"
                    />
                </div>
                <div>
                    <label htmlFor="isMobileCompatible" className="inline-flex items-center">
                        <input
                            type="checkbox"
                            id="isMobileCompatible"
                            name="isMobileCompatible"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm">モバイル対応</span>
                    </label>
                </div>
                <div>
                    <label htmlFor="isSpectator" className="block text-sm font-medium">
                        観戦者タイプ（任意）
                    </label>
                    <select
                        id="isSpectator"
                        name="isSpectator"
                        className="mt-2 block w-full rounded-md border border-gray-300 bg-white py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300"
                    >
                        <option value="">選択してください</option>
                        <option value="ANYONE">誰でも</option>
                        <option value="MUTUAL_FOLLOW">相互フォロー</option>
                        <option value="COMMUNITY_MEMBER">コミュニティメンバー</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="ageLimit" className="block text-sm font-medium">
                        年齢制限（任意）
                    </label>
                    <input
                        type="number"
                        id="ageLimit"
                        name="ageLimit"
                        min="0"
                        className="mt-2 block py-1.5 px-2 w-full rounded-md border border-gray-300 shadow-sm ring-1 ring-inset ring-gray-300"
                        placeholder="年齢制限を入力"
                    />
                </div>
                <SubmitButton />
                {state.error && <p className="mt-2 text-sm text-red-500">{state.error}</p>}
            </form>
        </div>
    )}

    export default NewSessionForm
