<?php

namespace Database\Seeders;

use App\Models\Intervention;
use App\Models\Statistic;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. DATA HO AN'NY STATISTICS
        $stats = [
            ['label' => 'Projets Réalisés', 'value' => 150],
            ['label' => 'Bénéficiaires', 'value' => 5000],
            ['label' => "Régions d'intervention", 'value' => 22],
        ];

        foreach ($stats as $stat) {
            Statistic::create($stat);
        }

        // 2. DATA HO AN'NY DOMAINES D'INTERVENTION (Cards)
        $interventions = [
            [
                'title' => 'Formation',
                'description' => "Programmes d'apprentissage technique et transfert de compétences pour faciliter l'insertion professionnelle des jeunes.",
                'image' => 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=500'
            ],
            [
                'title' => 'Action Sociale',
                'description' => "Soutien aux familles vulnérables et programmes d'assistance pour la santé maternelle et infantile.",
                'image' => 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=500'
            ],
            [
                'title' => 'Entrepreneuriat',
                'description' => "Accompagnement à la création de micro-entreprises et coaching pour les jeunes porteurs de projets.",
                'image' => 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=500'
            ],
        ];

        foreach ($interventions as $item) {
            Intervention::create($item);
        }
    }
}