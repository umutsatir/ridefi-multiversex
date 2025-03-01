import { Label } from "components/Label";
import { OutputContainer } from "components/OutputContainer";
import { useGetAccountInfo, useGetNetworkConfig } from "hooks";

export const Car = ({
    brand,
    model,
    year,
    fuelType,
    transmission,
    mileage,
    hp,
}: {
    brand: string;
    model: string;
    year: number;
    fuelType: string;
    transmission: string;
    mileage: number;
    hp: number;
}) => {
    // const { network } = useGetNetworkConfig();
    // const { address, account } = useGetAccountInfo();

    return (
        <OutputContainer>
            <div className="flex flex-col text-black" data-testid="topInfo">
                <p className="truncate">
                    <Label>Brand: </Label>
                    <span data-testid="brand">{brand}</span>
                </p>
                <p className="truncate">
                    <Label>Model: </Label>
                    <span data-testid="model">{model}</span>
                </p>
                <p className="truncate">
                    <Label>Year: </Label>
                    <span data-testid="year">{year}</span>
                </p>
                <p className="truncate">
                    <Label>Fuel Type: </Label>
                    <span data-testid="brand">{fuelType}</span>
                </p>
                <p className="truncate">
                    <Label>Transmission: </Label>
                    <span data-testid="transmission">{transmission}</span>
                </p>
                <p className="truncate">
                    <Label>Mileage: </Label>
                    <span data-testid="mileage">{mileage}</span>
                </p>
                <p className="truncate">
                    <Label>Horsepower: </Label>
                    <span data-testid="hp">{hp}</span>
                </p>
            </div>
        </OutputContainer>
    );
};
