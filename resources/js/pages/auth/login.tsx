import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle, LogInIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModeToggle } from '@/components/mode-toggle';
import { ThemeProvider } from '@/components/theme-provider';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Head title="Login">
                    <meta name="description" content="Halaman Login" />
                    <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
                </Head>
                <div className="min-h-screen flex">
                    {/* Kiri - Gambar */}
                    <div className="w-7/10 hidden lg:block">
                        <img
                            src="/images/hero.webp"
                            alt="Login Illustration"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="w-full lg:w-[30%] relative flex items-center justify-center p-8">
                        {/* Logo dan Tombol Mode Toggle di atas */}
                        <div className="absolute top-4 left-4">
                            <img src="/images/logo-baru.png" alt="Logo" className="h-20" />
                        </div>
                        <div className="absolute top-4 right-4">
                            <ModeToggle />
                        </div>

                        <div className="max-w-sm w-full space-y-6 mt-20">
                            {/* Judul dan Deskripsi */}
                            <div className="text-center">
                                <h1 className="text-4xl font-semibold text-[color:var(--primary-navy)] dark:text-white">
                                    Masuk ke Akun Anda
                                </h1>
                                <p className="mt-2 text-md text-[color:var(--primary-navy)] dark:text-white">
                                    Masukkan email dan kata sandi Anda di bawah ini
                                </p>
                            </div>

                            {/* Status */}
                            {status && (
                                <div className="text-center text-sm font-medium text-green-600">{status}</div>
                            )}

                            {/* Form */}
                            <form className="space-y-6" onSubmit={submit}>
                                <div>
                                    <Label htmlFor="email">Alamat Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@contoh.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="password">Kata Sandi</Label>
                                        {canResetPassword && (
                                            <TextLink href={route('password.request')} className="text-sm">
                                                Lupa kata sandi?
                                            </TextLink>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Kata sandi"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 dark:text-white" disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                    <LogInIcon className="h-4 w-4 mr-2" /> Masuk
                                </Button>
                            </form>
                        </div>
                    </div>


                </div>
            </ThemeProvider>
        </>
    );
}