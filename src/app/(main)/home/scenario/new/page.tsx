import { NewScenarioForm } from "@/components/NewScenarioForm/NewScenarioForm"

const NewScenarioPage = () => {
    return (
        <div className="flex flex-col justify-center py-20">
            <h2 className="text-center text-2xl font-bold">新しいシナリオを作成</h2>
            <NewScenarioForm />
        </div>
    )
}

export default NewScenarioPage
