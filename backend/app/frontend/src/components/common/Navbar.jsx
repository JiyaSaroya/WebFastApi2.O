const Navbar = () => (
  <nav className="bg-white shadow-lg">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800">Placement App</h1>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/admin" className="text-gray-600 hover:text-gray-900 font-medium">Admin</a>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
