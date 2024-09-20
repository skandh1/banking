'use client';

import { z } from "zod"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ITEMS } from "@/constants";
import { Divide, Loader2 } from "lucide-react";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";



const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            // sign up with appwrite & create a plainlink token


            if (type === 'sign-in') {

                const Response = await signIn({
                    email: data.email,
                    password: data.password,
                })
                if (Response) {
                    router.push("/")
                }
            }
            if (type === "sign-up") {
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.address1!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    email: data.email,
                    password: data.password
                }
                const newUser = await signUp(userData)
                setUser(newUser)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

        // Simulating successful sign-in
        // console.log(data)
    }

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href="/" className='cursor-pointer flex items-center gap-1'>
                    <Image src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt='images/log'
                    />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1 sidebar-logo '>
                        Horizon
                    </h1>
                </Link>
                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user
                            ? 'link account'
                            : type === "sign-in"
                                ? "sign in"
                                : "sign up"
                        }
                    </h1>
                    <p className="text-16 font-normal text-gray-600">
                        {
                            user ? "Link your account to get started" : "please enter you details"
                        }
                    </p>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4">
                    <PlaidLink user={user} variant="primary" />
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === "sign-up" && (
                                <>
                                    <div className="flex gap-3">

                                        <CustomInput control={form.control} name='firstName' label={"First Name"} placeholder={"enter your FirstName"} id="firstName" />

                                        <CustomInput control={form.control} name='lastName' label={"Last Name"} placeholder={"enter your Last Name"} id="LastName" />

                                    </div>

                                    <CustomInput control={form.control} name='address1' label={"Address"} placeholder={"enter your Address"} id="Address" />

                                    <CustomInput control={form.control} name='city' label={"City"} placeholder={"enter your city"} id="city" />

                                    <div className="flex gap-3">

                                        <CustomInput control={form.control} name='state' label={"state"} placeholder={"example: MP"} id="state" />

                                        <CustomInput control={form.control} name='postalCode' label={"PostalCode"} placeholder={"ex : 1113"} id="PostalCode" />
                                    </div>
                                    <div className="flex gap-20">

                                        <CustomInput control={form.control} name='dateOfBirth' label={"Date of Birth"} placeholder={"YYYY-MM_DD"} id="dateOfBirth" />

                                        <CustomInput control={form.control} name='ssn' label={"SSN"} placeholder={"enter your SSN"} id="SSN" />
                                    </div>
                                </>
                            )}
                            <CustomInput control={form.control} name='email' label={"Email"} placeholder={"enter your email address"} id="email" />
                            <CustomInput control={form.control} name="password" label={"password"} placeholder={"enter your passsword"} id="password" />

                            <div className="flex  flex-col gap-4">


                                <Button className="form-btn" type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2
                                                size={20}
                                                className="animate-spin"
                                            /> &nbsp;
                                            loading....
                                        </>
                                    ) : (type === "sign-in" ? "sign-in" : "sign-up")}</Button>
                            </div>
                        </form>
                    </Form>
                    <footer className="flex justify-center gap-1">
                        <p className="text-14 font-normal text-gray-600">{type === "sign-in" ? "don't have and account " : "already have an account?"}
                        </p>
                        <Link className="form-link" href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
                            {type === "sign-in" ? "sign up" : "sign in"}

                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm