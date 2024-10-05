"use client"

import { z } from 'zod';
import { createGameSession, FormState } from "@/actions/session"
import { useFormStatus } from "react-dom"
import ScenarioSearchBar from '@/components/SearchBar/ScenarioSearchBar/ScenarioSearchBar';
import ScenarioImage from '@/app/(main)/home/_components/Scenario/ScenarioImage/ScenarioImage';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaInfoCircle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gameSessionSchema } from '@/zod-schemas/game-session';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

const NewSessionForm = () => {
    const initialState: FormState = { error: '' }
    const [selectedScenario, setSelectedScenario] = useState<{ id: string; title: string; expectedPlayers: number; imageNames: string[]; isGMless: Boolean; expectedPlayTime: string; } | null>(null);
    const [scenarioError, setScenarioError] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<z.infer<typeof gameSessionSchema>>({
        resolver: zodResolver(gameSessionSchema),
        defaultValues: {
            playDate: "",
            startTime: "",
            qualification: 'ANYONE',
            scenarioId: selectedScenario?.id || '',
            gms: [],
            description: '',
            isMobileCompatible: false,
            isSpectator: 'NONE',
            players: [],
            spectators: [],
        },
    });

    const onSubmit = async (data: z.infer<typeof gameSessionSchema>) => {
        if (!selectedScenario) {
            setScenarioError('シナリオを選択してください。');
            return;
        } else {
            setScenarioError(null);
            data.scenarioId = selectedScenario.id;
        }

        try {
            const result = await createGameSession(data);

            if (result.isSuccess) {
                toast.success(result.message);
                router.push('/session');
            } else {
                toast.error(result.error.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('エラーが発生しました。');
        }
    };

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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <ScenarioSearchBar setSelectedScenario={setSelectedScenario} />
                    <div className='w-full p-4 bg-gray-100 flex items-center space-x-4'>
                        {selectedScenario ? (
                            <>
                                <ScenarioImage imageName={selectedScenario.imageNames[0]} altText={selectedScenario.title} className="w-16 h-16 rounded-lg" />
                                <div className='flex flex-col'>
                                    <span className='text-gray-500 text-lg font-semibold'>{selectedScenario.title}</span>
                                    <span className='text-gray-500 text-sm'>プレイ人数: {selectedScenario.expectedPlayers}人</span>
                                    <span className='text-gray-500 text-sm'>想定プレイ時間: {selectedScenario.expectedPlayTime}</span>
                                    <span className='text-gray-500 text-sm'>{selectedScenario.isGMless ? 'ゲームマスターが不要' : 'ゲームマスターが必要'}</span>
                                    <Link href={`/home/scenario/${selectedScenario.id}`} className='mt-4 py-2 px-4 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 shadow-md'>
                                        <FaInfoCircle className="inline mr-2" />シナリオ詳細を見る
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <span className='text-red-500 text-sm'>{scenarioError}</span>
                        )}
                    </div>
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>招待文</FormLabel>
                                <FormControl>
                                    <textarea
                                        id="description"
                                        className="mt-2 block py-1.5 px-2 w-full rounded-md border border-gray-300 shadow-sm ring-1 ring-inset ring-gray-300"
                                        defaultValue={selectedScenario ? `一緒に${selectedScenario.title}をプレイしましょう！` : ''}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='playDate'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>プレイ日</FormLabel>
                                <FormControl>
                                    <input
                                        type="date"
                                        id="playDate"
                                        className="mt-2 block py-1.5 px-2 w-full rounded-md border border-gray-300 shadow-sm ring-1 ring-inset ring-gray-300"
                                        min={new Date().toISOString().split('T')[0]} // 今日より前の日付は選べないように設定
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='startTime'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>開始時間</FormLabel>
                                <FormControl>
                                    <input
                                        type="time"
                                        id="startTime"
                                        className="mt-2 block py-1.5 px-2 w-full rounded-md border border-gray-300 shadow-sm ring-1 ring-inset ring-gray-300"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='qualification'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>募集</FormLabel>
                                <FormControl>
                                    <select
                                        id="qualification"
                                        className="mt-2 block w-full rounded-md border border-gray-300 bg-white py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300"
                                        {...field}
                                    >
                                        <option value="ANYONE">誰でも</option>
                                        <option value="MUTUAL_FOLLOW">相互フォロー</option>
                                        <option value="COMMUNITY_MEMBER">コミュニティメンバー</option>
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='isMobileCompatible'
                        render={({ field }) => (
                            <FormItem className='flex flex-row items-center justify-between rounded-lg'>
                                <div className='space-y-0.5'>
                                    <FormLabel>モバイル対応</FormLabel>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='isSpectator'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>観戦</FormLabel>
                                <FormControl>
                                    <select
                                        id="isSpectator"
                                        className="mt-2 block w-full rounded-md border border-gray-300 bg-white py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300"
                                        {...field}
                                    >
                                        <option value="NONE">なし</option>
                                        <option value="ANYONE">誰でも</option>
                                        <option value="MUTUAL_FOLLOW">相互フォロー</option>
                                        <option value="COMMUNITY_MEMBER">コミュニティメンバー</option>
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SubmitButton />
                </form>
            </Form>
        </div>
    )
}

export default NewSessionForm
