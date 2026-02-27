export function courseToText(course) {
  return `
  Course: ${course.name}
  Description: ${course.description}
  Author: ${course.author}
  Price: ${course.price}
  Rating: ${course.rating}
  `;
}