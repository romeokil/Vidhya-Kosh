import { useEffect, useState } from 'react';
import { Users, GraduationCap, BookOpen, BookMarked, TrendingUp, Clock } from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalInstructors: number;
  totalCourses: number;
  totalEnrolled: number;
}

export const StatsPanel = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalInstructors: 0,
    totalCourses: 0,
    totalEnrolled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [displayStats, setDisplayStats] = useState<Stats>({
    totalUsers: 0,
    totalInstructors: 0,
    totalCourses: 0,
    totalEnrolled: 0,
  });

  useEffect(() => {
    console.log("Fetch call stats Panel wala hai ye.!")
  }, []);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setDisplayStats({
        totalUsers: Math.floor(stats.totalUsers * progress),
        totalInstructors: Math.floor(stats.totalInstructors * progress),
        totalCourses: Math.floor(stats.totalCourses * progress),
        totalEnrolled: Math.floor(stats.totalEnrolled * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayStats(stats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [stats]);


  const statCards = [
    {
      title: 'Total Users',
      value: displayStats.totalUsers,
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      iconBg: 'bg-blue-500',
    },
    {
      title: 'Total Instructors',
      value: displayStats.totalInstructors,
      icon: GraduationCap,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      iconBg: 'bg-purple-500',
    },
    {
      title: 'Total Courses',
      value: displayStats.totalCourses,
      icon: BookOpen,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      iconBg: 'bg-green-500',
    },
    {
      title: 'Enrolled Courses',
      value: displayStats.totalEnrolled,
      icon: BookMarked,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/10 to-red-500/10',
      iconBg: 'bg-orange-500',
    },
    {
      title: 'Active Today',
      value: Math.floor(displayStats.totalUsers * 0.6),
      icon: TrendingUp,
      gradient: 'from-indigo-500 to-blue-500',
      bgGradient: 'from-indigo-500/10 to-blue-500/10',
      iconBg: 'bg-indigo-500',
    },
    {
      title: 'Recent Activity',
      value: Math.floor(displayStats.totalEnrolled * 0.3),
      icon: Clock,
      gradient: 'from-teal-500 to-cyan-500',
      bgGradient: 'from-teal-500/10 to-cyan-500/10',
      iconBg: 'bg-teal-500',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-2xl bg-gradient-to-br from-slate-200/50 to-slate-300/50 dark:from-slate-800/50 dark:to-slate-700/50 animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.bgGradient} backdrop-blur-xl border border-slate-200/20 dark:border-slate-700/20 p-4 hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 rounded-xl ${card.iconBg} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  <Icon className="text-white" size={20} />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">{card.title}</h3>
                <p className={`text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                  {card.value}
                </p>
              </div>

              <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-5 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500`}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
