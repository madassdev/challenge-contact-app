import { Link, router } from "@inertiajs/react";
import React, { useContext, useState } from "react";
import Spinner from "./Spinner";
import {
    AiOutlineClose,
    AiOutlineEdit,
    AiOutlineMail,
    AiOutlinePhone,
    AiOutlineProfile,
} from "react-icons/ai";
import { toast } from "react-hot-toast";
import { BiMap, BiUserCircle } from "react-icons/bi";
import { AppContext } from "@/context/AppContext";
import ContactDetails from "./ContactDetails";

function ContactRow({ contact, i, handleDelete }) {
    // router
    const { setModal, closeModal } = useContext(AppContext);
    function editContact(contact) {
        closeModal();
        router.get(route("contacts.edit", contact));
    }

    function showContact() {
        setModal({
            show: true,
            content: (
                <ContactDetails
                    contact={contact}
                    deleting={deleting}
                    editContact={editContact}
                    deleteContact={deleteContact}
                />
            ),
            size: "md:w-[80vw]",
        });
    }

    const [deleting, setDeleting] = useState(false);
    function deleteContact(contact) {
        const proceed = confirm("Are you sure  you want to delete contact?");
        if (proceed) {
            setDeleting(true);
            router.delete(route("contacts.delete", contact), {
                onSuccess: (page) => {
                    closeModal();
                    toast.success("Contact deleted.", {
                        position: "top-right",
                    });
                    setDeleting(false);
                    handleDelete(contact);
                },
            });
        }
    }

    return (
        <tr
            className="cursor-pointer hover:bg-gray-100/30"
            key={contact.id}
            onClick={showContact}
            // withdrawal={withdrawal}
            // onView={view}
        >
            <td className="hiddes md:table-cell border text-xs p-2 text-center">
                {i + 1}
            </td>
            <td className="hidden md:table-cell border text-xs p-4 px-8">
                {contact.image_url ? (
                    <img
                        src={contact.image_url}
                        className="w-10 h-10 rounded-full"
                    />
                ) : (
                    <span className="font-semibold uppercase bg-purple-400/30 rounded-full text-purple-600 text-xs w-10 h-10 flex items-center justify-center">
                        {contact.name.slice(0, 2)}
                    </span>
                )}
            </td>
            <td className="border text-xs p-2 md:p-4">
                <p className="hidden md:block text-blue-900 font-bold">{contact.phone}</p>
                <div className="md:hidden text-gray-600 italic">
                    <div className="space-x-2 flex items-center not-italic break-all text-blue-900 font-bold uppercase">
                        <AiOutlinePhone />
                        <span>{contact.phone}</span>
                    </div>
                    <div className="space-x-2 flex items-center break-all text-[10px] uppercase">
                        <BiUserCircle />
                        <span>{contact.name}</span>
                    </div>
                    <div className="space-x-2 flex break-all items-center text-[10px]">
                        <AiOutlineMail />
                        <span>{contact.email}</span>
                    </div>
                </div>

                <button className="flex items-center space-x-1 text-[10px] italic text-blue-400">
                    <AiOutlineProfile />
                    <span>Click to view</span>
                </button>
            </td>
            <td className="hidden md:table-cell border text-xs p-4 px-8">
                {contact.email}
            </td>
            <td className="hidden md:table-cell border text-xs p-2 md:px-4">
                <p className="capitalize">{contact.name}</p>
            </td>
            <td className="hidden md:table-cell border text-xs p-2 capitalize">
                {contact.categories.length ? (
                    <div className="flex items-center flex-wrap gap-2">
                        {contact.categories.map((category, i) => (
                            <div
                                key={i}
                                onClick={() => selectCategory(category)}
                                className={`flex items-center space-x-1 p-[2px]  px-[4px]
                                     bg-orange-200 text-orange-600
                             rounded text-[10px] font-bosld cursor-pointer`}
                            >
                                <span className="">{category.title}</span>
                            </div>
                        ))}
                    </div>
                ) : null}
            </td>
            <td className="border text-xs p-2 px-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            editContact(contact);
                        }}
                        className="h-8 w-12 inline-flex text-xs text-white rounded-lg bg-blue-900 items-center justify-center space-x-1"
                    >
                        <AiOutlineEdit />
                        {/* <span>Edit</span> */}
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteContact(contact);
                        }}
                        className="h-8 w-12 inline-flex text-xs text-white rounded-lg bg-red-600 items-center justify-center space-x-1"
                    >
                        {deleting ? <Spinner /> : <AiOutlineClose />}
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default ContactRow;
