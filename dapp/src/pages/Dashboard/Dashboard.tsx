import { contractAddress, API_URL } from "config";
import { AuthRedirectWrapper } from "wrappers";
import { Car } from "./widgets";
import { useScrollToElement } from "hooks";
import { Widget } from "./components";
import { WidgetType } from "types/widget.types";
import { useEffect, useState } from "react";
import { useGetAccountInfo } from "hooks";
import { pinata } from "../../utils/config";
import { isEmpty } from "@multiversx/sdk-core/out";

export const Dashboard = () => {
    useScrollToElement();
    const [NFTs, setNFTs] = useState<any[]>([]);

    useEffect(() => {
        fetch(API_URL + "/accounts/" + contractAddress + "/nfts")
            .then(async (response) => {
                const data = await response.json();
                let metadatas = [];
                for (let inst of data) {
                    if (!inst.url) continue;
                    const metadata = await pinata.listFiles().cid(inst.url);
                    if (!metadata || isEmpty(metadata)) continue;
                    metadatas.push(metadata);
                }
                setNFTs(metadatas);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <AuthRedirectWrapper>
            <div className="flex flex-col gap-6 mt-10 w-10/12">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold mb-8">Recents</h1>
                </div>
                <div className="flex w-full justify-center">
                    <div className="flex flex-wrap gap-10 w-full">
                        {NFTs.map((element) => (
                            <Widget
                                key={element[0].ipfs_pin_hash}
                                title={element[0].metadata.name}
                                metadata={element[0].metadata}
                                imageurl={
                                    "https://ipfs.io/ipfs/" +
                                    element[0].ipfs_pin_hash
                                }
                                reference={
                                    "https://localhost:3000/details?nft=" +
                                    element[0].ipfs_pin_hash
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthRedirectWrapper>
    );
};
