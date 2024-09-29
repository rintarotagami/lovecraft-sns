"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { createScenario, FormState } from "@/actions/scenario"
import { useFormState, useFormStatus } from "react-dom"
import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { FiPlus, FiMinus, FiChevronDown, FiTrash2 } from "react-icons/fi"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableImagePreview from './DraggableImagePreview/DraggableImagePreview';
import { uploadScenarioSchema, UploadScenarioSchema } from '@/zod-schemas/scenario';
import { useForm } from 'react-hook-form';
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from '@/components/ui/form';

type OptionalFields = 'introduction' | 'tags' | 'url' | 'precaution' | 'prohibition';

const NewScenarioForm = () => {
    const initialState: FormState = { error: '', messages: {} }
    const [state, formAction] = useFormState(createScenario, initialState)
    const [authors, setAuthors] = useState([{ id: '', role: '', name: '', userId: '', description: '' }])
    const [updateHistory, setUpdateHistory] = useState<{ id: string; date: Date; content: string }[]>([])
    const [videoUrls, setVideoUrls] = useState<string[]>([])
    const [showOptional, setShowOptional] = useState({
        introduction: false,
        tags: false,
        url: false,
        precaution: false,
        prohibition: false,
    })
    const [imagePreviews, setImagePreviews] = useState<File[]>([])
    const [isGMless, setIsGMless] = useState(false);

    const form = useForm<UploadScenarioSchema>({
        resolver: zodResolver(uploadScenarioSchema),
        defaultValues: {
            summary: {
                title: '',
                overview: '',
                introduction: '',
                tags: [],
                isGMless: false,
                expectedPlayers: 0,
                expectedPlayTime: '',
                authors: [{ role: '', name: '', userId: '', description: '' }],
                scenarioDetailId: '',
            },
            detail: {
                description: '',
                contents: '',
                url: '',
                precaution: '',
                prohibition: '',
                termsOfUse: '',
                commercialUse: '',
                updateHistory: [],
                videoUrls: [],
            },
            uploadImages: [],
        },
        mode: 'onTouched',
    });

    const handleSubmit = async (data: UploadScenarioSchema) => {
        try {
            console.log("test");
            const formData = new FormData();
            // フォームデータをFormDataに追加
            formData.append('data', JSON.stringify(data));

            // 画像ファイルを追加
            imagePreviews.forEach((file, index) => {
                formData.append(`uploadImages[${index}]`, file);
            });

            // formActionにFormDataを渡す
            await formAction(formData);
        } catch (error) {
            console.error("エラーが発生しました:", error);
        }
    };

    const SubmitButton = () => {
        const { pending } = useFormStatus()

        return (
            <button
                type="submit"
                className="mt-8 py-3 w-full rounded-lg text-white bg-gradient-to-r from-amber-500 to-amber-700 text-sm font-semibold shadow-lg disabled:opacity-50 transition duration-300 ease-in-out hover:shadow-xl"
                disabled={pending}
            >
                作成
            </button>
        )
    }

    const toggleOptional = (field: OptionalFields) => {
        setShowOptional(prev => ({ ...prev, [field]: !prev[field] }))
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            setImagePreviews(prevPreviews => [...prevPreviews, ...Array.from(files)])
        }
    }

    const moveImage = useCallback((dragIndex: number, hoverIndex: number) => {
        setImagePreviews(prevPreviews => {
            const newPreviews = [...prevPreviews];
            const draggedItem = newPreviews[dragIndex];
            newPreviews.splice(dragIndex, 1);
            newPreviews.splice(hoverIndex, 0, draggedItem);
            return newPreviews;
        });
    }, []);

    const removeImage = useCallback((index: number) => {
        setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
    }, []);

    const handleGMlessToggle = () => {
        setIsGMless(!isGMless);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 mx-auto w-full max-w-7xl bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl shadow-2xl">
                <div className="flex flex-col md:flex-row">
                    {/* 左側：画像アップロード */}
                    <div className="w-full md:w-1/3 pr-8 mb-8 md:mb-0">
                        <div className="mb-6">
                            <FormLabel htmlFor="uploadImages" className="block text-lg font-semibold text-amber-900 mb-2">
                                画像
                            </FormLabel>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative overflow-hidden rounded-lg bg-white shadow-md"
                            >
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleImageUpload}
                                />
                                <div className="p-4 text-center">
                                    <FiPlus className="mx-auto text-4xl text-amber-500 mb-2" />
                                    <p className="text-sm text-amber-700">クリックまたはドラッグして画像をアップロード</p>
                                </div>
                            </motion.div>
                        </div>
                        {/* 画像プレビュー */}
                        <DndProvider backend={HTML5Backend}>
                            <p className="text-sm text-amber-700 mb-2">プレビューをドラッグアンドドロップで順番を変更できます</p>
                            <div className="grid grid-cols-2 gap-4">
                                {imagePreviews.map((file, index) => (
                                    <div key={index} className="relative">
                                        <DraggableImagePreview
                                            index={index}
                                            preview={URL.createObjectURL(file)}
                                            moveImage={moveImage}
                                            removeImage={() => removeImage(index)}
                                        />
                                        <div className="absolute top-2 left-2 bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                                            {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </DndProvider>
                    </div>
                    <input
                        type="hidden"
                        name="uploadImages"
                    />

                    {/* 右側：フォーム */}
                    <div className="w-full md:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="summary.title"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel htmlFor="title" className="block text-lg font-semibold text-amber-900 mb-2">
                                            タイトル
                                        </FormLabel>
                                        <FormControl>
                                            <input
                                                type="text"
                                                id="title"
                                                {...field}
                                                className="w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                placeholder="シナリオのタイトルを入力"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="summary.overview"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel htmlFor="overview" className="block text-lg font-semibold text-amber-900 mb-2">
                                            概要
                                        </FormLabel>
                                        <FormControl>
                                            <textarea
                                                id="overview"
                                                {...field}
                                                className="w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                placeholder="シナリオの概要を入力"
                                                rows={4}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="summary.introduction"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <motion.button
                                            type="button"
                                            onClick={() => toggleOptional('introduction')}
                                            className="flex items-center text-amber-700 hover:text-amber-600 font-semibold"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {showOptional.introduction ? <FiMinus className="mr-2" /> : <FiChevronDown className="mr-2" />}
                                            導入
                                        </motion.button>
                                        {showOptional.introduction && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FormControl>
                                                    <textarea
                                                        id="introduction"
                                                        {...field}
                                                        className="mt-2 w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                        placeholder="シナリオの導入を入力（任意）"
                                                        rows={4}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </motion.div>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="summary.expectedPlayers"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="expectedPlayers" className="block text-lg font-semibold text-amber-900 mb-2">
                                            予想プレイヤー数
                                        </FormLabel>
                                        <FormControl>
                                            <input
                                                type="number"
                                                id="expectedPlayers"
                                                {...field}
                                                onChange={(e) => {
                                                    const value = Number(e.target.value);
                                                    if (value > 0) {
                                                        field.onChange(value);
                                                    }
                                                }}
                                                className="w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                placeholder="予想プレイヤー数を入力"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="summary.expectedPlayTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="expectedPlayTime" className="block text-lg font-semibold text-amber-900 mb-2">
                                            予想プレイ時間
                                        </FormLabel>
                                        <FormControl>
                                            <input
                                                type="text"
                                                id="expectedPlayTime"
                                                {...field}
                                                className="w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                placeholder="予想プレイ時間を入力"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="summary.isGMless"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel className="block text-lg font-semibold text-amber-900 mb-2">
                                            GMの有無
                                        </FormLabel>
                                        <FormControl>
                                            <div className="flex items-center rounded-lg">
                                                <button
                                                    type="button"
                                                    onClick={() => form.setValue('summary.isGMless', false)}
                                                    className={`px-3 py-1 rounded-md transition-colors duration-300 ${!form.getValues('summary.isGMless') ? 'bg-amber-500 text-white' : 'text-amber-700 border border-amber-500'
                                                        }`}
                                                >
                                                    GM必要
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => form.setValue('summary.isGMless', true)}
                                                    className={`ml-2 px-3 py-1 rounded-md transition-colors duration-300 ${form.getValues('summary.isGMless') ? 'bg-amber-500 text-white' : 'text-amber-700 border border-amber-500'
                                                        }`}
                                                >
                                                    GM不要
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="summary.tags"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <motion.button
                                            type="button"
                                            onClick={() => toggleOptional('tags')}
                                            className="flex items-center text-amber-700 hover:text-amber-600 font-semibold"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {showOptional.tags ? <FiMinus className="mr-2" /> : <FiChevronDown className="mr-2" />}
                                            タグ
                                        </motion.button>
                                        {showOptional.tags && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FormControl>
                                                    <input
                                                        type="text"
                                                        id="tags"
                                                        {...field}
                                                        className="mt-2 w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                        placeholder="タグをカンマで区切って入力"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </motion.div>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>

                        <hr className="my-8 border-amber-300" />

                        {/* その他のフォーム要素 */}
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="detail.description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="description" className="block text-lg font-semibold text-amber-900 mb-2">
                                            詳細説明
                                        </FormLabel>
                                        <FormControl>
                                            <textarea
                                                id="description"
                                                {...field}
                                                className="w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                placeholder="シナリオの詳細説明を入力"
                                                rows={6}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="detail.contents"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="contents" className="block text-lg font-semibold text-amber-900 mb-2">
                                            内容物
                                        </FormLabel>
                                        <FormControl>
                                            <textarea
                                                id="contents"
                                                {...field}
                                                className="w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                placeholder="シナリオの内容物を入力"
                                                rows={8}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="detail.url"
                                render={({ field }) => (
                                    <FormItem>
                                        <motion.button
                                            type="button"
                                            onClick={() => toggleOptional('url')}
                                            className="flex items-center text-amber-700 hover:text-amber-600 font-semibold"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {showOptional.url ? <FiMinus className="mr-2" /> : <FiChevronDown className="mr-2" />}
                                            URL
                                        </motion.button>
                                        {showOptional.url && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FormControl>
                                                    <input
                                                        type="url"
                                                        id="url"
                                                        {...field}
                                                        className="mt-2 w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                        placeholder="関連URLを入力（任意）"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </motion.div>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="detail.precaution"
                                render={({ field }) => (
                                    <FormItem>
                                        <motion.button
                                            type="button"
                                            onClick={() => toggleOptional('precaution')}
                                            className="flex items-center text-amber-700 hover:text-amber-600 font-semibold"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {showOptional.precaution ? <FiMinus className="mr-2" /> : <FiChevronDown className="mr-2" />}
                                            注意事項
                                        </motion.button>
                                        {showOptional.precaution && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FormControl>
                                                    <textarea
                                                        id="precaution"
                                                        {...field}
                                                        className="mt-2 w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                        placeholder="注意事項を入力（任意）"
                                                        rows={4}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </motion.div>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="detail.prohibition"
                                render={({ field }) => (
                                    <FormItem>
                                        <motion.button
                                            type="button"
                                            onClick={() => toggleOptional('prohibition')}
                                            className="flex items-center text-amber-700 hover:text-amber-600 font-semibold"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {showOptional.prohibition ? <FiMinus className="mr-2" /> : <FiChevronDown className="mr-2" />}
                                            禁止事項
                                        </motion.button>
                                        {showOptional.prohibition && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FormControl>
                                                    <textarea
                                                        id="prohibition"
                                                        {...field}
                                                        className="mt-2 w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                        placeholder="禁止事項を入力（任意）"
                                                        rows={4}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </motion.div>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="detail.termsOfUse"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="termsOfUse" className="block text-lg font-semibold text-amber-900 mb-2">
                                            利用規約
                                        </FormLabel>
                                        <FormControl>
                                            <textarea
                                                id="termsOfUse"
                                                {...field}
                                                className="w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                placeholder="利用規約を入力"
                                                rows={6}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="detail.commercialUse"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="commercialUse" className="block text-lg font-semibold text-amber-900 mb-2">
                                            商用利用
                                        </FormLabel>
                                        <FormControl>
                                            <textarea
                                                id="commercialUse"
                                                {...field}
                                                className="w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                placeholder="商用利用に関する情報を入力"
                                                rows={4}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <hr className="my-8 border-amber-300" />

                        {/* 著者情報 */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-amber-900 mb-4">著者情報</h3>
                            {authors.map((author, index) => (
                                <motion.div
                                    key={index}
                                    className="p-6 bg-white rounded-xl shadow-lg relative overflow-hidden"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name={`summary.authors.${index}.role`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <input
                                                            type="text"
                                                            placeholder="著者の役割"
                                                            {...field}
                                                            className="w-full px-4 py-3 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300 bg-white"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div>
                                            <FormField
                                                control={form.control}
                                                name={`summary.authors.${index}.name`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <input
                                                                type="text"
                                                                placeholder="著者の名前"
                                                                {...field}
                                                                className="w-full px-4 py-3 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300 bg-white"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`summary.authors.${index}.userId`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <input
                                                                type="text"
                                                                placeholder="著者のユーザーID"
                                                                {...field}
                                                                className="w-full px-4 py-3 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300 bg-white"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormMessage>
                                                {form.formState.errors.summary?.authors?.[index]?.root?.message}
                                            </FormMessage>
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name={`summary.authors.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem className="col-span-2">
                                                    <FormControl>
                                                        <textarea
                                                            placeholder="著者の説明"
                                                            {...field}
                                                            className="w-full col-span-2 px-4 py-3 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300 bg-white"
                                                            rows={3}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {authors.length > 1 && (
                                        <motion.button
                                            type="button"
                                            onClick={() => {
                                                const newAuthors = [...authors];
                                                newAuthors.splice(index, 1);
                                                setAuthors(newAuthors);
                                            }}
                                            className="absolute top-2 right-2 text-red-600 hover:text-red-700 transition duration-300"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FiTrash2 size={24} />
                                        </motion.button>
                                    )}
                                </motion.div>
                            ))}
                            <motion.button
                                type="button"
                                onClick={() => {
                                    const newAuthor = { id: '', role: '', name: '', userId: '', description: '' };
                                    setAuthors([...authors, newAuthor]);
                                    form.setValue(`summary.authors.${authors.length}`, newAuthor);
                                }}
                                className="flex items-center text-amber-700 hover:text-amber-600 font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiPlus className="mr-2" />
                                著者を追加
                            </motion.button>
                        </div>

                        <hr className="my-8 border-amber-300" />

                        {/* 更新履歴 */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-amber-900">更新履歴</h3>
                            {updateHistory.map((history, index) => (
                                <motion.div
                                    key={index}
                                    className="p-4 bg-white rounded-lg shadow-md"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name={`detail.updateHistory.${index}.date`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <input
                                                            type="date"
                                                            {...field}
                                                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                                            onChange={(e) => field.onChange(new Date(e.target.value))}
                                                            className="w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`detail.updateHistory.${index}.content`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <textarea
                                                            placeholder="更新内容"
                                                            {...field}
                                                            className="w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                            rows={3}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <motion.button
                                        type="button"
                                        onClick={() => {
                                            const newUpdateHistory = [...updateHistory];
                                            newUpdateHistory.splice(index, 1);
                                            setUpdateHistory(newUpdateHistory);
                                        }}
                                        className="mt-2 flex items-center text-red-600 hover:text-red-700 font-semibold"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FiTrash2 className="mr-2" />
                                        削除
                                    </motion.button>
                                </motion.div>
                            ))}
                            <motion.button
                                type="button"
                                onClick={() => {
                                    const newHistory = { id: '', date: new Date(), content: '' };
                                    setUpdateHistory([...updateHistory, newHistory]);
                                    form.setValue(`detail.updateHistory.${updateHistory.length}`, newHistory);
                                }}
                                className="flex items-center text-amber-700 hover:text-amber-600 font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiPlus className="mr-2" />
                                更新履歴を追加
                            </motion.button>
                        </div>

                        <hr className="my-8 border-amber-300" />

                        {/* 動画URL */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-amber-900">動画URL</h3>
                            {videoUrls.map((url, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-center space-x-2"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`detail.videoUrls.${index}`}
                                        render={({ field }) => (
                                            <FormItem className="flex-grow">
                                                <FormControl>
                                                    <input
                                                        type="url"
                                                        placeholder="動画URL"
                                                        {...field}
                                                        className="w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <motion.button
                                        type="button"
                                        onClick={() => {
                                            const newVideoUrls = [...videoUrls];
                                            newVideoUrls.splice(index, 1);
                                            setVideoUrls(newVideoUrls);
                                        }}
                                        className="flex items-center text-red-600 hover:text-red-700 font-semibold"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FiTrash2 className="mr-2" />
                                        削除
                                    </motion.button>
                                </motion.div>
                            ))}
                            <motion.button
                                type="button"
                                onClick={() => {
                                    setVideoUrls([...videoUrls, '']);
                                    form.setValue(`detail.videoUrls.${videoUrls.length}`, '');
                                }}
                                className="flex items-center text-amber-700 hover:text-amber-600 font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiPlus className="mr-2" />
                                動画URLを追加
                            </motion.button>
                        </div>

                        <hr className="my-8 border-amber-300" />

                        <input type="hidden" name="authors" value={JSON.stringify(authors)} />
                        <input type="hidden" name="updateHistory" value={JSON.stringify(updateHistory)} />
                        <input type="hidden" name="videoUrls" value={JSON.stringify(videoUrls)} />
                        <SubmitButton />
                        {state.error && (
                            <motion.p
                                className="mt-2 text-sm text-red-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {state.error}
                            </motion.p>
                        )}
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default NewScenarioForm
