/* eslint-disable react/no-unescaped-entities */
'use client'
import { User } from '@prisma/client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
declare global {
    var cloudinary: any
}

interface userProps {
    email: User["email"],
    username: User["username"],
    avatar: User["avatar"],
    password: string
}
const uploadPreset = 'j0xqw6wr';
function Register() {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState();
    const [avatar, setAvatar] = React.useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<userProps>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            avatar: ''
        },
    });;
    const handleUpload = useCallback((result: any) => {
        setAvatar(result.info.secure_url);
        toast.success("Image uploaded successfully!");
    }, []);

    const onSubmit = (data: any) => {
        setIsLoading(true);
        axios.post('/api/register', {
            username: data.username,
            email: data.email,
            password: data.password,
            avatar: avatar
        })
            .then((response) => {
                setIsLoading(false);
                toast.success('Successfully registered!');
                router.push('/login');
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.response.data.message);
            });

    };
    return (
        <>
            <form
            >
                <div>
                    <input type="text" placeholder="username" {
                        ...register("username",
                            {
                                required: true,
                                max: 30,
                                min: 5,
                            }
                        )} />
                </div>
                <div>
                    <input type="email" placeholder="email" {
                        ...register("email",
                            {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Enter a valid e-mail address',
                                },
                            }
                        )} />
                </div>
                <div>
                    <input type="text" placeholder="password" {
                        ...register("password",
                            {
                                required: true,
                                min: 8,
                            }
                        )} />
                </div>
                <CldUploadWidget
                    uploadPreset={uploadPreset}
                    onUpload={handleUpload}
                >
                    {({ open }) => {
                        function handleOnClick(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) {
                            e.preventDefault();
                            open();
                        }

                        return (
                            <div
                                onClick={() => open?.()}
                                className="
                          relative
                          cursor-pointer
                          hover:opacity-70
                          transition
                          border-dashed 
                          border-2 
                          p-14 
                          w-8
                          h-8
                          rounded-md
                          border-neutral-300
                          flex
                          flex-col
                          justify-center
                          items-center
                          gap-4
                          text-neutral-600
                        "
                            >
                                <TbPhotoPlus
                                    size={50}
                                />
                                <div className="font-semibold text-lg">
                                    Click to upload
                                </div>
                            </div>
                        )
                    }}
                </CldUploadWidget>
                <div>
                    <button type="submit" onClick={handleSubmit(onSubmit)}>Register</button>
                </div>
            </form>
            <p>Already have an account
                <em className="hover:cursor-pointer">
                    <Link href='/login'> Sign In</Link>
                </em>
            </p>
        </>
    );
}

export default Register