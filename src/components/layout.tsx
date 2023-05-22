import { type PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => (
    <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 overflow-y-scroll flex justify-between">
            {props.children}
        </div>
    </main>

)