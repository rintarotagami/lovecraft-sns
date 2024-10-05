import NewSessionForm from "@/components/NewSessionForm/NewSessionForm"

const NewSessionPage = () => {
    return (
        <div className="flex flex-col justify-center py-20">
            <h2 className="text-center text-2xl font-bold">新しくセッションを募集する</h2>
            <NewSessionForm />
        </div>
    )
}

export default NewSessionPage
