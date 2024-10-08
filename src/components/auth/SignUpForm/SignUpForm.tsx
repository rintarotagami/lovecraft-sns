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
import { FormError } from '@/components/FormError/FormError';

import { signUpSchema } from '@/zod-schemas';
import { useState, useTransition } from 'react';
import { signUp } from '@/actions/auth/sign-up';
import { useRouter } from 'next/navigation'; 

export function SignUpForm() {
    const [error, setError] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();
    const router = useRouter(); 

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

            router.push(`/sign-up/EmailSentSuccess?email=${values.email}`); 
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
                                <Input placeholder='ニックネームを入力してください' {...field} />
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
                                <Input placeholder='test@example.com' {...field} />
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
                                <Input placeholder='英大文字小文字＋数字 10桁以上' {...field} />
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