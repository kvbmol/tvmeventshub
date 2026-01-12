import { useAuth } from "../../../context/AuthContext";


export default function Events() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Events Dashboard
          </h1>
          <span className="text-green-600 font-semibold">
            Welcome, {user.displayName || user.email}!
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
            <h3 className="text-xl font-semibold mb-2">Tech Meetup</h3>
            <p className="text-gray-600 mb-4">React workshop</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700">
              Bookmark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
