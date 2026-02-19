<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [HomeController::class, 'index'])->name('home');

use App\Http\Controllers\LyricsController;

// ... (existing imports)

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard', [
            'lyrics' => \App\Models\Lyrics::latest()->get()
        ]);
    })->name('dashboard');

    Route::post('/lyrics', [LyricsController::class, 'store'])->name('lyrics.store');
    Route::delete('/lyrics/{lyric}', [LyricsController::class, 'destroy'])->name('lyrics.destroy');
});

Route::get('/lyrics', [LyricsController::class, 'index'])->name('lyrics');

require __DIR__ . '/settings.php';
