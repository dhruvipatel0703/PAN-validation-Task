"use client"

import * as React from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"
import { useLanguage } from "../../context/LanguageContext"

const Form: React.FC = () => {
    const { toast } = useToast()
    const { t } = useLanguage()

    const [name, setName] = React.useState<string>("")
    const [dob, setDob] = React.useState<string>("")
    const [pan, setPan] = React.useState<string>("")

    const validatePan = (value: string): boolean => {
        const regex = /^[A-Z]{5}[0-9]{4}[A-Z]$/i
        return regex.test(value.trim())
    }

    const handleSubmit = (e?: React.FormEvent) => {
        console.log('handleSubmit called', { name, dob, pan })
        if (e) e.preventDefault()
        if (!name || !dob || !pan) {
            toast({
                variant: "destructive",
                title: "Missing fields",
                description: "All fields are required",
            })
            return
        }

        if (!validatePan(pan)) {
            toast({
                variant: "destructive",
                title: "Invalid PAN",
                description: "Please enter a valid PAN number",
            })
            return
        }

        toast({
            title: "Success",
            description: "PAN is valid",
        })

        const payload = {
            name,
            dob,
            pan: pan.toUpperCase(),
        }

        console.log("Submitted Data:", payload)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    {t("name")}
                </label>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    {t("dateOfBirth")}
                </label>
                <Input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    {t("panNumber")}
                </label>
                <Input
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    className="uppercase"
                />
            </div>

            <Button className="w-full" type="submit" onClick={(e) => handleSubmit(e)}>
                {t("submit")}
            </Button>
        </form>
    )
}

export default Form