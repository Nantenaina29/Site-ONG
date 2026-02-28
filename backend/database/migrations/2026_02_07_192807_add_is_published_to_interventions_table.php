<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('interventions', function (Blueprint $table) {
            // Ampiana ilay colonne, ary atao "false" (tsy mivoaka) foana aloha ny default
            $table->boolean('is_published')->default(false)->after('location');
        });
    }
    
    public function down(): void
    {
        Schema::table('interventions', function (Blueprint $table) {
            $table->dropColumn('is_published');
        });
    }
};
