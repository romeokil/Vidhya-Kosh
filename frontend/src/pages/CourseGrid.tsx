import CourseCard from './CourseCard.tsx'

// Dummy data for demonstration
const courses = [
  { id: 1, name: "Mastering React & Next.js", description: "Build scalable, modern web applications from scratch using the latest features.", price: 499, imageUrl: "/images/react-course.jpg" },
  { id: 2, name: "Advanced Financial Modeling", description: "Learn to build professional financial models and perform valuations with confidence.", price: 699, imageUrl: "/images/finance-course.jpg" },
  { id: 3, name: "Pro Web Design (Figma & Tailwind)", description: "Create stunning, responsive, and accessible user interfaces from concept to code.", price: 349, imageUrl: "/images/design-course.jpg" },
  { id: 4, name: "Data Science with Python", description: "Explore machine learning, statistical analysis, and data visualization techniques.", price: 549, imageUrl: "/images/data-course.jpg" },
];

const CourseGrid = () => {
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