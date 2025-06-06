
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { categories } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
import CourseSlider from '../Components/core/Catalog/CourseSlider';
import CatalogCard from '../Components/core/Catalog/CatalogCard';
import { getCatalogaPageData } from '../services/operations/PageAndComponentData';

const Catalog = () => {
  const { catalogName } = useParams();
  const decodedCatalog = decodeURIComponent(catalogName);

  const [desc, setDesc] = useState({});
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [activeOption, setActiveOption] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCatalogData = async () => {
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        const category = result?.data?.data?.find(
          (item) => item.name === decodedCatalog
        );

        if (!category) {
          console.error("Category not found for:", decodedCatalog);
          return;
        }

        setCategoryID(category._id);
        setDesc(category);

        const pageData = await getCatalogaPageData(category._id, dispatch);
        setCatalogPageData(pageData);
      } catch (error) {
        console.error("Error fetching catalog data:", error);
      }
    };

    fetchCatalogData();
  }, [decodedCatalog, dispatch]);

  return (
    <div className="text-richblack-5">
      {/* Header */}
      <section className="bg-richblack-800 px-4 py-10">
        <div className="mx-auto max-w-maxContent flex flex-col gap-4">
          <p className="text-sm text-richblack-300">
            Home / Catalog / <span className="text-yellow-25">{decodedCatalog}</span>
          </p>
          <h1 className="text-3xl font-semibold">{desc?.name}</h1>
          <p className="max-w-3xl text-richblack-200">{desc?.description}</p>
        </div>
      </section>

      {/* Courses to get you started */}
      <section className="mx-auto max-w-maxContent px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Courses to get you started</h2>

        {/* Toggle Buttons */}
        <div className="flex border-b border-b-richblack-600 text-sm mb-6">
          <button
            onClick={() => setActiveOption(1)}
            className={`px-4 py-2 transition-all ${
              activeOption === 1
                ? 'border-b-2 border-yellow-25 text-yellow-25'
                : 'text-richblack-50'
            }`}
          >
            Most Popular
          </button>
          <button
            onClick={() => setActiveOption(2)}
            className={`px-4 py-2 transition-all ${
              activeOption === 2
                ? 'border-b-2 border-yellow-25 text-yellow-25'
                : 'text-richblack-50'
            }`}
          >
            New
          </button>
        </div>

        <CourseSlider Courses={catalogPageData?.selectedCourses} />
      </section>

      {/* Similar Courses */}
      <section className="mx-auto max-w-maxContent px-4 py-12">
        <h2 className="text-xl md:text-3xl font-semibold mb-6">
          Similar to {desc?.name}
        </h2>
        <CourseSlider Courses={catalogPageData?.differentCourses} />
      </section>

      {/* Frequently Bought Together */}
      <section className="mx-auto max-w-maxContent px-4 py-12">
        <h2 className="text-xl md:text-3xl font-semibold mb-6">
          Frequently Bought Together
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {catalogPageData?.mostSellingCourses?.map((item, index) => (
            <CatalogCard
              key={index}
              course={item}
              Height="h-[100px] lg:h-[400px]"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Catalog;
