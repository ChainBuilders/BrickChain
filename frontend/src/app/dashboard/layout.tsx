import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            
            <main style={{ flex: 1, padding: '2rem', background: '#f5f6fa' }}>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;