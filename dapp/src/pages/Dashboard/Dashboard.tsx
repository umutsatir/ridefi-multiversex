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
        reference:
            "https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account",
    },
    {
        title: "Volkswagen Golf",
        widget: Car,
        description: "Less used car",
        reference:
            "https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account",
    },
    {
        title: "Volkswagen Golf",
        widget: Car,
        description: "Less used car",
        reference:
            "https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account",
    },
    {
        title: "Volkswagen Golf",
        widget: Car,
        description: "Less used car",
        reference:
            "https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account",
    },
];

export const Dashboard = () => {
    useScrollToElement();

    return (
        <AuthRedirectWrapper>
            <div className="flex flex-col gap-6">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold">Dashboard</h1>
                </div>
                <div className="flex w-full justify-center">
                    <div className="flex flex-wrap gap-6 w-11/12">
                        {WIDGETS.map((element) => (
                            <Widget key={element.title} {...element} />
                        ))}
                    </div>
                </div>
            </div>
        </AuthRedirectWrapper>
    );
};
