/* eslint-disable react/no-unescaped-entities */
'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";


import React from 'react'
import Link from "next/link";

function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            username: '',
            password: ''
        },
    });
    const onSubmit: SubmitHandler<FieldValues> =
        (data) => {
            setIsLoading(true);

            signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((callback) => {
                    setIsLoading(false);

                    if (callback?.ok) {
                        toast.success('Logged in');
                        router.push('/');
                    }

                    if (callback?.error) {
                        toast.error(callback.error);
                    }
                });
        }

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        {...register('username', {
                            required: 'Username is required',
                        })}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', {
                            required: 'Password is required',
                        })}
                    />
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Login'}
                </button>
            </form>
            <div>
                <button
                    onClick={() => signIn('google')}
                >
                    <FcGoogle /> Login with Google
                </button>
                <button
                    onClick={() => signIn('github')}
                >
                    <AiFillGithub /> Login with Github
                </button>
            </div>
            <p>Dont't have account
                <em className="hover:cursor-pointer">
                   <Link href='/register'> Create an account</Link>
                </em>
            </p>

        </div>
    )
}

export default Login
