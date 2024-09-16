import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import Form, { Control, FieldPath } from "react-hook-form"
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema("sign-up")

interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>
    label: string,
    placeholder: string,
    id: string

}

const CustomInput = ({ control, name, label, placeholder, id }: CustomInput) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="from-item">
                    <FormLabel className="form-label">
                        {label}
                    </FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl >
                            <Input {...field} type={name === "password" ? "password" : ((name === "DOB") ? "date" : "text")} placeholder={placeholder} className="input-class" id={id} />
                        </FormControl>
                        <FormMessage className="form-message" />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput