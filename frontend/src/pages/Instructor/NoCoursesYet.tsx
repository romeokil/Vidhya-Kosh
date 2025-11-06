// NoCoursesYet.jsx
import { ArrowRight, BookOpen, PlusCircle } from 'lucide-react'; // Assuming you use lucide-react or a similar icon library

function NoCoursesYet({ instructorName, onCreateCourse }) {
    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition-colors duration-500">
            
            <div className="flex flex-col items-center text-center">
                
                {/* Icon Visual */}
                <div className="mb-8 p-4 bg-red-100 dark:bg-red-900/50 rounded-full inline-flex items-center justify-center border-4 border-red-500 dark:border-red-400 animate-pulse-slow">
                    <BookOpen className="w-12 h-12 text-red-600 dark:text-red-300" />
                </div>

                {/* Main Heading and Description */}
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                    Welcome, {instructorName}!
                </h2>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-8">
                    Your stage is set, but your spotlight awaits. You haven't published any courses yet, and the world is ready for your expertise.
                </p>

                {/* Call-to-Action Button */}
                <button
                    onClick={onCreateCourse}
                    className="flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    <PlusCircle className="w-5 h-5 mr-3" />
                    Launch Your First Course Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                </button>

                {/* Motivational Quote/Tip */}
                <p className="mt-10 text-sm italic text-gray-400 dark:text-gray-500">
                    "A journey of a thousand miles begins with a single step... or a single lesson plan!"
                </p>

            </div>
        </div>
    );
}

export default NoCoursesYet;