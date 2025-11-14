import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { StatsPanel } from './StatsPanel';
import { DataTable } from './DataTable';
import { DetailView } from './DetailView';
import { ModeToggle } from '@/components/mode-toggle';
export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('users');
  const [users, setUsers] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailView, setDetailView] = useState(null);

  useEffect(() => {
    if (activeSection !== 'profile' && activeSection !== 'logout') {
        console.log("AdminDashboard ke andr ghus gy hmlog")
    }
  }, [activeSection]);


  const renderContent = () => {
    if (activeSection === 'profile') {
      return (
        <div className="space-y-6 animate-slide-in-right">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Admin Profile</h1>
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-5xl font-bold shadow-2xl">
                A
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Admin User</h2>
                <p className="text-slate-600 dark:text-slate-400">admin@example.com</p>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === 'logout') {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Logged Out</h2>
            <p className="text-slate-600 dark:text-slate-400">You have been successfully logged out.</p>
          </div>
        </div>
      );
    }

    const columns: { [key: string]: any[] } = {
      users: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'role', label: 'Role', sortable: true, render: (val: string) => <span className="capitalize px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium">{val}</span> },
        { key: 'enrolledCoursesCount', label: 'Enrolled Courses', sortable: true },
        { key: 'created_at', label: 'Created', sortable: true, render: (val: string) => new Date(val).toLocaleDateString() },
      ],
      instructors: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'rating', label: 'Rating', sortable: true, render: (val: number) => <span className="flex items-center space-x-1"><span className="text-yellow-500">★</span><span>{val}</span></span> },
        { key: 'publishedCoursesCount', label: 'Published Courses', sortable: true },
        { key: 'created_at', label: 'Created', sortable: true, render: (val: string) => new Date(val).toLocaleDateString() },
      ],
      courses: [
        { key: 'name', label: 'Course Name', sortable: true },
        { key: 'instructorName', label: 'Instructor', sortable: true },
        { key: 'price', label: 'Price', sortable: true, render: (val: number) => `$${val}` },
        { key: 'rating', label: 'Rating', sortable: true, render: (val: number) => <span className="flex items-center space-x-1"><span className="text-yellow-500">★</span><span>{val}</span></span> },
        { key: 'created_at', label: 'Created', sortable: true, render: (val: string) => new Date(val).toLocaleDateString() },
      ],
      enrolled: [
        { key: 'userName', label: 'Student', sortable: true },
        { key: 'courseName', label: 'Course', sortable: true },
        { key: 'enrolled_at', label: 'Enrolled On', sortable: true, render: (val: string) => new Date(val).toLocaleDateString() },
        { key: 'created_at', label: 'Created', sortable: true, render: (val: string) => new Date(val).toLocaleDateString() },
      ],
    };

    const dataMap: { [key: string]: any[] } = {
      users,
      instructors,
      courses,
      enrolled: enrolledCourses,
    };

    return (
      <div className="animate-slide-in-right">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 capitalize">
          {activeSection === 'enrolled' ? 'Enrolled Courses' : activeSection}
        </h1>
        <DataTable
          columns={columns[activeSection]}
          data={dataMap[activeSection]}
          loading={loading}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="lg:ml-64 transition-all duration-300">
        <div className="flex flex-col lg:flex-row min-h-screen">
          <main className="flex-1 p-6 lg:p-8">
            <div className="flex justify-end mb-6">
              <ModeToggle />
            </div>
            {renderContent()}
          </main>

          <aside className="lg:w-80 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Statistics</h2>
            <StatsPanel />
          </aside>
        </div>
      </div>

      {detailView && (
        <DetailView
          data={detailView.data}
          type={detailView.type}
          onClose={() => setDetailView(null)}
        />
      )}
    </div>
  );
};
