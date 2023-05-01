<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create two users: main user and developer

        // User
        User::create([
            'name' => "User",
            'email' => "user@contactapp.test",
            'password' => bcrypt('UserPassword')
        ]);
        // Developer
        User::create([
            'name' => "Developer",
            'email' => "dev@contactapp.test",
            'password' => bcrypt('DevPassword')
        ]);

        // Create categories (e.g. personal, work, family, etc.)
        $categories = collect(['personal',  'work',  'family'])->each(function($category){
            Category::create([
                "title" => $category,
            ]);
        });

    }
}