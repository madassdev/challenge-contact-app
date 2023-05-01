import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";

function MultiSelect({ categories, setCategories }) {
    const [newCategory, setNewCategory] = useState("");
    function addNew() {
        const newCat = { title: newCategory, selected: true };
        let catsData = categories;
        const catExists = catsData.filter((c) => c.title == newCat.title);
        if (!catExists.length && newCategory) {
            catsData.push(newCat);
        }
        setNewCategory("");
        setCategories(catsData);
    }

    function selectCategory(category) {
        const data = categories.map((cat) => {
            return {
                ...cat,
                selected:
                    cat.title == category.title ? !cat.selected : cat.selected,
            };
        });

        setCategories(data);
    }
    return (
        <div className="space-y-1 md:col-span-2">
            <label className="" htmlFor="categories">
                Select categories
            </label>
            <div className="w-full  p-3 border border-gray-300 rounded-2xl space-y-2">
                <div className="flex items-center flex-wrap gap-2">
                    {categories.map((category, i) => (
                        <div
                            key={i}
                            onClick={() => selectCategory(category)}
                            className={`flex items-center space-x-1 p-[3px] ${
                                category.selected
                                    ? "bg-green-400 border border-green-400 text-white"
                                    : "border border-gray-200 hover:border-green-400"
                            } rounded text-xs cursor-pointer`}
                        >
                            <span className="">{category.title}</span>
                        </div>
                    ))}
                </div>
                <div className="max-w-400px flex items-center space-x-2">
                    <input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="border border-gray-300 rounded-full focus:outline-none p-2 text-xs"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                                addNew()
                                return;
                            }
                        }}
                    />
                    <div
                        onClick={addNew}
                        className="cursor-pointer text-xs flex items-center  text-blue-600"
                    >
                        <BiPlus />
                        <span>Add</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MultiSelect;
