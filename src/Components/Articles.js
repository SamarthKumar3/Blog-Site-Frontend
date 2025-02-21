"use client";
import { useState, Suspense } from "react";
import BlogsList from "./TrendingTopBlogs";

export default function Articles() {
    const [selectedType, setSelectedType] = useState("Trending");

    return (
        <div className="pl-10 pr-5 pt-28 flex flex-col gap-y-12">
            <div className="relative pl-4 mb-4">
                <h1 className="text-7xl leading-snug">Best of the <br /> week</h1>
                <p className="absolute bottom-0 right-0">
                    The latest industry news, interviews, technologies <br />
                    and educational resources
                </p>
            </div>

            <div className="flex gap-x-32 p-4 pb-0 relative">
                <button
                    className={`py-6 px-10 border-b-2 ${selectedType === "Trending" ? "border-black" : ""}`}
                    onClick={() => setSelectedType("Trending")}
                >
                    Trending
                </button>
                <button
                    className={`py-6 px-10 border-b-2 ${selectedType === "Top" ? "border-black" : ""}`}
                    onClick={() => setSelectedType("Top")}
                >
                    Top Articles
                </button>
                <div className="absolute bottom-0 border-b-2 w-full -z-50"></div>
            </div>

            <Suspense fallback={<p>Loading articles...</p>}>
                <BlogsList selectedType={selectedType} />
            </Suspense>
        </div>
    );
}
