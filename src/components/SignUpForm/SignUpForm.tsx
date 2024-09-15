'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUpSchema } from '@/schemas';
import { FormError } from '@/components/FormError/FormError';
import { useState, useTransition } from 'react';
import { signUp } from '@/actions/sign-up';
import { toast } from 'sonner';

export function SignUpForm() {
    const [error, setError] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            nickname: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof signUpSchema>) => {
        setError('');

        startTransition(async () => {
            const result = await signUp(values);

            if (!result.isSuccess) {
                setError(result.error.message);
                return;
            }

            toast.success(result.message);
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='nickname'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ニックネーム</FormLabel>
                            <FormControl>
                                <Input placeholder='ニックネームを入力' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>メールアドレス</FormLabel>
                            <FormControl>
                                <Input placeholder='example@example.com' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>パスワード</FormLabel>
                            <FormControl>
                                <Input placeholder='パスワードを入力' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormError message={error} />
                <Button type='submit' disabled={isPending}>
                    アカウントを作成
                </Button>
            </form>
        </Form>
    );
}