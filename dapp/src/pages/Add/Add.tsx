import { AuthRedirectWrapper } from "wrappers";
import { useScrollToElement } from "hooks";
import { brands } from "../../localConstants/brands";
import { useState } from "react";
import { smartContract } from "utils/smartContract";
import {
    Account,
    Address,
    AddressValue,
    BigUIntValue,
    BytesValue,
} from "@multiversx/sdk-core/out";
import { refreshAccount, sendTransactions } from "helpers";
import { useGetAccountInfo } from "hooks";
import { pinata } from "../../utils/config";

export const Add = () => {
    useScrollToElement();
    const [selectedBrand, setSelectedBrand] = useState<string>("None");
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [selectedDescription, setSelectedDescription] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<number>(0);
    const [selectedFuelType, setSelectedFuelType] =
        useState<string>("Gasoline");
    const [selectedTransmission, setSelectedTransmission] =
        useState<string>("Manual");
    const [selectedMileage, setSelectedMileage] = useState<number>(0);
    const [selectedHorsepower, setSelectedHorsepower] = useState<number>(0);
    const [selectedPrice, setSelectedPrice] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { address, account } = useGetAccountInfo();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const issue = smartContract.methodsExplicit
        //     .issueToken([
        //         BytesValue.fromUTF8("AAAA"),
        //         BytesValue.fromUTF8("AAAA"),
        //     ])
        //     .withValue("50000000000000000")
        //     .withSender(Address.fromString(address))
        //     .withGasLimit(100000000)
        //     .buildTransaction()
        //     .toPlainObject();

        // const roles = smartContract.methodsExplicit
        //     .setLocalRoles()
        //     .withValue("0")
        //     .withSender(Address.fromString(address))
        //     .withGasLimit(100000000)
        //     .buildTransaction()
        //     .toPlainObject();

        const upload = await pinata.upload.file(selectedImage as File, {
            metadata: {
                name: selectedBrand,
                keyValues: {
                    description: selectedDescription,
                    brand: selectedBrand,
                    model: selectedModel,
                    year: selectedYear,
                    fuelType: selectedFuelType,
                    transmission: selectedTransmission,
                    mileage: selectedMileage,
                    horsepower: selectedHorsepower,
                    price: selectedPrice,
                },
            },
        });
        const tx = smartContract.methodsExplicit
            .createNft([
                BytesValue.fromUTF8(selectedBrand.toUpperCase()),
                new BigUIntValue(0),
                BytesValue.fromUTF8(upload.IpfsHash.toString()),
                new BigUIntValue(selectedPrice * 1000000000000000000),
            ])
            .withValue("0")
            .withSender(Address.fromString(address))
            .withGasLimit(100000000)
            .buildTransaction()
            .toPlainObject();

        await refreshAccount();

        await sendTransactions({
            transactions: [tx],
            transactionsDisplayInfo: {
                processingMessage: "Processing mint transaction",
                errorMessage: "An error has occured during mint",
                successMessage: "Mint successful",
            },
            completedTransactionsDelay: 1000,
            signWithoutSending: false,
            redirectAfterSign: false,
        });
    };

    return (
        <AuthRedirectWrapper>
            <div className="flex flex-col w-full justify-center items-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-11/12 p-6 items-center gap-5 rounded-xl bg-[#f6f8fa]"
                >
                    <div className="w-full flex flex-col items-center justify-center gap-4">
                        <h1 className="text-4xl font-bold mb-10">Add Car</h1>
                        <div className="flex flex-col w-3/5">
                            <h1 className="text-xl mb-2 text-left">
                                Upload Image
                            </h1>
                            <div className="flex items-center justify-center self-center w-full">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 dark:hover:border-gray-500 transition-all ease-linear"
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">
                                                Click to upload
                                            </span>{" "}
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG or GIF (MAX.
                                            800x400px)
                                        </p>
                                    </div>
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        name="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) =>
                                            setSelectedImage(
                                                e.target.files?.[0] || null
                                            )
                                        }
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-3/5">
                        <h1 className="text-xl mb-2 text-left">Description</h1>
                        <textarea
                            name="description"
                            id="description"
                            className="border p-2 rounded"
                            placeholder="Enter a description"
                            maxLength={50}
                            value={selectedDescription}
                            onChange={(e) =>
                                setSelectedDescription(e.target.value)
                            }
                        ></textarea>
                    </div>
                    <div className="flex flex-col w-3/5">
                        {/* Brand Selector */}
                        <h1 className="text-xl mb-2 text-left">Brand</h1>
                        <select
                            name="brand"
                            id="brand"
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="border p-2 rounded"
                            required
                        >
                            <option key="None" value="None">
                                Select a brand
                            </option>
                            {Object.keys(brands).map((brand) => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col w-3/5">
                        {/* Model Selector */}
                        <h1 className="text-xl mb-2 text-left">Model</h1>
                        <select
                            name="model"
                            id="model"
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                            className="border p-2 rounded"
                            disabled={selectedBrand === "None"}
                            required
                        >
                            <option key="None" value="">
                                {selectedBrand === "None"
                                    ? "Select a brand first"
                                    : "Select a model"}
                            </option>
                            {selectedBrand !== "None" &&
                                brands[selectedBrand].map((model) => (
                                    <option key={model} value={model}>
                                        {model}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="flex flex-col w-3/5">
                        <h1 className="text-xl mb-2 text-left">Year</h1>
                        <input
                            type="number"
                            className="border p-2 rounded"
                            placeholder="Enter the year"
                            max={new Date().getFullYear()}
                            min={1900}
                            onChange={(e) => setSelectedYear(+e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col w-3/5">
                        <h1 className="text-xl mb-2 text-left">Fuel Type</h1>
                        <select
                            name="fuelType"
                            id="fuelType"
                            className="border p-2 rounded"
                            value={selectedFuelType}
                            onChange={(e) =>
                                setSelectedFuelType(e.target.value)
                            }
                            required
                        >
                            <option value="Gasoline">Gasoline</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Electric">Electric</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-3/5">
                        <h1 className="text-xl mb-2 text-left">Transmission</h1>
                        <select
                            name="transmission"
                            id="transmission"
                            className="border p-2 rounded"
                            value={selectedTransmission}
                            onChange={(e) =>
                                setSelectedTransmission(e.target.value)
                            }
                            required
                        >
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-3/5">
                        <h1 className="text-xl mb-2 text-left">Mileage</h1>
                        <input
                            type="number"
                            className="border p-2 rounded"
                            placeholder="Enter the mileage"
                            onChange={(e) =>
                                setSelectedMileage(+e.target.value)
                            }
                            min={0}
                            max={1000000}
                            required
                        />
                    </div>
                    <div className="flex flex-col w-3/5">
                        <h1 className="text-xl mb-2 text-left">Horsepower</h1>
                        <input
                            type="number"
                            className="border p-2 rounded"
                            placeholder="Enter the horsepower"
                            onChange={(e) =>
                                setSelectedHorsepower(+e.target.value)
                            }
                            min={0}
                            max={10000}
                            required
                        />
                    </div>
                    <div className="flex flex-col w-3/5">
                        <h1 className="text-xl mb-2 text-left">Price</h1>
                        <input
                            type="number"
                            className="border p-2 rounded"
                            placeholder="Enter the price in EGLD"
                            min={0}
                            max={1000000}
                            onChange={(e) => setSelectedPrice(+e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Add Car
                    </button>
                </form>
            </div>
        </AuthRedirectWrapper>
    );
};
