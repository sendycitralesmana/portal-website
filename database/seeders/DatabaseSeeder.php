<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ProfilPimpinanSeeder::class);
        $this->call(TugasFungsiSeeder::class);
        $this->call(VisiMisiSeeder::class);
        $this->call(PejabatStrukturalSeeder::class);
        $this->call(PerwakilanDaerahSeeder::class);
        $this->call(TentangKamiSeeder::class);
        $this->call(SosialMediaSeeder::class);
        $this->call(StrukturOrganisasiSeeder::class);
        $this->call(VideoInfoSeeder::class);
        $this->call(LayananSeeder::class);
    }
}
