import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import profile from "../assets/profile.png";

const PublicProfile = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const GoBack = () => navigate('/options');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/public-profile/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
            setLoading(false);
        };

        fetchProfile();
    }, [username]);

    if (loading) return <p className="text-center text-gray-600 text-lg">Loading...</p>;
    if (!user) return <p className="text-center text-red-500 text-lg">User not found.</p>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Public Profile</h1>

                <img
                    src={user.profile || profile}
                    alt="Profile"
                    className="w-32 h-32 mx-auto rounded-full shadow-md border-4 border-blue-500"
                />
                
                <h2 className="text-2xl font-semibold text-gray-900 mt-4">{user.firstName} {user.lastName}</h2>
                <p className="text-gray-500 text-md">@{user.username}</p>
                
                <div className="mt-4 text-gray-700">
                    <p className="text-md"><strong>Address:</strong> {user.address}</p>
                    <p className="text-md"><strong>Email:</strong> <span className="text-blue-600">{user.email}</span></p>
                </div>

                <button 
                    className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
                    onClick={GoBack}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default PublicProfile;
