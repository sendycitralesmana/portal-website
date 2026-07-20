// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, LogInIcon, Mail } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Head title="Lupa Password">
                    <meta name="description" content="Halaman Lupa Password" />
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
                                    Lupa Password
                                </h1>
                                <p className="mt-2 text-lg text-[color:var(--primary-navy)] dark:text-white">
                                    Masukkan email Anda untuk menerima tautan pengaturan ulang kata sandi
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

                                <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white" disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    <Mail className="mr-2 h-4 w-4" /> 
                                    Tautan setel ulang kata sandi email
                                </Button>
                            </form>

                            <div className="text-muted-foreground space-x-1 text-center text-sm">
                                <span>Atau, kembali ke halaman</span>
                                <TextLink href={route('login')}>login</TextLink>
                            </div>

                        </div>
                    </div>

                </div>
            </ThemeProvider>
        </>
        // <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
        //     <Head title="Forgot password" />

        //     {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

        //     <div className="space-y-6">
        //         <form onSubmit={submit}>
        //             <div className="grid gap-2">
        //                 <Label htmlFor="email">Email address</Label>
        //                 <Input
        //                     id="email"
        //                     type="email"
        //                     name="email"
        //                     autoComplete="off"
        //                     value={data.email}
        //                     autoFocus
        //                     onChange={(e) => setData('email', e.target.value)}
        //                     placeholder="email@example.com"
        //                 />

        //                 <InputError message={errors.email} />
        //             </div>

        //             <div className="my-6 flex items-center justify-start">
        //                 <Button className="w-full" disabled={processing}>
        //                     {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
        //                     Email password reset link
        //                 </Button>
        //             </div>
        //         </form>

        //         <div className="text-muted-foreground space-x-1 text-center text-sm">
        //             <span>Or, return to</span>
        //             <TextLink href={route('login')}>log in</TextLink>
        //         </div>
        //     </div>
        // </AuthLayout>
    );
}
