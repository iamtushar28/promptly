import React from 'react'
import PromptCard from './PromptCard'

type Props = {}

const PromptsSection = (props: Props) => {
    return (
        <section className="-mt-6 w-full h-auto rounded-b-lg border border-zinc-200 p-4 flex flex-col gap-4 dark:border-zinc-800">

            {/* title */}
            <h4 className="font-semibold">
                All Prompts
            </h4>

            {/* prompt cards section */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-4">

                <PromptCard />
                <PromptCard />
                <PromptCard />
                <PromptCard />
                <PromptCard />
                <PromptCard />
                <PromptCard />
                <PromptCard />

            </section>

        </section>
    )
}

export default PromptsSection