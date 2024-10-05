'use client'

import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { test } from '@/zod-schemas/scenario';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function Test () {
    const form = useForm<z.infer<typeof test>>({
        resolver: zodResolver(test),
        defaultValues: {
            test: '',
        },
        mode: 'onTouched',
    });

    const onSubmit = async (data: z.infer<typeof test>) => {
        try {
            console.log("test", data);
            // ここにサーバーへの送信処理などを追加できます
        } catch (error) {
            console.error("Error in onSubmit:", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 mx-auto w-full max-w-7xl bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl shadow-2xl">

                <FormField
                    control={form.control}
                    name="test"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel htmlFor="test" className="block text-lg font-semibold text-amber-900 mb-2">
                                test
                            </FormLabel>
                            <FormControl>
                                <input
                                    type="text"
                                    id="test"
                                    {...field}
                                    className="w-full px-4 py-2 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
                                    placeholder="シナリオのタイトルを入力"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>
                    アカウントを作成
                </Button>
            </form>
        </Form>
    )
}


