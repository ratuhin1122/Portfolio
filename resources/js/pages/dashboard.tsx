import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Trash2, PlusCircle } from 'lucide-react';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Lyric {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

interface DashboardProps {
    lyrics: Lyric[];
}

export default function Dashboard({ lyrics }: DashboardProps) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        content: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/lyrics', {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this lyric?')) {
            router.delete(`/lyrics/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-8 p-4 md:p-8">
                {/* View Lyrics Page Button */}
                <div className="flex justify-center w-full">
                    <Link
                        href="/lyrics"
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        View Lyrics Page
                    </Link>
                </div>
                {/* Add New Lyric Section */}
                <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:bg-sidebar dark:border-sidebar-border">
                    <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
                        <PlusCircle className="h-5 w-5 text-indigo-500" />
                        Add New Song Lyrics
                    </h2>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Song Title</label>
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                                required
                            />
                            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lyrics Content</label>
                            <textarea
                                id="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                rows={10}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 font-mono"
                                required
                            />
                            {errors.content && <div className="text-red-500 text-sm mt-1">{errors.content}</div>}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                            >
                                {processing ? 'Saving...' : 'Publish Lyrics'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* List Existing Lyrics */}
                <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:bg-sidebar dark:border-sidebar-border">
                    <h2 className="mb-4 text-xl font-semibold">Published Lyrics ({lyrics.length})</h2>
                    {lyrics.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400">No lyrics published yet.</p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {lyrics.map((lyric) => (
                                <div key={lyric.id} className="relative rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                    <div className="absolute top-2 right-2">
                                        <button
                                            onClick={() => handleDelete(lyric.id)}
                                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                            title="Delete Lyric"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2 pr-8 truncate" title={lyric.title}>{lyric.title}</h3>
                                    <p className="text-xs text-gray-400 mb-2">Published: {new Date(lyric.created_at).toLocaleDateString()}</p>
                                    <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-4 font-mono bg-white dark:bg-black/30 p-2 rounded">
                                        {lyric.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
