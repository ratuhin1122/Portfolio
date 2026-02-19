import About from '@/pages/About/About';
import Footer from '@/pages/Footer/Footer';
import Hero from '@/pages/Hero/Hero';
import Navbar from '@/pages/Navbar/Navbar';
import ChannelHighlights from './Chennel/ChannelHighlights';

export default function Welcome(props: WelcomeProps) {
    console.log(props, props.mostViewed);

    return (
        <>
            {/* <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head> */}

            <Navbar />
            <section id="home">
                <Hero />
            </section>
            <section id="about">
                <About />
            </section>
            <section id="videos">
                <ChannelHighlights />
            </section>
            <Footer />
        </>
    );
}
