import { AuthRedirectWrapper } from "wrappers";
import { useScrollToElement } from "hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { pinata } from "utils/config";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../../config/config.env";

export const Details = () => {
    const search = useLocation().search;
    const ipfsHash = new URLSearchParams(search).get("nft");
    const [metadata, setMetadata] = useState<any>({});
    const [widthVar, setWidthVar] = useState(0);
    const [progressBarColor, setProgressBarColor] = useState("#000000");
    useScrollToElement();

    useEffect(() => {
        if (!ipfsHash) return;
        pinata
            .listFiles()
            .cid(ipfsHash)
            .then((metadata) => {
                setMetadata(metadata[0].metadata.keyvalues);
            });
    }, [ipfsHash]);

    async function handleAIPrediction() {
        const apiKey = GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not defined");
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        // The Gemini 1.5 models are versatile and work with most use cases
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Price prediction range for a car with the following features: 
                        brand:
                        ${metadata.brand}
                        , model: 
                        ${metadata.model}
                        , year: 
                        ${metadata.year}
                        , fuel type: 
                        ${metadata.fuelType}
                        , transmission, 
                        ${metadata.transmission}
                        , mileage: 
                        ${metadata.mileage} miles
                        , horsepower: 
                        ${metadata.horsepower}. Give only the price range in USD, from and to values.`;

        const prompt2 = `Give overall score for a car with the following features: 
                        price:
                        ${metadata.price * 20} USD
                        brand:
                        ${metadata.brand}
                        , model: 
                        ${metadata.model}
                        , year: 
                        ${metadata.year}
                        , fuel type: 
                        ${metadata.fuelType}
                        , transmission: 
                        ${metadata.transmission}
                        , mileage: 
                        ${metadata.mileage} miles
                        , horsepower: 
                        ${
                            metadata.horsepower
                        }. Give only number from 0 to 100.`;

        const result = await model.generateContent([prompt]);
        const response = await result.response;
        document.getElementById("price-prediction")!.innerText =
            response.text();

        const result2 = await model.generateContent([prompt2]);
        const response2 = await result2.response;
        setWidthVar(parseInt(response2.text()));
        setProgressBarColor(
            widthVar <= 30
                ? "oklch(0.627 0.194 149.214)"
                : widthVar <= 70
                ? "oklch(0.795 0.184 86.047)"
                : "oklch(0.577 0.245 27.325)"
        );
    }

    return (
        <AuthRedirectWrapper>
            <div className="flex flex-col w-full h-[calc(100vh-200px)] justify-center items-center mt-10">
                <div className="flex flex-col w-9/12 p-6 items-center justify-center gap-2 rounded-xl bg-[#f6f8fa]">
                    <h4 className="mt-3 text-4xl font-bold">Details</h4>
                    <div className="flex w-full justify-between p-10 gap-4">
                        <img
                            src={"https://ipfs.io/ipfs/" + ipfsHash}
                            alt=""
                            className="rounded-lg w-[500px] h-[300px] self-center"
                        />
                        <div className="flex flex-col gap-2.5 w-2/5 p-4">
                            <div className="flex justify-between gap-1">
                                <h1 className="font-bold">Price</h1>
                                <p className=" text-red-600 text-xl font-bold">
                                    {metadata.price} EGLD
                                </p>
                            </div>
                            <hr />
                            <div className="flex justify-between gap-1 mt-7">
                                <h1 className="font-bold">Brand</h1>
                                <p>{metadata.brand}</p>
                            </div>
                            <hr />
                            <div className="flex justify-between gap-1">
                                <h1 className="font-bold">Model</h1>
                                <p>{metadata.model}</p>
                            </div>
                            <hr />
                            <div className="flex justify-between gap-1">
                                <h1 className="font-bold">Year</h1>
                                <p>{metadata.year}</p>
                            </div>
                            <hr />
                            <div className="flex justify-between gap-1">
                                <h1 className="font-bold">Fuel Type</h1>
                                <p>{metadata.fuelType}</p>
                            </div>
                            <hr />
                            <div className="flex justify-between gap-1">
                                <h1 className="font-bold">Transmission</h1>
                                <p>{metadata.transmission}</p>
                            </div>
                            <hr />
                            <div className="flex justify-between gap-1">
                                <h1 className="font-bold">Mileage</h1>
                                <p>{metadata.mileage} miles</p>
                            </div>
                            <hr />
                            <div className="flex justify-between gap-1">
                                <h1 className="font-bold">Horsepower</h1>
                                <p>{metadata.horsepower} hp</p>
                            </div>
                            <div className="price-prediction mt-10">
                                <div className="flex flex-col justify-between items-center gap-3">
                                    <h1 className="font-bold">AI Prediction</h1>
                                    <p
                                        id="price-prediction"
                                        className="text-sm text-green-700"
                                    ></p>
                                    <div className="w-full flex gap-2.5 items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
                                            <motion.div
                                                className="progress-bar rounded-full h-2.5"
                                                initial={{ width: "0%" }} // Start from 0%
                                                animate={{
                                                    width: `${widthVar % 100}%`,
                                                }} // Animate to target width
                                                transition={{
                                                    duration: 0.5,
                                                    ease: "easeInOut",
                                                }}
                                                style={{
                                                    backgroundColor:
                                                        progressBarColor,
                                                }}
                                            />
                                        </div>
                                        <p className="text-sm font-bold">
                                            {widthVar % 100}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 self-end mr-11 mb-5">
                        <button
                            type="button"
                            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                            onClick={handleAIPrediction}
                        >
                            AI Price Prediction
                        </button>
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Buy
                        </button>
                    </div>
                </div>
            </div>
        </AuthRedirectWrapper>
    );
};
