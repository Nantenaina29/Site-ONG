<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin ONG',
            'email' => 'admin@tsinjoaina.mg', // ITY NO EMAIL-NAO
            'password' => Hash::make('admin123'), // ITY NO PASSWORD-NAO
        ]);
    }
}