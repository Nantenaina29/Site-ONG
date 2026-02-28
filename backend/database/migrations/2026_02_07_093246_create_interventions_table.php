<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('interventions', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Titre-n'ilay asa (ohatra: Formation)
            $table->text('description'); // Fanazavana fohy
            $table->string('image')->nullable(); // Rohy mankany amin'ny sary
            $table->string('icon')->nullable(); // Raha misy kisary manokana
            $table->timestamps();
        });
    }
     
    public function down(): void
    {
        Schema::dropIfExists('interventions');
    }
};
