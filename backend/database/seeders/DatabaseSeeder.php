<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::create([
            'name' => 'user1',
            'email' => 'user1@gmail.com', // Ensure email is unique
            'password' => Hash::make('userpassword'),
        ]);

        User::create([
            'name' => 'user2',
            'email' => 'user2@gmail.com', // Ensure email is unique
            'password' => Hash::make('userpassword'),
        ]);

        User::create([
            'name' => 'user3',
            'email' => 'user3@gmail.com', // Ensure email is unique
            'password' => Hash::make('userpassword'),
        ]);

        User::create([
            'name' => 'user4',
            'email' => 'user4@gmail.com', // Ensure email is unique
            'password' => Hash::make('userpassword'),
        ]);
    }
}
