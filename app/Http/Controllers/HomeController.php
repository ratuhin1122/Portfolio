<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Services\YouTubeService;

class HomeController extends Controller
{
    public function __construct(
        protected YouTubeService $youTube,
    ) {}

    public function index()
    {
        $channelHighlights = $this->youTube->channelHighlights([
            'latestMax' => 4,
            'mostViewedMax' => 4
        ]);

        return Inertia::render('welcome', [
            ...$channelHighlights,
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }
}
