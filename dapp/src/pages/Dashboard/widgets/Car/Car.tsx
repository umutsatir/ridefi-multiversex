import { Label } from "components/Label";
import { OutputContainer } from "components/OutputContainer";
import { useGetAccountInfo, useGetNetworkConfig } from "hooks";

export const Car = ({
    year,
    fuelType,
    transmission,
    mileage,
}: {
    year: number;
    fuelType: string;
    transmission: string;
    mileage: number;
}) => {
    // const { network } = useGetNetworkConfig();
    // const { address, account } = useGetAccountInfo();

    return (
        <OutputContainer>
            <div className="flex flex-col text-black" data-testid="topInfo">
                <p className="truncate flex flex-col m-1">
                    <Label>Year: </Label>
                    <span data-testid="year">{year}</span>
                </p>
                <p className="truncate flex flex-col m-1">
                    <Label>Fuel Type: </Label>
                    <span data-testid="brand">{fuelType}</span>
                </p>
                <p className="truncate flex flex-col m-1">
                    <Label>Transmission: </Label>
                    <span data-testid="transmission">{transmission}</span>
                </p>
                <p className="truncate flex flex-col m-1">
                    <Label>Mileage: </Label>
                    <span data-testid="mileage">
                        {mileage.toLocaleString("en")}
                    </span>
                </p>
            </div>
        </OutputContainer>
    );
};
