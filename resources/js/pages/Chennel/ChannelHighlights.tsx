import { Card } from '@/components/ui/card';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useRef } from 'react';
import YouTube from 'react-youtube';

// Assuming Player type is imported or defined elsewhere
// const Player = any; // Placeholder for Player type

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
        <div className="flex flex-col items-center py-40 ">
            {/* RESPONSIVE CHANGE 1: Main Video Player Container 
              Change max-w-3xl to be responsive for smaller screens
            */}
            {/* RESPONSIVE CHANGE 1: Main Video Player Container 
              Change max-w-3xl to be responsive for smaller screens
            */}
            <div className="w-full max-w-xl sm:max-w-3xl mb-40 aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10"> 
                <YouTube
                    className="w-full h-full"
                    videoId={firstVideoId}
                    opts={{
                        width: '100%',
                        height: '100%', // Use CSS aspect-ratio
                        playerVars: {
                            rel: 0,
                        }
                    }}
                    onReady={onReady}
                />
            </div>

            <div className="w-full max-w-7xl space-y-6">
                <div className="pt-6 lg:pb-4 font-semibold ">
                    <h6 className="lg:text-4xl text-2xl text-center lg:text-left text-cyan-400 font-mono tracking-wider"> LATEST VIDEOS  </h6>
                </div>
                <Card className="bg-black/40 backdrop-blur-sm border-white/5">
                    {/* RESPONSIVE CHANGE 2: Latest Videos Grid 
                      Default (mobile) is 2 cols. Tablet (sm) is 3 cols. Desktop (lg) is 4 cols.
                    */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4"> 
                        {latest.map((v) => (
                            <button
                                key={v.videoId}
                                onClick={() => playVideo(v.videoId)}
                                className="text-left cursor-pointer group hover:-translate-y-1 transition-transform duration-300"
                            >
                                <div className="relative overflow-hidden rounded-lg border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                                    <img
                                        src={v.thumb}
                                        alt={v.title}
                                        loading="lazy"
                                        className="aspect-video w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white bg-red-600 px-3 py-1 rounded-full text-xs font-bold">PLAY</span>
                                    </div>
                                </div>
                                <div className="mt-3 text-sm font-medium text-gray-300 group-hover:text-white line-clamp-2">
                                    {v.title}
                                </div>
                            </button>
                        ))}
                    </div>
                </Card>


                <div className="pt-6 lg:pb-4 font-semibold ">
                    <h6 className="lg:text-4xl text-2xl text-center lg:text-left text-cyan-400 font-mono tracking-wider">MOST VIEWED  </h6>
                </div>

                <Card className="bg-black/40 backdrop-blur-sm border-white/5">
                    {/* RESPONSIVE CHANGE 3: Most Viewed Grid
                      Default (mobile) is 2 cols. Tablet (sm) is 3 cols. Desktop (lg) is 4 cols.
                    */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4"> 
                        {mostViewed.slice(0, 8).map((v) => (
                            <button
                                key={v.videoId}
                                onClick={() => playVideo(v.videoId)}
                                className="text-left cursor-pointer group hover:-translate-y-1 transition-transform duration-300"
                            >
                                <div className="relative overflow-hidden rounded-lg border border-white/10 group-hover:border-violet-500/50 transition-colors">
                                    <img
                                        src={v.thumb}
                                        alt={v.title}
                                        loading="lazy"
                                        className="aspect-video w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white bg-red-600 px-3 py-1 rounded-full text-xs font-bold">PLAY</span>
                                    </div>
                                </div>
                                <div className="mt-3 text-sm font-medium text-gray-300 group-hover:text-white line-clamp-2">
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