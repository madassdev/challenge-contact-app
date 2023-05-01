<?php

namespace App\Http\Controllers;

use App\Exports\ContactsExport;
use App\Models\Category;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    //
    public function index(Request $request)
    {
        $per_page = $request->per_page ?? 50;
        $term = "";
        $filteredCategories = [];

        $user = auth()->user();

        // Fetch contacts
        $contacts = Contact::query();
        $contacts = $contacts->with('categories');

        // Search by name, email or phone
        if ($request->search) {
            $term = $request->search;
            $contacts = $contacts->where('name', 'LIKE', '%' . $term . '%')
                ->orWhere('email', 'LIKE', '%' . $term . '%')
                ->orWhere('phone', 'LIKE', '%' . $term . '%');

        }

        // Filter by categories
        if ($request->categories) {
            $filteredCategories = $request->categories;
            $category_ids = collect($request->categories)->pluck('id');
            $contacts = $contacts->whereHas('categories', fn($query) =>
                $query->whereIn('categories.id', $category_ids));

        }

        // Prepare params for frontend
        $searchTerm = $term;
        $categories = Category::all();

        // Paginate query for response
        $contacts = $contacts->paginate($per_page)->appends($request->query());

        return inertia('Dashboard/Index', compact('contacts', 'categories', 'searchTerm', 'filteredCategories'));
    }

    public function download(Request $request)
    {

        // Fetch contacts
        $contacts = Contact::query();

        // Search by name, email or phone
        if ($request->search) {
            $term = $request->search;
            $contacts = $contacts->where('name', 'LIKE', '%' . $term . '%')
                ->orWhere('email', 'LIKE', '%' . $term . '%')
                ->orWhere('phone', 'LIKE', '%' . $term . '%');

        }

        // Filter by categories
        if ($request->categories) {
            $category_ids = collect($request->categories)->pluck('id');
            $contacts = $contacts->whereHas('categories', fn($query) =>
                $query->whereIn('categories.id', $category_ids));

        }

        // Prepare for export
        $downloader = new ContactsExport($contacts);
        $date = date('d-m-Y');

        return $downloader->download("CONTACTS-$date.csv");
    }


    public function create()
    {
        $categories = Category::all();
        return inertia('Dashboard/Create', compact('categories'));
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        // Validate request
        $request->validate([
            "name" => ["required", "min:3", "max:255"],
            "phone" => ["required", "unique:contacts,phone"],
            "email" => ["required", "email"],
            "lat" => ["nullable", "numeric"],
            "lng" => ["nullable", "numeric"],
            "address" => ["nullable", "max:255"],
        ]);

        // Create contact
        $contact = Contact::create($request->only(['name', 'phone', 'email', 'lat', 'lng', 'address']));

        // Save contact image
        if ($request->file('image')) {

            // Validate request for image file
            $request->validate([
                'image' => 'required|image|max:2048',
            ]);

            // Upload image
            $path_id = str()->random(rand(24, 40));
            $file = $request->file('image');
            $extension = $file->extension();
            $filename = $path_id . '.' . $extension;
            $file->storeAs('images', $filename, 'contacts');

            // Save contact image
            $file_url = asset("/contacts/images/" . $filename);
            $contact->image_url = $file_url;
            $contact->save();
        }

        // Save contact categories from request
        if (sizeof($request->categories)) {

            // Fetch categories  by name or create new
            $requestCategories = collect($request->categories)->map(function ($category) {
                return @$category["id"] ? $category : Category::updateOrcreate(["title" => $category["title"]], ["title" => $category["title"]]);
            });

            // Sync contact categories
            $contact->categories()->sync($requestCategories->pluck("id"));
        }


        return redirect()->route('contacts.index');

    }

    public function edit(Contact $contact)
    {

        $categories = Category::all();
        $contact->load('categories');

        return inertia("Dashboard/Edit", compact('contact', 'categories'));
    }

    public function update(Contact $contact, Request $request)
    {
        $user = auth()->user();
        $request->validate([
            "name" => ["required", "min:3", "max:255"],
            "phone" => ["required", "unique:contacts,phone,".$contact->id],
            "email" => ["nullable", "email"],
            "lat" => ["nullable", "numeric"],
            "lng" => ["nullable", "numeric"],
            "address" => ["nullable", "max:255"],
        ]);

        // Create contact
        $contact->update($request->only(['name', 'phone', 'email', 'image_url', 'lat', 'lng', 'address']));

        // Save contact image
        if ($request->file('image')) {

            // Validate request for image file
            $request->validate([
                'image' => 'required|image|max:2048',
            ]);

            // Upload image
            $path_id = str()->random(rand(24, 40));
            $file = $request->file('image');
            $extension = $file->extension();
            $filename = $path_id . '.' . $extension;
            $file->storeAs('images', $filename, 'contacts');

            // Save contact image
            $file_url = asset("/contacts/images/" . $filename);
            $contact->image_url = $file_url;
            $contact->save();
        }

        // Save contact categories from request
        if (sizeof($request->categories)) {

            // Fetch categories  by name or create new
            $requestCategories = collect($request->categories)->map(function ($category) {
                return @$category["id"] ? $category : Category::updateOrcreate(["title" => $category["title"]], ["title" => $category["title"]]);
            });

            // Sync contact categories
            $contact->categories()->sync($requestCategories->pluck("id"));
        }


        return redirect()->route('contacts.index');

    }

    public function destroy(Contact $contact)
    {
        // Delete contact
        $contact->delete();
        return back();
    }


}