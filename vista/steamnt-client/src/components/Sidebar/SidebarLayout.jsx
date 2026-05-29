import { useState } from 'react'
import Sidebar from './Sidebar'
import './SidebarLayout.css'

function SidebarLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="app-layout">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <main className={`app-content ${collapsed ? 'expanded' : ''}`}>
                {children}
            </main>
        </div>
    )
}

export default SidebarLayout