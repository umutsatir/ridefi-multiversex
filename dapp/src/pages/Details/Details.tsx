import { AuthRedirectWrapper } from "wrappers";
import { useScrollToElement } from "hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { pinata } from "utils/config";
import { useEffect, useState } from "react";

export const Details = () => {
    const search = useLocation().search;
    const ipfsHash = new URLSearchParams(search).get("nft");
    const [metadata, setMetadata] = useState<any>({});
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

    const widthVar = 80;
    const progressBarColor =
        widthVar <= 30
            ? "oklch(0.577 0.245 27.325)"
            : widthVar <= 60
            ? "oklch(0.795 0.184 86.047)"
            : "oklch(0.627 0.194 149.214)";

    return (
        <AuthRedirectWrapper>
            <div className="flex flex-col w-full h-[calc(100vh-200px)] justify-center items-center mt-10">
                <div className="flex flex-col w-9/12 p-6 items-center justify-center gap-2 rounded-xl bg-[#f6f8fa]">
                    <h4 className="mt-3 text-4xl font-bold">Details</h4>
                    <div className="flex w-full justify-between p-10 gap-4">
                        <img
                            src={"https://ipfs.io/ipfs/" + ipfsHash}
                            alt=""
                            className="rounded-lg w=[500px] h-[500px]"
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
                                    <h1 className="font-bold">AI Score</h1>
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
