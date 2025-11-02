import CourseCard from './CourseCard.tsx'

const CourseGrid = ({courses}) => {
  return (
    <section className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto">
      
      {/* The Core Responsive Grid:
        - grid-cols-1: 1 column on mobile (default)
        - md:grid-cols-2: 2 columns on medium screens (768px+)
        - lg:grid-cols-3: 3 columns on large screens (1024px+)
        - gap-8: Space between grid items
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
};

export default CourseGrid;