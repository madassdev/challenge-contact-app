import React, { useState } from "react";
import LocationPicker from "react-location-picker";
import Spinner from "./Spinner";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";

function ContactDetails({ contact, editContact, deleteContact }) {
    const [deleting, setDeleting] = useState(false);
    return (
        <div className="space-y-4 p-3 md:p-12">
            <p className="text-center font-bold text-primary">
                Contact Information
            </p>
            <div className="flex itemss-center md:items-start flex-col md:flex-row gap-8">
                <div className="md:w-[180px] grid place-content-center w-full">
                    {contact.image_url ? (
                        <img
                            src={contact.image_url}
                            className="md:w-full rounded-full w-[80px]"
                        />
                    ) : (
                        <span className="font-semibold uppercase bg-purple-400/30 rounded-full text-purple-600 text-xs w-[80px] h-[80px] md:w-[180px] md:h-[180px] flex items-center justify-center">
                            {contact.name.slice(0, 2)}
                        </span>
                    )}
                </div>
                <div className="md:flex-1 p-0 md:p-5 bg-white shadosw rounded-2xl grid md:grid-cols-3 gap-2 md:gap-6">
                    <div className="col-span-1 md:col-span-1">
                        <p className="text-xs text-gray-400 italic">Name</p>
                        <p className="text-primaary font-bold text-xs">
                            {contact.name}
                        </p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <p className="text-xs text-gray-400 italic">Phone</p>
                        <p className="text-primaary font-bold text-xs">
                            {contact.phone}
                        </p>
                    </div>
                    <div className="col-span-3 md:col-span-1">
                        <p className="text-xs text-gray-400 italic">Email</p>
                        <p className="text-primaary font-bold text-xs">
                            {contact.email}
                        </p>
                    </div>
                    <div className="col-span-3 space-y-2">
                        <p className="text-xs text-gray-400 italic">
                            Categories
                        </p>
                        {contact.categories.length ? (
                            <div className="flex items-center flex-wrap gap-2">
                                {contact.categories.map((category, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center space-x-1 p-[2px]  px-[4px]
                                     bg-orange-200 text-orange-600
                             rounded text-[10px] font-bosld cursor-pointer`}
                                    >
                                        <span className="">
                                            {category.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                    {contact.lng ? (
                        <div className="col-span-3 space-y-2">
                            <p className="text-xs text-gray-400 italic">
                                Location
                            </p>
                            <div className="h-[100px] w-full">

                            <LocationPicker
                                containerElement={
                                    <div style={{ height: "100%", width:"auto" }} />
                                }
                                mapElement={<div style={{ height: "100%", width:"auto" }} />}
                                defaultPosition={{
                                    lng: parseFloat(contact.lng),
                                    lat: parseFloat(contact.lat),
                                }}
                                onChange={(l) => {

                                }}
                            />
                            </div>

                        </div>
                    ) : null}

                    <div className="col-span-3 flex justify-end p-3">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    editContact(contact);
                                }}
                                className="h-8 w-24 inline-flex text-xs text-white rounded-lg bg-blue-900 items-center justify-center space-x-1"
                            >
                                <AiOutlineEdit />
                                <span>Edit</span>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleting(true)
                                    deleteContact(contact);
                                }}
                                className="h-8 w-24 inline-flex text-xs text-white rounded-lg bg-red-600 items-center justify-center space-x-1"
                            >
                                {deleting ? (
                                    <Spinner />
                                ) : (
                                    <>
                                        <AiOutlineClose />
                                        <span>Delete</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactDetails;
