import Pagination from "@/Components/Pagination";
import MainLayout from "@/Layouts/MainLayout";
import { Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
    AiOutlineArrowRight,
    AiOutlineClose,
    AiOutlineEdit,
    AiOutlineSearch,
} from "react-icons/ai";
import {
    BiChevronDown,
    BiDownload,
    BiFilterAlt,
    BiPlus,
    BiUserPlus,
} from "react-icons/bi";
import Spinner from "./Spinner";
import ContactRow from "./ContactRow";
import CategoryFilter from "./CategoryFilter";
import { toast } from "react-hot-toast";

function Index({ contacts, searchTerm, categories, filteredCategories }) {
    const [contactsData, setContactsData] = useState(contacts.data);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [categoriesData, setCategoriesData] = useState(categories);
    useEffect(() => {
        setContactsData(contacts.data);
        const data = categories.map((cat) => {
            const catExists = filteredCategories.filter(
                (c) => c.title == cat.title
            );
            return { ...cat, selected: catExists.length };
        });
        setCategoriesData(data);
        setLoading(false);
    }, [filteredCategories]);

    function handleDelete(contact) {
        const newContacts = contactsData.filter((c) => c.id != contact.id);
        setContactsData(newContacts);
    }
    const [term, setTerm] = useState(searchTerm);
    function clearSearch(e) {
        e.preventDefault();

        setLoading(true);
        router.get(
            route("contacts.index"),
            {},
            {
                onSuccess: (page) => {
                    setLoading(false);
                },
            }
        );
    }
    function search(e) {
        e.preventDefault();
        setLoading(true);
        router.get(
            route("contacts.index"),
            { search: term },
            {
                onSuccess: (page) => {
                    setLoading(false);
                },
            }
        );
    }

    function selectCategory(category) {
        const data = categoriesData.map((cat) => {
            return {
                ...cat,
                selected:
                    cat.title == category.title ? !cat.selected : cat.selected,
            };
        });

        setCategoriesData(data);
    }

    function clearFilter() {
        const data = categories.map((cat) => {
            return { ...cat, selected: false };
        });
        setCategoriesData(data);
    }

    function filterCategories() {
        const selectedCategories = categoriesData.filter((c) => c.selected);
        setLoading(true);
        router.post(
            route("contacts.index"),
            { categories: selectedCategories },
            {
                onSuccess: (page) => {
                    setLoading(false);
                    setTerm("");
                },
            }
        );
        console.log(selectedCategories);
    }

    function downloadContacts() {
        setDownloading(true);
        const url = route("contacts.download", {
            categories: filteredCategories,
            search: term,
        });
        fetch(url)
            .then((resp) => resp.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;

                a.download = `Contacts-${format(new Date(), "dd/M/yyyy")}.csv`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                toast.success("Download successful", { position: "top-right" });
                setDownloading(false);
            })
            .catch(() => {
                toast.error("An error occurred while downloading", {
                    position: "top-right",
                });
                setDownloading(false);
            });
    }

    return (
        <MainLayout>
            <div className="bg-white p-3 md:p-16 md:px-24 space-y-2">
                <div className="flex items-center">
                    <div className="flex-1  space-y-4">
                        <p className="text-xl font-bold text-blue-600">
                            Manage all your contacts
                        </p>
                        <p className="text-gray-600 text-xs max-w-[580px]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Accusamus possimus itaque mollitia ab
                            distinctio fugit asperiores nostrum eos, veritatis
                            quis nemo.
                        </p>

                        <Link
                            href={route("contacts.create")}
                            className="bg-blue-900 text-white p-2  px-4 rounded-full hidden md:inline-flex items-center justify-center space-x-2"
                        >
                            <span>Create contact</span>
                            <BiPlus />
                        </Link>
                    </div>
                    <div className="w-1/3 flex items-center  justify-center">
                        <img src="/images/share.png" className="w-[180px]" />
                    </div>
                </div>
            </div>
            <hr />
            <div className="md:px-8 md:p-5 bg-white">
                <div className="w-full p-3 text-primary flex items-center justify-between">
                    <p>Contacts list</p>
                    <Link
                        href={route("contacts.create")}
                        className="bg-blue-900 text-xs text-white p-1  px-2 rounded-lg inline-flex items-center justify-center space-x-2"
                    >
                        <span>Create new</span>
                        <BiPlus />
                    </Link>
                </div>
                <div className="p-3 w-full">
                    <div className="flex md:items-center flex-col space-y-4 w-full">
                        <form onSubmit={search} className="flex flex-col md:flex-row items-center space-x-4 md:w-2/3 mx-auto w-full">
                            <p className="text-xs text-gray-400 italic">
                                Search by name, email or phone
                            </p>
                            <div className="flex items-center space-x-2 w-full">
                                <input
                                    className="p-1 w-full px-2 rounded-xl text-sm border border-gray-300"
                                    type="text"
                                    value={term}
                                    onChange={(e) => setTerm(e.target.value)}
                                />
                                <button className="bg-primary text-white rounded-full p-1 px-2">
                                    <AiOutlineSearch />
                                </button>
                            </div>
                            <p
                                onClick={clearSearch}
                                className="cursor-pointer text-xs italic underline text-orange-600  text-right"
                            >
                                Clear
                            </p>
                        </form>
                        <div className="">
                            <div className="flex items-center space-x-2">
                                <p className="text-xs md:text-base  text-gray-500  uppercase space-x-2 flex items-center">
                                    <BiFilterAlt />
                                    <span>Filter by</span>
                                </p>
                                <div className="flex space-x-2 items-center">
                                    <CategoryFilter
                                        categories={categoriesData}
                                        selectCategory={selectCategory}
                                        onFilter={filterCategories}
                                        clearFilter={clearFilter}
                                    />
                                    <div className="flex flex-wrap space-x-2 px-3">
                                        <span className="text-xs italic text-gray-400">
                                            {
                                                categoriesData.filter(
                                                    (c) => c.selected
                                                ).length
                                            }{" "}
                                            selected
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="p-3 flex items-center justify-end">
                                <button
                                    onClick={() =>
                                        downloading
                                            ? toast.error("Please wait", {
                                                  position: "bottom-right",
                                              })
                                            : downloadContacts()
                                    }
                                    className="bg-orange-500 flex items-center justify-center w-32 space-x-2 text-white rounded-lg p-1 px-2 text-xs font-bold"
                                >
                                    {downloading ? (
                                        <Spinner />
                                    ) : (
                                        <>
                                            <span>Export CSV</span>
                                            <BiDownload />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="w-full border-collapse rounded-xl">
                    <thead>
                        <tr className="text-xs">
                            <th className="hidsden md:table-cell bg-gray-100 p-2">S/N</th>
                            <th className="hidden md:table-cell bg-gray-100 p-3">Image</th>
                            <th className="hidden md:table-cell border bg-gray-100 p-3 px-6 text-left">
                                Email
                            </th>
                            <th className="md:hidden border bg-gray-100 p-3 px-6 text-left">
                                Contact info
                            </th>
                            <th className="hidden md:table-cell border bg-gray-100 p-3 px-6 text-left">
                                Phone
                            </th>
                            <th className="hidden md:table-cell border bg-gray-100 p-3 px-6 text-left">
                                Name
                            </th>
                            <th className="hidden md:table-cell border bg-gray-100 p-3 px-6 text-left">
                                Categories
                            </th>
                            <th className="border bg-gray-100 p-3 px-6 text-left">
                                Action
                            </th>
                        </tr>
                    </thead>
                    {loading ? (
                        <tr>
                            <td colSpan={7}>
                                <div className="min-h-[40vh] bg-white flex  items-center  justify-center">
                                    <Spinner src="/images/SpinnerPrimary.svg" />
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <>
                            {contactsData.length ? (
                                // {contactsData.length ? (
                                <>
                                    <tbody>
                                        {contactsData.map((contact, i) => (
                                            <ContactRow
                                                contact={contact}
                                                i={i}
                                                key={contact.id}
                                                handleDelete={handleDelete}
                                            />
                                        ))}
                                        <tr>
                                            <td colSpan={7}>
                                                <div className="p-3 bg-white border border-gray-200">
                                                    <Pagination
                                                        class="mt-6"
                                                        links={contacts.links}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </>
                            ) : (
                                <tr>
                                    <td colSpan={7}>
                                        <div className="h-[40vh] bg-white border border-gray-300 w-full flex flex-col space-y-8 items-center justify-center">
                                            <img
                                                src="/images/nodata.png"
                                                className="w-[80px] md:w-[120px]"
                                            />

                                            <p className="text-gray-400">
                                                No data here
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    )}
                </table>
            </div>
        </MainLayout>
    );
}

export default Index;
