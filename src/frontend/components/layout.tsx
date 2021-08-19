import { FC, ReactNode } from "react"
import Header from "./header"

const Layout: FC<ReactNode> = ({ children }) => {
    return (
        <>
            <header className="header text-white">
                <Header />
            </header>
            <main className="text-white min-h-screen m-auto pt-16 font-semibold bg-gray-800">
                {children}
            </main>
            <footer className="text-white pt-2 pb-8 font-semibold">

            </footer>
        </>
    )
}

export default Layout