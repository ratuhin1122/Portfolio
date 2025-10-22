import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import  Hero  from '@/pages/Hero/Hero';
import About from '@/pages/About/About';
import Footer from '@/pages/Footer/Footer';
import Navbar from '@/pages/Navbar/Navbar';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            {/* <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head> */}

                <Navbar/> 
                <Hero/>
                <About/>
                <Footer/>
            
        </>
    );
}
