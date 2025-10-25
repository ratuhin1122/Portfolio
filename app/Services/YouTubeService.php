<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class YouTubeService
{
    public function getPlaylist($id)
    {
        $apiKey = env('YOUTUBE_API_KEY');
        $resp = Http::get('https://www.googleapis.com/youtube/v3/playlistItems', [
            'part' => 'snippet,contentDetails',
            'maxResults' => 50,
            'playlistId' => $id,
            'key' => $apiKey,
        ]);

        if (! $resp->successful()) {
            return response()->json(['error' => 'failed to fetch'], 500);
        }

        $items = collect($resp->json('items', []))->map(function ($it) {
            return [
                'videoId' => $it['contentDetails']['videoId'] ?? null,
                'title'   => $it['snippet']['title'] ?? '',
                'thumb'   => $it['snippet']['thumbnails']['default']['url'] ?? '',
            ];
        })->filter()->values();

        return $items;
    }

    public function channelHighlights(array $info)
    {
        $apiKey = env('YOUTUBE_API_KEY');
        $channelId = env('YOUTUBE_CHANNEL_ID');

        // get uploads playlist id
        $channel = Http::get('https://www.googleapis.com/youtube/v3/channels', [
            'part' => 'contentDetails',
            'id' => $channelId,
            'key' => $apiKey,
        ]);

        $uploads = $channel->json('items.0.contentDetails.relatedPlaylists.uploads') ?? null;
        if (! $uploads) {
            return response()->json(['error' => 'no_uploads_playlist'], 404);
        }

        // get playlist items (up to 50)
        $plist = Http::get('https://www.googleapis.com/youtube/v3/playlistItems', [
            'part' => 'contentDetails,snippet',
            'playlistId' => $uploads,
            'maxResults' => 50,
            'key' => $apiKey,
        ]);

        $videoIds = collect($plist->json('items', []))
            ->map(fn($it) => $it['contentDetails']['videoId'] ?? null)
            ->filter()
            ->values()
            ->all();

        if (empty($videoIds)) {
            return response()->json(['latest' => [], 'mostViewed' => []]);
        }

        // fetch video details (statistics + snippet)
        $videos = Http::get('https://www.googleapis.com/youtube/v3/videos', [
            'part' => 'snippet,statistics',
            'id' => implode(',', $videoIds),
            'maxResults' => 50,
            'key' => $apiKey,
        ]);

        $items = collect($videos->json('items', []))->map(function ($it) {
            return [
                'videoId'     => $it['id'] ?? null,
                'title'       => $it['snippet']['title'] ?? '',
                'description' => $it['snippet']['description'] ?? '',
                'thumb'       => $it['snippet']['thumbnails']['medium']['url'] ?? ($it['snippet']['thumbnails']['default']['url'] ?? ''),
                'publishedAt' => $it['snippet']['publishedAt'] ?? null,
                'viewCount'   => isset($it['statistics']['viewCount']) ? (int) $it['statistics']['viewCount'] : 0,
            ];
        })->filter()->values();

        $latest = $items->sortByDesc('publishedAt')->take($info['latestMax'] ?? 2)->values();
        $mostViewed = $items->sortByDesc('viewCount')->take($info['mostViewedMax'] ?? 2)->values();

        return [
            'latest' => $latest,
            'mostViewed' => $mostViewed,
        ];
    }
}
