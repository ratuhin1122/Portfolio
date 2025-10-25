import { Card } from '@/components/ui/card';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useRef } from 'react';
import YouTube from 'react-youtube';

const ChannelHighlights = () => {
    const { latest, mostViewed } = usePage<SharedData & WelcomeProps>().props;
    const playerRef = useRef<Player | null>(null);

    const onReady = (event: { target: Player }) => {
        playerRef.current = event.target;
    };

    const playVideo = (videoId: string) => {
        // load the selected video by id (typed, no `any`)
        playerRef.current?.loadVideoById?.(videoId);
    };

    const firstVideoId =
        latest.length > 0
            ? latest[0].videoId
            : mostViewed.length > 0
              ? mostViewed[0].videoId
              : '';

    return (
        <div className="flex flex-col items-center py-10">
            <div className="w-full max-w-3xl">
                <YouTube
                    className="w-full"
                    videoId={firstVideoId}
                    opts={{
                        width: '100%',
                        height: '400', // fixed height (or calculate via aspect ratio)
                    }}
                    onReady={onReady}
                />
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <Card className="rounded bg-white p-4 shadow">
                    <div className="mb-2 font-semibold">
                        <h6 className="text-xl">Latest 2 videos</h6>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {latest.map((v) => (
                            <button
                                key={v.videoId}
                                onClick={() => playVideo(v.videoId)}
                                className="text-left"
                            >
                                <img
                                    src={v.thumb}
                                    alt={v.title}
                                    className="h-[200px] w-full rounded object-cover"
                                />
                                <div className="mt-1 text-sm font-medium">
                                    {v.title}
                                </div>
                            </button>
                        ))}
                    </div>
                </Card>

                <Card className="rounded bg-white p-4 shadow">
                    <div className="mb-2 font-semibold">
                        <h6 className="text-xl">Most viewed 2 videos</h6>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {mostViewed.map((v) => (
                            <button
                                key={v.videoId}
                                onClick={() => playVideo(v.videoId)}
                                className="text-left"
                            >
                                <img
                                    src={v.thumb}
                                    alt={v.title}
                                    className="h-[200px] w-full rounded object-cover"
                                />
                                <div className="mt-1 text-sm font-medium">
                                    {v.title}
                                </div>
                            </button>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ChannelHighlights;
