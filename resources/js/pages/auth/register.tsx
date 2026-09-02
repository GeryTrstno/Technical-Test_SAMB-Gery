import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Boxes, UserPlus, ArrowRight } from 'lucide-react';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Daftar Akun" />

            <div className="relative w-full max-w-md mx-auto space-y-6 py-6">
                {/* Background Glow Effect */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />


                {/* Form Card */}
                <div className="bg-card/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border shadow-lg space-y-6">
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="flex flex-col gap-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-4">
                                    {/* Name Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium">Nama Lengkap</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder="Nama lengkap Anda"
                                            className="h-10 bg-background/50 focus-visible:ring-primary"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium">Alamat Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder="email@contoh.com"
                                            className="h-10 bg-background/50 focus-visible:ring-primary"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Password Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-sm font-medium">Kata Sandi</Label>
                                        <PasswordInput
                                            id="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="••••••••"
                                            passwordrules={passwordRules}
                                            className="h-10 bg-background/50 focus-visible:ring-primary"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation" className="text-sm font-medium">Konfirmasi Kata Sandi</Label>
                                        <PasswordInput
                                            id="password_confirmation"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            name="password_confirmation"
                                            placeholder="••••••••"
                                            passwordrules={passwordRules}
                                            className="h-10 bg-background/50 focus-visible:ring-primary"
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="w-full h-10 font-semibold gap-2 mt-2 shadow-sm transition-all"
                                        tabIndex={5}
                                        disabled={processing}
                                        data-test="register-user-button"
                                    >
                                        {processing ? (
                                            <Spinner className="h-4 w-4" />
                                        ) : (
                                            <>
                                                Daftar Akun <ArrowRight className="h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {/* Login Footer Link */}
                                <div className="text-muted-foreground text-center text-xs pt-4 border-t">
                                    Sudah memiliki akun?{' '}
                                    <TextLink href={login()} tabIndex={6} className="font-semibold text-primary underline-offset-4 hover:underline">
                                        Masuk di Sini
                                    </TextLink>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
}

Register.layout = {
    title: 'Daftar Akun - Inventory System',
};