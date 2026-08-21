import { ReactNode } from "react"

const SiteLayout = ({children}: {children: ReactNode}) => {
    return (
        <main>
            {children}
        </main>
    )
}

export default SiteLayout