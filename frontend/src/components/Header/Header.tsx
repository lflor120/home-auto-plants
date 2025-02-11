import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';

const Header = () => {
    const [activeTab, setActiveTab] = useState<string>("/home")

    const handleTabSelect = (tab: string | null) => {
        if (tab) {
            console.log(`Changing to tab: ${tab}`)
            setActiveTab(tab)
        }
    }

    return (
        <Nav
            variant="tabs"
            activeKey={activeTab}
            onSelect={handleTabSelect}
        >
            <Nav.Item>
                <Nav.Link eventKey="/home" href="/plant/list">View</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/add" href="/plant/add">Add</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default Header;
