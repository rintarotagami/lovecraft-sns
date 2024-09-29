"use client"

import { deleteGameSession, FormState } from "@/actions/session"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { FaTrashAlt } from "react-icons/fa"

interface SessionDeleteButtonProps {
    id: string
}

const SessionDeleteButton: React.FC<SessionDeleteButtonProps> = ({ id }) => {
    const deleteSessionWithId = deleteGameSession.bind(null, id)
    const initialState: FormState = { error: "" }
    const [state, formAction] = useFormState(deleteSessionWithId, initialState)
    
    useEffect(() => {
        if (state && state.error!=="") {
            alert(state.error)
        }
    }, [state])

    const SubmitButton = () => {
        const {pending} = useFormStatus()
        return (
            <button 
            type="submit"
            disabled={pending}
            className="hover:text-gray-700 text-lg
            disabled:text-gray-400"
            >
                <FaTrashAlt className="hover:text-gray-700 text-lg cursor-pointer" />
            </button>
        )
    }
    
    return (
        //サーバーアクションズを使って、セッションを削除する
        <form action={formAction}>
            <SubmitButton />
        </form>
    )
}

export default SessionDeleteButton
