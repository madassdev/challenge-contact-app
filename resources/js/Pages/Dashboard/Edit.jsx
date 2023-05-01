import MainLayout from "@/Layouts/MainLayout";
import { Link, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import {
    AiFillCloseSquare,
    AiOutlineArrowLeft,
    AiOutlineCloseCircle,
    AiOutlineCloseSquare,
    AiOutlinePhone,
} from "react-icons/ai";
import { BiPin, BiPlus, BiSave, BiUser, BiUserPin, BiUserPlus, BiX } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import Spinner from "./Spinner";
import { toast } from "react-hot-toast";
import MultiSelect from "./MultiSelect";
import LocationPicker from "react-location-picker";

function Create({ categories, contact }) {
    console.log(contact);
    const [categoriesData, setCategoriesData] = useState(categories);
    // function
    const [location, setLocation] = useState({ show: false });

    useEffect(() => {
        const data = categories.map((cat) => {
            const catExists = contact.categories.filter(
                (c) => c.title == cat.title
            );
            return { ...cat, selected: catExists.length };
        });
        setData((d) => ({
            ...d,
            categories: data.filter((cd) => cd.selected),
        }));
        setCategoriesData(data);
        if (contact.lat && contact.lng) {
            setLocation((l) => ({
                show: true,
                lat: parseFloat(contact.lat),
                lng: parseFloat(contact.lng),
            }));
        }
    }, []);
    const inputRef = useRef();
    const filePicker = () => {
        inputRef.current.click();
    };
    function handleFileUpload(files) {
        const selectedFile = Object.values(files)[0];
        console.log(selectedFile);
        setData((d) => ({ ...d, image: selectedFile }));
    }
    const { post, data, setData, processing, errors, reset } = useForm({
        ...contact,
        categories,
    });

    function handleCategories(categories) {
        setCategoriesData(categories);
        const selectedCategories = categories.filter((c) => c.selected);
        setData((d) => ({ ...d, categories: selectedCategories }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        post(route("dashboard.contacts.update", contact), {
            onSuccess: (page) => {
                console.log(page);
                toast.success("Contact saved successfully", {
                    position: "top-right",
                });
                const data = categories.map((cat) => ({
                    ...cat,
                    selected: false,
                }));
                setCategoriesData(data);
                window.location.reload();
            },
        });
    }
    return (
        <MainLayout>
            <div className="m-3 md:m-24 p-3 md:p-16 bg-white  rounded-2xl shadow space-y-8">
                <div className="flex items-center justify-between">
                    <p>Create new contact</p>
                    <Link
                        href={route("contacts.index")}
                        className="inline-flex text-xs space-x-2 items-center text-orange-500"
                    >
                        <AiOutlineArrowLeft />
                        <span>Back to contacts</span>
                    </Link>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2  gap-4 gap-x-12 md:gap-y-12">
                        <div className="space-y-1">
                            <label className="" htmlFor="name">
                                Name *
                            </label>
                            <div className="relative">
                                <span className="absolute  text-blue-900 z-10  top-0 left-3  text-xl bottom-0 ws-12 flex items-center justify-center">
                                    <BiUser />
                                </span>
                                <input
                                    className="p-3 rounded-full w-full  border pl-10  border-gray-300 ring-0 focus:ring-1 ring-blue-700 focus:outline-none"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData((d) => ({
                                            ...d,
                                            name: e.target.value,
                                        }))
                                    }
                                    required={true}
                                />
                                {errors.name ? (
                                    <p className="text-[12px] text-red-600 mt-1 font-semibold">
                                        {errors.name}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="" htmlFor="phone">
                                Phone number *
                            </label>
                            <div className="relative">
                                <span className="absolute  text-blue-900 z-10  top-0 left-3 text-xl bottom-0 ws-12 flex items-center justify-center">
                                    <AiOutlinePhone />
                                </span>
                                <input
                                    className="p-3 rounded-full w-full  border pl-10  border-gray-300 ring-0 focus:ring-1 ring-blue-700 focus:outline-none"
                                    type="number"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData((d) => ({
                                            ...d,
                                            phone: e.target.value,
                                        }))
                                    }
                                    required={true}
                                />
                            </div>
                            {errors.phone ? (
                                <p className="text-[12px] text-red-600 mt-1 font-semibold">
                                    {errors.phone}
                                </p>
                            ) : null}
                        </div>
                        <div className="space-y-1">
                            <label className="" htmlFor="email">
                                Email address
                            </label>
                            <div className="relative">
                                <span className="absolute  text-blue-900 z-10  top-0 left-3 text-xl bottom-0 ws-12 flex items-center justify-center">
                                    <MdAlternateEmail />
                                </span>
                                <input
                                    className="p-3 rounded-full w-full  border pl-10  border-gray-300 ring-0 focus:ring-1 ring-blue-700 focus:outline-none"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData((d) => ({
                                            ...d,
                                            email: e.target.value,
                                        }))
                                    }
                                />
                            </div>

                            {errors.email ? (
                                <p className="text-[12px] text-red-600 mt-1 font-semibold">
                                    {errors.email}
                                </p>
                            ) : null}
                        </div>
                        <div className="space-y-1">
                            <label className="" htmlFor="image">
                                Profile picture
                            </label>
                            <div
                                className="p-3 flex flex-col items-center space-y-2 border-2 border-dashed cursor-pointer  border-blue-600/40 rounded-2xl w-full"
                                onClick={filePicker}
                            >
                                <div className="w-12 h-12 border-2 border-blue-600/80 relative rounded-full grid place-content-center">
                                    {data.image ? (
                                        <>
                                            <span
                                                className="absolute -right-8 tsop-6 bottom-2 rounded-full text-red-900"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    setData((d) => ({
                                                        ...d,
                                                        image: null,
                                                    }));
                                                }}
                                            >
                                                <AiFillCloseSquare />
                                            </span>
                                            <img
                                                src={URL.createObjectURL(
                                                    data.image
                                                )}
                                                className="w-10 h-10 object-cover rounded-full"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {data.image_url ? (
                                                <>
                                                    <span
                                                        className="absolute -right-8 tsop-6 bottom-2 rounded-full text-red-900"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            setData((d) => ({
                                                                ...d,
                                                                image: null,
                                                                image_url: null,
                                                            }));
                                                        }}
                                                    >
                                                        <AiFillCloseSquare />
                                                    </span>
                                                    <img
                                                        src={data.image_url}
                                                        className="w-10 h-10 object-cover rounded-full"
                                                    />
                                                </>
                                            ) : (
                                                <img
                                                    src="/images/camera.png"
                                                    className="w-10 h-10 object-cover opacity-30"
                                                />
                                            )}
                                        </>
                                    )}
                                </div>
                                <p className="text-xs text-gray-600">
                                    Click to choose image [MAX: 2Mb]
                                </p>
                                <input
                                    value=""
                                    //   style={{ visibility: "hidden", opacity: 0 }}
                                    className="hidden"
                                    ref={inputRef}
                                    type="file"
                                    accept="image/png, image/jpeg,  image/jpg"
                                    onChange={(e) =>
                                        handleFileUpload(e.target.files)
                                    }
                                />
                            </div>
                            {errors.image ? (
                                <p className="text-[12px] text-red-600 mt-1 font-semibold">
                                    {errors.image}
                                </p>
                            ) : null}
                        </div>
                        <MultiSelect
                            categories={categoriesData}
                            setCategories={handleCategories}
                        />
                        <div className="space-y-1 md:col-span-2 min-h-[100px]">
                            <div className="flex items-center justify-between">
                                <label className="" htmlFor="categories">
                                    Choose location
                                </label>

                                {location.show ? (
                                    <button
                                        onClick={() => {
                                            setLocation((l) => ({
                                                ...l,
                                                show: false,
                                            }));
                                            setData((d) => ({
                                                ...d,
                                                lat: null,
                                                lng: null,
                                            }));
                                        }}
                                        className="p-1 px-2 text-xs text-white bg-red-500 inline-flex items-center justify-center space-x-2 rounded-lg"
                                        type="button"
                                    >
                                        <BiX />
                                        <span>Cancel</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            setLocation((l) => ({
                                                ...l,
                                                show: true,
                                            }))
                                        }
                                        className="p-1 px-2 text-xs text-white bg-orange-500 inline-flex items-center justify-center space-x-2 rounded-lg"
                                        type="button"
                                    >
                                        <BiPin />
                                        <span>Open map</span>
                                    </button>
                                )}
                            </div>
                            {location.show ? (
                                <LocationPicker
                                    containerElement={
                                        <div style={{ height: "100%" }} />
                                    }
                                    mapElement={
                                        <div style={{ height: "300px" }} />
                                    }
                                    defaultPosition={location}
                                    onChange={(l) => {
                                        setData((d) => ({
                                            ...d,
                                            ...l.position,
                                        }));
                                        setLocation((o) => ({
                                            ...o,
                                            ...l.position,
                                        }));
                                    }}
                                />
                            ) : null}
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <button
                            type={processing ? "button" : "submit"}
                            className={`rounded-full bg-blue-600 text-white inline-flex ${
                                processing
                                    ? "bg-opacity-70"
                                    : "hover:scale-[1.03]  hover:shadow-lg  "
                            } items-center justify-center space-x-2 transition-all ease-in p-2 px-4 w-full md:w-auto  md:min-w-[280px]`}
                        >
                            {processing ? (
                                <Spinner />
                            ) : (
                                <>
                                    <span>Save changes</span>
                                    <BiSave />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}

export default Create;
