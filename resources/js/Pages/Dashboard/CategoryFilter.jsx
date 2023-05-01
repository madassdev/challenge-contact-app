import DropWrapper from "@/Components/DropWrapper";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { BiChevronDown, BiFilter, BiFilterAlt } from "react-icons/bi";

function CategoryFilter({ categories, selectCategory, onFilter, clearFilter }) {
    const [drop, setDrop] = useState(false);
    console.log(categories);
    return (
        <div className="relative">
            <div
                onClick={() => setDrop(true)}
                className="rounded-2xl text-gray-600 cursor-pointer flex space-x-2 border border-gray-300 p-1 px-2 text-xs items-center justify-center"
            >
                <span>Categories</span>
                <BiChevronDown />
            </div>
            <AnimatePresence>
                {drop ? (
                    <>
                        <DropWrapper close={() => setDrop(false)}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ ease: "easeOut", duration: 0.2 }}
                                exit={{ opacity: 0 }}
                                className="p-5 bg-white text-whsite border shadow rounded-xl text-gray-600 absolute -left-4 top-12 space-y-1 min-w-[460px]"
                            >
                                <div className="text-center">
                                    <p className="font-bold">
                                        Select categories
                                    </p>
                                </div>
                                <div className="flex items-center flex-wrap gap-2">
                                    {categories.map((category, i) => (
                                        <div
                                            key={i}
                                            onClick={() =>
                                                selectCategory(category)
                                            }
                                            className={`flex items-center space-x-1 p-1 px-2 ${
                                                category.selected
                                                    ? "bg-white-400 border bg-white text-primary"
                                                    : "border border-white hover:bg-white hover:border-gray-200"
                                            } rounded-lg text-xs cursor-pointer`}
                                        >
                                            <span className="">
                                                {category.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full flex space-x-4 items-center justify-end">
                                    <p
                                        onClick={() => {
                                            clearFilter();
                                            setDrop(false);
                                        }}
                                        className="cursor-pointer text-xs italic underline text-orange-600  text-right"
                                    >
                                        Clear
                                    </p>
                                    <button
                                        onClick={() => {
                                            onFilter();
                                            setDrop(false);
                                        }}
                                        className="rounded-full bg-blue-600 text-white inline-flex hover:scale-[1.03]  hover:shadow-lg
                                        items-center justify-center space-x-2 transition-all ease-in p-1 px-2 w-full md:w-auto text-xs"
                                    >
                                        <span>Filter</span>
                                        <BiFilterAlt />
                                    </button>
                                </div>
                            </motion.div>
                        </DropWrapper>
                    </>
                ) : null}
            </AnimatePresence>
        </div>
    );
}

export default CategoryFilter;
