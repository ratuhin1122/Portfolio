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
        $apiKey    = env('YOUTUBE_API_KEY');
        $channelId = env('YOUTUBE_CHANNEL_ID');

        // ── 1. Get the "uploads" playlist ID for this channel ──────────────
        $channel = Http::get('https://www.googleapis.com/youtube/v3/channels', [
            'part' => 'contentDetails',
            'id'   => $channelId,
            'key'  => $apiKey,
        ]);

        $uploads = $channel->json('items.0.contentDetails.relatedPlaylists.uploads') ?? null;
        if (! $uploads) {
            return ['latest' => [], 'mostViewed' => []];
        }

        // ── 2. Paginate through ALL playlist items to collect every video ID ─
        //    YouTube's playlistItems API caps at 50 per page, so we must follow
        //    nextPageToken to reach videos beyond the first 50.
        $allVideoIds   = [];
        $nextPageToken = null;

        do {
            $params = [
                'part'       => 'contentDetails',
                'playlistId' => $uploads,
                'maxResults' => 50,
                'key'        => $apiKey,
            ];

            if ($nextPageToken) {
                $params['pageToken'] = $nextPageToken;
            }

            $plist = Http::get('https://www.googleapis.com/youtube/v3/playlistItems', $params);

            if (! $plist->successful()) {
                break;
            }

            $ids = collect($plist->json('items', []))
                ->map(fn($it) => $it['contentDetails']['videoId'] ?? null)
                ->filter()
                ->values()
                ->all();

            $allVideoIds   = array_merge($allVideoIds, $ids);
            $nextPageToken = $plist->json('nextPageToken');

        } while ($nextPageToken);

        if (empty($allVideoIds)) {
            return ['latest' => [], 'mostViewed' => []];
        }

        // ── 3. Batch-fetch video details (snippet + statistics) ─────────────
        //    The videos API also caps at 50 IDs per request, so chunk the list.
        $allItems = collect();

        foreach (array_chunk($allVideoIds, 50) as $chunk) {
            $videos = Http::get('https://www.googleapis.com/youtube/v3/videos', [
                'part' => 'snippet,statistics',
                'id'   => implode(',', $chunk),
                'key'  => $apiKey,
            ]);

            if (! $videos->successful()) {
                continue;
            }

            $mapped = collect($videos->json('items', []))->map(function ($it) {
                return [
                    'videoId'     => $it['id'] ?? null,
                    'title'       => $it['snippet']['title'] ?? '',
                    'description' => $it['snippet']['description'] ?? '',
                    'thumb'       => $it['snippet']['thumbnails']['medium']['url']
                                     ?? ($it['snippet']['thumbnails']['default']['url'] ?? ''),
                    'publishedAt' => $it['snippet']['publishedAt'] ?? null,
                    'viewCount'   => isset($it['statistics']['viewCount'])
                                     ? (int) $it['statistics']['viewCount']
                                     : 0,
                ];
            })->filter()->values();

            $allItems = $allItems->merge($mapped);
        }

        // ── 4. Sort & slice ─────────────────────────────────────────────────
        //    latest     → newest published videos (from the full channel)
        //    mostViewed → highest view-count videos (from the full channel)
        $latest     = $allItems->sortByDesc('publishedAt')->take($info['latestMax']     ?? 2)->values();
        $mostViewed = $allItems->sortByDesc('viewCount')  ->take($info['mostViewedMax'] ?? 2)->values();

        return [
            'latest'     => $latest,
            'mostViewed' => $mostViewed,
        ];
    }
}
