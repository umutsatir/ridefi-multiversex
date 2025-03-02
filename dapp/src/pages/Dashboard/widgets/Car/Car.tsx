import { Label } from "components/Label";
import { OutputContainer } from "components/OutputContainer";
import { useGetAccountInfo, useGetNetworkConfig } from "hooks";

export const Car = ({
    metadata,
    imageurl,
    callbackRoute,
}: {
    metadata: any;
    imageurl: string;
    callbackRoute: string;
}) => {
    // const { network } = useGetNetworkConfig();
    // const { address, account } = useGetAccountInfo();

    return (
        <OutputContainer imageurl={imageurl}>
            <div className="flex flex-col text-black" data-testid="topInfo">
                <p className="truncate flex flex-col m-1">
                    <Label>Year: </Label>
                    <span data-testid="year">{metadata.year}</span>
                </p>
                <p className="truncate flex flex-col m-1">
                    <Label>Fuel Type: </Label>
                    <span data-testid="brand">{metadata.fuelType}</span>
                </p>
                <p className="truncate flex flex-col m-1">
                    <Label>Transmission: </Label>
                    <span data-testid="transmission">
                        {metadata.transmission}
                    </span>
                </p>
                <p className="truncate flex flex-col m-1">
                    <Label>Mileage: </Label>
                    <span data-testid="mileage">{metadata.mileage}</span>
                </p>
            </div>
        </OutputContainer>
    );
};
