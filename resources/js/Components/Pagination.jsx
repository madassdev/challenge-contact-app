import React from "react";
import DOMPurify from "dompurify";
import parse from 'html-react-parser';
import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    const htmlFrom = (htmlString) => {
        const cleanHtmlString = DOMPurify.sanitize(htmlString,
          { USE_PROFILES: { html: true } });
        const html = parse(cleanHtmlString);
        return html;
}

    function getClassName(active) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded-full hover:bg-gray-500 focus:border-primary focus:text-primary bg-primary text-white";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded-full hover:bg-white focus:border-primary focus:text-primary";
        }
    }

    return (
        links.length > 3 && (
            <div className="mb-4">
                <div className="flex flex-wrap mt-8">
                    {links.map((link, key) =>
                        link.url === null ? (
                            <div
                                key={key}
                                className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded-full"
                            >
                                {htmlFrom(link.label)}
                            </div>
                        ) : (
                            <Link
                                className={getClassName(link.active)}
                                href={link.url}
                                key={key}
                            >
                                {htmlFrom(link.label)}
                            </Link>
                        )
                    )}
                </div>
            </div>
        )
    );
}
