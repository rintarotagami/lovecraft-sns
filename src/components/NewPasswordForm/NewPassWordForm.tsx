'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useTransition, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/FormError/FormError';
import { FormSuccess } from '@/components/FormSuccess/FormSuccess';
import { newPasswordSchema } from '@/schemas/index';
import { newPassword } from '@/actions/new-password';
import { toast } from 'sonner';

export const NewPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
        setError('');
        setSuccess('');

        startTransition(async () => {
            const result = await newPassword(values, token);

            if (!result.isSuccess) {
                setError(result.error.message);
                return;
            }

            setSuccess(result.message);
            toast.success(result.message);
        });
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                router.push('/sign-in');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success, router]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>パスワード</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder='******'
                                        type='password'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button disabled={isPending} type='submit'>
                    パスワードをリセット
                </Button>
            </form>
        </Form>
    );
};