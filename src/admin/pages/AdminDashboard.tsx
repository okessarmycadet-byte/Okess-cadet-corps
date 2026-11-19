import './AdminDashboard.css';
import {
  LayoutDashboard,
  History,
  Users,
  UserRound,
  Image,
  CalendarDays,
  Award,
  HeartHandshake,
  MessageSquare,
  Bell,
  Settings,
  Shield,
  Menu,
  LogOut,
  Search,
  Database,
  Activity,
  FileText,
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { title: 'Overview', icon: LayoutDashboard },
  { title: 'History & Archives', icon: History },
  { title: 'Generations', icon: Users },
  { title: 'Leadership', icon: UserRound },
  { title: 'Memories', icon: FileText },
  { title: 'Gallery & Media', icon: Image },
  { title: 'Events', icon: CalendarDays },
  { title: 'Hall of Honour', icon: Award },
  { title: 'Donations', icon: HeartHandshake },
  { title: 'Messages', icon: MessageSquare },
  { title: 'Notifications', icon: Bell },
  { title: 'Settings', icon: Settings },
];

const overviewCards = [
  { label: 'Generations', icon: Users },
  { label: 'Published Memories', icon: History },
  { label: 'Media Library', icon: Image },
  { label: 'Upcoming Events', icon: CalendarDays },
];

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-workspace">
      {sidebarOpen && (
        <button
          className="admin-sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <Shield size={24} />
          </div>
          <div>
            <strong>OKESS CADETS</strong>
            <span>ADMINISTRATION</span>
          </div>
        </div>

        <div className="admin-nav-label">WORKSPACE</div>

        <nav className="admin-nav">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                className={`admin-nav-item ${
                  activePage === item.title ? 'admin-nav-active' : ''
                }`}
                onClick={() => {
                  setActivePage(item.title);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={18} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-secure-label">
            <Shield size={15} />
            <span>Secure administration</span>
          </div>
          <button className="admin-nav-item admin-logout">
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-toggle"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          <div className="admin-breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-divider">/</span>
            <strong>{activePage}</strong>
          </div>

          <div className="admin-topbar-right">
            <button className="admin-icon-button" aria-label="Search">
              <Search size={19} />
            </button>
            <button className="admin-icon-button" aria-label="Notifications">
              <Bell size={19} />
            </button>
            <div className="admin-avatar">AC</div>
          </div>
        </header>

        <div className="admin-content">
          <section className="admin-welcome">
            <div>
              <span className="admin-overline">CORPS MANAGEMENT</span>
              <h1>{activePage}</h1>
              <p>
                Manage the records, heritage, activities and administration
                of the OKESS Army Cadet Corps.
              </p>
            </div>
          </section>

          {activePage === 'Overview' ? (
            <>
              <section className="admin-stats-grid">
                {overviewCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <article className="admin-stat-card" key={card.label}>
                      <div className="admin-stat-icon">
                        <Icon size={20} />
                      </div>
                      <span className="admin-stat-label">{card.label}</span>
                      <strong className="admin-stat-value">—</strong>
                      <span className="admin-stat-note">
                        Awaiting database connection
                      </span>
                    </article>
                  );
                })}
              </section>

              <section className="admin-overview-grid">
                <article className="admin-panel">
                  <div className="admin-panel-heading">
                    <div>
                      <h2>System status</h2>
                      <p>Infrastructure connection overview</p>
                    </div>
                    <Activity size={20} />
                  </div>

                  <div className="system-status-row">
                    <span className="status-indicator status-pending" />
                    <div>
                      <strong>Database</strong>
                      <span>Connection setup pending</span>
                    </div>
                    <span className="status-tag">Pending</span>
                  </div>

                  <div className="system-status-row">
                    <span className="status-indicator status-pending" />
                    <div>
                      <strong>Authentication</strong>
                      <span>Secure admin access setup pending</span>
                    </div>
                    <span className="status-tag">Pending</span>
                  </div>

                  <div className="system-status-row">
                    <span className="status-indicator status-pending" />
                    <div>
                      <strong>Media storage</strong>
                      <span>Storage configuration pending</span>
                    </div>
                    <span className="status-tag">Pending</span>
                  </div>
                </article>

                <article className="admin-panel admin-activity-panel">
                  <div className="admin-panel-heading">
                    <div>
                      <h2>Recent activity</h2>
                      <p>Latest administration records</p>
                    </div>
                    <FileText size={20} />
                  </div>

                  <div className="admin-empty-state">
                    <div className="admin-empty-icon">
                      <Database size={24} />
                    </div>
                    <strong>No activity records yet</strong>
                    <p>
                      Activity will appear here once the system is connected
                      and administrators begin working.
                    </p>
                  </div>
                </article>
              </section>

              <section className="admin-panel admin-quick-access">
                <div className="admin-panel-heading">
                  <div>
                    <h2>Administration modules</h2>
                    <p>Choose an area of Corps management</p>
                  </div>
                </div>

                <div className="admin-module-grid">
                  {navigation.slice(1, 10).map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        className="admin-module"
                        key={item.title}
                        onClick={() => setActivePage(item.title)}
                      >
                        <Icon size={19} />
                        <span>{item.title}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </>
          ) : (
            <section className="admin-panel admin-module-placeholder">
              <div className="admin-empty-icon">
                <Database size={25} />
              </div>
              <h2>{activePage} management</h2>
              <p>
                This module is part of the Corps administration workspace.
                Its management tools, records, search and publishing
                controls will be integrated in the complete system build.
              </p>
            </section>
          )}

          <footer className="admin-page-footer">
            <span>OKESS ARMY CADET CORPS</span>
            <span>ADMINISTRATION WORKSPACE</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
