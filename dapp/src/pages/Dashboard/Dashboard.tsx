import { contractAddress } from "config";
import { AuthRedirectWrapper } from "wrappers";
import { Car } from "./widgets";
import { useScrollToElement } from "hooks";
import { Widget } from "./components";
import { WidgetType } from "types/widget.types";

const WIDGETS: WidgetType[] = [
    {
        title: "Volkswagen Golf",
        widget: Car,
        description: "Less used car",
        year: 2013,
        fuelType: "Diesel",
        mileage: 100000,
        transmission: "Manual",
        reference:
            "https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account",
    },
    {
        title: "Volkswagen Golf",
        widget: Car,
        description: "Less used car",
        year: 2013,
        fuelType: "Diesel",
        mileage: 100000,
        transmission: "Manual",
        reference:
            "https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account",
    },
    {
        title: "Volkswagen Golf",
        widget: Car,
        description: "Less used car",
        year: 2013,
        fuelType: "Diesel",
        mileage: 100000,
        transmission: "Manual",
        reference:
            "https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account",
    },
    {
        title: "Volkswagen Golf",
        widget: Car,
        description: "Less used car",
        year: 2013,
        fuelType: "Diesel",
        mileage: 100000,
        transmission: "Manual",
        reference:
            "https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account",
    },
];

export const Dashboard = () => {
    useScrollToElement();

    return (
        <AuthRedirectWrapper>
            <div className="flex flex-col gap-6 mt-10">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold mb-8">Recents</h1>
                </div>
                <div className="flex w-full justify-center">
                    <div className="flex flex-wrap gap-10 w-11/12">
                        {WIDGETS.map((element) => (
                            <Widget key={element.title} {...element} />
                        ))}
                    </div>
                </div>
            </div>
        </AuthRedirectWrapper>
    );
};
