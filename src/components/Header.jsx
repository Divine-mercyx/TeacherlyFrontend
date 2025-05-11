
const Header = (props) => {
    const {toggleSidebar, firstName, lastName, image, setSearch, search} = props;


    return (
        <>
            <header className="dashboard-header">
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    <i className="fas fa-bars"></i>
                </button>
                <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input
                            type="text"
                            placeholder="Search videos, teachers..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="header-actions">
                    <div className="notification-bell">
                        <i className="fas fa-bell"></i>
                        <span className="notification-badge">2</span>
                    </div>
                    <div className="user-dropdown">
                        <img src={image} alt="User Avatar" />
                        <span>{firstName} {lastName}</span>
                        <i className="fas fa-chevron-down"></i>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header;