'use client';

import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import members from './member';

export default function AboutUs() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-center text-5xl font-bold text-gray-900">Our Team</h2>
        </div>
        <div className="relative">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            pagination={{ clickable: true }}
            navigation
            modules={[Navigation, Pagination]}
            className="mx-auto max-w-5xl"
          >
            {members.map((member) => (
              <SwiperSlide key={member.name}>
                <div className="group flex flex-col items-center">
                  <div className="relative mb-3">
                    <Link href={`/about-team/${member.name}`}>
                      <img
                        src={`/team/${member.image}`}
                        alt={member.name}
                        className="h-40 w-40 cursor-pointer rounded-full border border-solid border-transparent object-cover transition-all duration-500 group-hover:border-indigo-600"
                      />
                    </Link>
                  </div>
                  <h4 className="mb-2 text-center text-2xl font-semibold capitalize text-gray-900 transition-all duration-500 group-hover:text-indigo-600">
                    {member.name}
                  </h4>
                  <span className="block pb-8 text-center text-gray-500 transition-all duration-500 group-hover:text-gray-900">
                    {member.position}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
