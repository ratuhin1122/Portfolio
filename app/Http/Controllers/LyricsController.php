<?php

namespace App\Http\Controllers;

use App\Models\Lyrics;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LyricsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Lyrics/Lyrics', [
            'lyrics' => Lyrics::latest()->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        Lyrics::create($validated);

        return redirect()->back()->with('success', 'Lyrics added successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lyrics $lyric)
    {
        $lyric->delete();

        return redirect()->back()->with('success', 'Lyrics deleted successfully.');
    }
}
