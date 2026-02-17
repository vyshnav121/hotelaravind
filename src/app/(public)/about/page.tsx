

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-off-white py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold text-center text-kerala-green mb-12">About Us</h1>

                <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 mb-12">
                    <h2 className="text-2xl font-serif font-bold mb-4 text-gray-800">Our Legacy</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Established in 1983, Aravind Hotel has been a cornerstone of culinary excellence in Sulthan Bathery.
                        What started as a small eatery has grown into a beloved destination for food lovers, known for our
                        authentic Kerala cuisine and warm hospitality.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Our founder&apos;s vision was simple: to serve food that tastes like home. Decades later, we continue
                        to honor that legacy by using traditional recipes, fresh locally-sourced ingredients, and the same
                        dedication to quality that defined us from day one.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <h3 className="text-xl font-bold mb-4 text-kerala-gold">Our Mission</h3>
                        <p className="text-gray-600">
                            To provide an unforgettable dining experience by serving authentic, high-quality food in a
                            clean and welcoming environment, while preserving the rich culinary heritage of Kerala.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <h3 className="text-xl font-bold mb-4 text-kerala-gold">Our Promise</h3>
                        <p className="text-gray-600">
                            We promise to never compromise on quality. From the spices we grind daily to the fresh catch
                            we procure each morning, every ingredient is chosen with care to ensure the perfect taste
                            in every bite.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
