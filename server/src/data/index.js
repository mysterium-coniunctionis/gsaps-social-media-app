/**
 * GSAPS Course Data Index
 * Exports all professional CE courses for the LMS
 */

import { course1 } from './courseData.js';
import { course2 } from './courseData2.js';
import { course3, course4 } from './courseData3.js';
import { course5, course6 } from './courseData4.js';

// Export all courses as an array
export const allCourses = [
  course1,  // Foundations of Psychedelic-Assisted Therapy (12 CE)
  course2,  // MDMA-Assisted Therapy for PTSD (20 CE)
  course3,  // Ketamine-Assisted Psychotherapy (16 CE)
  course4,  // Neuroscience of Psychedelic States (15 CE)
  course5,  // Advanced Integration Practices (10 CE)
  course6,  // Ethics in Psychedelic Therapy (8 CE)
];

// Export individual courses
export { course1, course2, course3, course4, course5, course6 };

/**
 * Helper function to seed all courses into the database
 * @param {PrismaClient} prisma - Prisma client instance
 */
export async function seedCourses(prisma) {
  console.log('📚 Seeding professional CE courses...');

  const createdCourses = [];

  for (const courseData of allCourses) {
    const { lessons, slug, instructorBio, learningObjectives, ...courseFields } = courseData;

    // Create the course
    const course = await prisma.course.create({
      data: {
        ...courseFields,
        // Store additional metadata as needed
      }
    });

    console.log(`  ✓ Created course: ${course.title}`);

    // Create lessons for this course
    if (lessons && lessons.length > 0) {
      for (const lessonData of lessons) {
        const { quizData, ...lessonFields } = lessonData;

        await prisma.lesson.create({
          data: {
            ...lessonFields,
            courseId: course.id,
            quizData: quizData ? JSON.stringify(quizData) : null,
          }
        });
      }
      console.log(`    → Created ${lessons.length} lessons`);
    }

    createdCourses.push(course);
  }

  console.log(`✓ Created ${createdCourses.length} courses with lessons`);
  return createdCourses;
}

export default { allCourses, seedCourses };
