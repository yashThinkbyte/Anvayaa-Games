// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <nav className="w-64 bg-primary text-black flex flex-col p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <ul className="flex-1">
            <li className="mb-4">
              <a href="/dashboard" className="block py-2 px-4 hover:bg-secondary">
                Home
              </a>
            </li>
            <li className="mb-4">
              <a href="/dashboard/profile" className="block py-2 px-4 hover:bg-secondary">
                Profile
              </a>
            </li>
            <li className="mb-4">
              <a href="/dashboard/settings" className="block py-2 px-4 hover:bg-secondary">
                Settings
              </a>
            </li>
          </ul>
          <button className="bg-accent p-2 mt-6 text-center">Logout</button>
        </nav>
  
        {/* Main content area */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    );
  }
  