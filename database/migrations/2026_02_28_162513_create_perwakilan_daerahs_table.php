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
        Schema::create('perwakilan_daerahs', function (Blueprint $table) {
            $table->id();
            $table->string('kantor');
            $table->string('alamat');
            $table->string('telepon');
            $table->string('email');
            $table->string('whatsapp')->nullable();
            $table->string('twitter')->nullable();
            $table->string('tiktok')->nullable();
            $table->string('youtube')->nullable();
            $table->string('instagram')->nullable();
            $table->string('gambar')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perwakilan_daerahs');
    }
};
