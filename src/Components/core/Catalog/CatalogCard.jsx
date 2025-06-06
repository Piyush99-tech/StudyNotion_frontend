import React, { useEffect, useState } from 'react';
import RatingStars from '../../common/RatingStars';
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({ course, Height = "lg:h-[250px] h-[100px]" }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews || []);
    setAvgReviewCount(count);
  }, [course]);

  // Fallback thumbnail image
  const thumbnail = course?.thumbnail || 'https://via.placeholder.com/400x250?text=Course+Image';

  return (
    <div className="mb-4 hover:scale-[1.03] transition-all duration-200 z-50">
      <Link to={`/courses/${course?._id}`}>
        <div className="bg-richblack-800 rounded-xl overflow-hidden shadow-md">
          {/* Thumbnail */}
          <img
            src={thumbnail}
            alt="Course thumbnail"
            className={`${Height} w-full object-cover rounded-t-xl`}
            loading="lazy"
          />

          {/* Course Content */}
          <div className="flex flex-col gap-2 px-3 py-4">
            {/* Course Name */}
            <p className="text-sm md:text-lg text-richblack-5 font-semibold line-clamp-2">
              {course?.courseName || "Untitled Course"}
            </p>

            {/* Instructor */}
            <p className="text-xs md:text-base text-richblack-100">
              By <span className="text-yellow-50 font-medium">
                {course?.instructor?.firstName || "Unknown"} {course?.instructor?.lastName || ""}
              </span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 text-yellow-50 text-sm md:text-base">
              <span>{avgReviewCount.toFixed(1)}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="hidden md:inline text-richblack-300">
                ({course?.ratingAndReviews?.length || 0} Ratings)
              </span>
            </div>

            {/* Price */}
            <p className="text-sm md:text-base font-bold text-richblack-5">
              Rs. {course?.price || '4990'}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Course_Card;
