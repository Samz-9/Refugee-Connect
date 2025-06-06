import React from 'react'
import Footer from '@/components/footer'
const About = () => {
    return (
        <div className="min-h-screen bg-green-50 text-green-900 font-sans ">
            <div className="px-6 py-12 mx-auto">
                <h1 className="text-4xl font-bold mb-4 font-serif text-center">About Climate Refugee Connect</h1>
                <p className="text-lg text-center mb-10">
                    We are dedicated to helping people displaced by climate change find safety, opportunity, and hope.
                </p>

                <div className="grid gap-14 md:grid-cols-2 items-center">
                    <img src="/image.png" alt="Map" className="rounded-xl object-cover w-full shadow-md border border-green-300" />

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
                        <p className="mb-4">
                            Climate change is displacing millions. Our mission is to help them find safe new homes and thriving communities. We connect people based on their background, skills, and language to areas that are both welcoming and prepared to assist.
                        </p>
                        <p className="mb-4">
                            With the support of local communities, NGOs, and job networks, we aim to give every climate refugee a fresh start.
                        </p>
                        <p>
                            {`Whether you're looking for help or want to offer it — we're here to build a more resilient, compassionate world.`}
                        </p>

                    </div>
                </div>

                <div className="mt-16 bg-green-100 p-6 rounded-xl shadow-inner">
                    <h2 className="text-xl font-semibold text-center">Why Climate Refugee Connect?</h2>
                    <ul className="list-disc pl-6 text-base leading-relaxed">
                        <li>Personalized relocation suggestions based on your needs</li>
                        <li>Partnered with trustworthy communities and aid groups</li>
                        <li>Designed for accessibility and safety</li>
                        <li>Powered by compassion and data</li>
                    </ul>
                    <div className="mt-12 text-center">
                        <a href="/register" className="hover:cursor-pointer hover:bg-[#3b5731] hover:text-white rounded-lg border-[1px] px-6 py-2 border-[#3b5731] font-semibold text-[#2f4627] first:transition">
                            Get Yourself Registered
                        </a>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default About



