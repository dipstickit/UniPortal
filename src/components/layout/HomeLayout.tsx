import { Outlet } from "react-router-dom"
import Header from "./Header"

const Layout = () => {
    return (
        <main>
            <Header  />
            <section className="flex justify-center px-2">
                <div className="max-w-7xl w-full pt-4">
                    <Outlet />
                </div>
            </section>
        </main >
    )
}

export default Layout