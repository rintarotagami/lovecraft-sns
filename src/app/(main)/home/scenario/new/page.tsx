import { NewScenarioFormTest } from "@/components/NewScenarioForm/NewScenarioFormTest"

const NewScenarioPage = () => {
    return (
        <div className="flex flex-col justify-center py-20">
            <h2 className="text-center text-2xl font-bold">新しいシナリオを作成</h2>
            <NewScenarioFormTest />
        </div>
    )
}

export default NewScenarioPage
