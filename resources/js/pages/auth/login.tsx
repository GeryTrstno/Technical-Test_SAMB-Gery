import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import PasskeyVerify from '@/components/passkey-verify';
import { Boxes } from 'lucide-react';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Masuk" />


            <div className="w-full space-y-6">
                {/* Header Brand */}
                

                {/* Form Card Container */}
                <div className="bg-card p-6 md:p-8 rounded-xl border shadow-sm">
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-5">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-sm font-medium">Alamat Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="email@contoh.com"
                                            className="h-10"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password" className="text-sm font-medium">Kata Sandi</Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="text-xs font-normal"
                                                    tabIndex={5}
                                                >
                                                    Lupa kata sandi?
                                                </TextLink>
                                            )}
                                        </div>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            className="h-10"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center space-x-2 pt-1">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                        />
                                        <Label htmlFor="remember" className="text-xs font-normal text-muted-foreground cursor-pointer">
                                            Ingat saya di perangkat ini
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-2 w-full h-10 font-medium"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner className="mr-2 h-4 w-4" />}
                                        Masuk
                                    </Button>
                                </div>

                                <div className="text-muted-foreground text-center text-xs pt-4 border-t mt-2">
                                    Belum memiliki akun?{' '}
                                    <TextLink href={register()} tabIndex={5} className="font-semibold">
                                        Daftar Akun Baru
                                    </TextLink>
                                </div>
                            </>
                        )}
                    </Form>
                </div>

                {status && (
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 text-center text-xs font-medium text-green-700 dark:text-green-400">
                        {status}
                    </div>
                )}
            </div>
        </>
    );
}

Login.layout = {
    title: 'Masuk - Inventory System',
};