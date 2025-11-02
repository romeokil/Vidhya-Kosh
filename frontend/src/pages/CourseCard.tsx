import {Link} from 'react-router-dom';
// Assuming you are using TypeScript/React for structure
interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const CourseCard = ({_id,name, description, price, imageUrl }: Course) => {
  return (
    // Card Container: rounded corners, shadow, white background, overflow hidden
    // The 'h-full' and 'flex flex-col' ensure all cards in the grid have the same height.
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
      
      {/* Course Image - Top of the Card */}
      <div className="relative w-full aspect-video">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQItb7cCKtPPUcA6y8fJxmmsbNltIgoeGt1mw&s"
          alt={`Image for ${name} course`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Course Details (Content) */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        
        {/* Description: 'flex-grow' ensures the footer is pushed to the bottom */}
        <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
        
        {/* Footer: Price and Button */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
          <span className="text-2xl font-bold text-indigo-600">
            ${price}
          </span>
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
          <Link to={`/coursedetail/${_id}`}>Detail</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;