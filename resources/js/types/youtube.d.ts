interface Player {
    nextVideo: () => void;
    previousVideo: () => void;
    playVideoAt: (index: number) => void;
    loadVideoById: (videoId: string) => void;
}

interface VideoItem {
    videoId: string;
    title: string;
    thumb: string;
}

interface VideoItem {
    videoId: string;
    title: string;
    description: string;
    thumb: string;
    publishedAt?: string;
    viewCount?: number;
}
