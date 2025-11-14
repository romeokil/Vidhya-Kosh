import { X, Mail, Calendar, Star, DollarSign, BookOpen, Users } from 'lucide-react';

interface DetailViewProps {
  data: any;
  type: 'user' | 'instructor' | 'course' | 'enrolled';
  onClose: () => void;
}

export const DetailView = ({ data, type, onClose }: DetailViewProps) => {
  if (!data) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderUserDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
          {data.name?.charAt(0) || '?'}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{data.name}</h2>
          <p className="text-slate-600 dark:text-slate-400 capitalize">{data.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center space-x-3">
            <Mail className="text-blue-500" size={20} />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Email</p>
              <p className="font-medium text-slate-900 dark:text-white">{data.email}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <div className="flex items-center space-x-3">
            <Calendar className="text-purple-500" size={20} />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Joined</p>
              <p className="font-medium text-slate-900 dark:text-white">{formatDate(data.created_at)}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="flex items-center space-x-3">
            <BookOpen className="text-green-500" size={20} />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Enrolled Courses</p>
              <p className="font-medium text-slate-900 dark:text-white">{data.enrolledCoursesCount || 0}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <div className="flex items-center space-x-3">
            <Users className="text-orange-500" size={20} />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Status</p>
              <p className="font-medium text-slate-900 dark:text-white">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInstructorDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full overflow-hidden shadow-2xl">
          {data.profile_picture ? (
            <img src={data.profile_picture} alt={data.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
              {data.name?.charAt(0) || '?'}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{data.name}</h2>
          <div className="flex items-center space-x-2 mt-1">
            <Star className="text-yellow-500 fill-yellow-500" size={20} />
            <span className="text-xl font-semibold text-slate-900 dark:text-white">{data.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">Biography</h3>
        <p className="text-slate-900 dark:text-white">{data.bio || 'No biography available'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center space-x-3">
            <Mail className="text-blue-500" size={20} />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Email</p>
              <p className="font-medium text-slate-900 dark:text-white">{data.email}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="flex items-center space-x-3">
            <BookOpen className="text-green-500" size={20} />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Published Courses</p>
              <p className="font-medium text-slate-900 dark:text-white">{data.publishedCoursesCount || 0}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <div className="flex items-center space-x-3">
            <Calendar className="text-purple-500" size={20} />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Joined</p>
              <p className="font-medium text-slate-900 dark:text-white">{formatDate(data.created_at)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourseDetails = () => (
    <div className="space-y-6">
      <div className="rounded-2xl overflow-hidden shadow-2xl">
        {data.thumbnail ? (
          <img src={data.thumbnail} alt={data.name} className="w-full h-64 object-cover" />
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-6xl font-bold">
            {data.name?.charAt(0) || '?'}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{data.name}</h2>
        <p className="text-slate-600 dark:text-slate-400">{data.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="flex items-center space-x-3">
            <DollarSign className="text-green-500" size={20} />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Price</p>
              <p className="font-medium text-slate-900 dark:text-white">${data.price}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
          <div className="flex items-center space-x-3">
            <Star className="text-yellow-500" size={20} />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Rating</p>
              <p className="font-medium text-slate-900 dark:text-white">{data.rating} / 5</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center space-x-3">
            <Users className="text-blue-500" size={20} />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Instructor</p>
              <p className="font-medium text-slate-900 dark:text-white">{data.instructorName || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <div className="flex items-center space-x-3">
            <Calendar className="text-purple-500" size={20} />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Created</p>
              <p className="font-medium text-slate-900 dark:text-white">{formatDate(data.created_at)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEnrolledDetails = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Enrollment Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center space-x-3">
            <Users className="text-blue-500" size={20} />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Student</p>
              <p className="font-medium text-slate-900 dark:text-white">{data.userName}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="flex items-center space-x-3">
            <BookOpen className="text-green-500" size={20} />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Course</p>
              <p className="font-medium text-slate-900 dark:text-white">{data.courseName}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <div className="flex items-center space-x-3">
            <Calendar className="text-purple-500" size={20} />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Enrolled On</p>
              <p className="font-medium text-slate-900 dark:text-white">{formatDate(data.enrolled_at)}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <div className="flex items-center space-x-3">
            <Calendar className="text-orange-500" size={20} />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Record Created</p>
              <p className="font-medium text-slate-900 dark:text-white">{formatDate(data.created_at)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 animate-slide-up">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {type.charAt(0).toUpperCase() + type.slice(1)} Details
          </h1>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200 hover:scale-110"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {type === 'user' && renderUserDetails()}
          {type === 'instructor' && renderInstructorDetails()}
          {type === 'course' && renderCourseDetails()}
          {type === 'enrolled' && renderEnrolledDetails()}
        </div>
      </div>
    </div>
  );
};
