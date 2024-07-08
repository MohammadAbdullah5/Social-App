const HomePage = () => {
    return (
        <div className="home-page container mx-auto p-6">
            <div className="welcome-section text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Our Social Media Application</h1>
                <p className="text-lg text-gray-600">
                    This is a feature-rich social media application built using the MERN stack and Redux.
                </p>
            </div>
            <div className="features-section text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Features</h2>
                <ul className="list-disc list-inside text-lg text-gray-600">
                    <li className="mb-2">Add and share your posts with the community.</li>
                    <li className="mb-2">Comment on posts and engage with other users.</li>
                    <li className="mb-2">Like posts to show your appreciation.</li>
                    <li className="mb-2">Authentication and authorization for a secure experience.</li>
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
