import React from 'react';
import Navbar from '@/pages/Navbar/Navbar';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

// Defines the shape of a single lyric object
interface Lyric {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

// Props interface for the Lyrics component
interface LyricsProps {
    lyrics: Lyric[];
}

const Lyrics = ({ lyrics = [] }: LyricsProps) => {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-white">
            <Navbar />
            
            <div className="pt-24 px-4 sm:px-8 max-w-7xl mx-auto">
                <Link 
                    href="/" 
                    className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium text-lg">Back to Home</span>
                </Link>

                <div className="space-y-12 pb-20">
                   <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                            Song Lyrics
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Collection of lyrics from my latest tracks.
                        </p>
                   </div>

                    {/* Dynamic Lyrics Content */}
                    {lyrics.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-8">
                            {lyrics.map((lyric) => (
                                <div key={lyric.id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-cyan-500/30 transition-colors group">
                                    <h2 className="text-2xl font-semibold mb-4 text-cyan-200 group-hover:text-cyan-100 transition-colors">{lyric.title}</h2>
                                    <div className="space-y-4 text-gray-300 italic font-mono whitespace-pre-wrap max-h-[400px] overflow-y-auto custom-scrollbar">
                                        {lyric.content}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-500">
                                        Added: {new Date(lyric.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white/5 rounded-xl border border-white/5 border-dashed">
                            <p className="text-gray-400 text-xl">No lyrics published yet. Stay tuned!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Lyrics;
