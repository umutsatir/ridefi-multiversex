import type { PropsWithChildren } from "react";
import classNames from "classnames";
import { Loader } from "components/sdkDappComponents";
import { WithClassnameType } from "types";

interface OutputContainerPropsType
    extends PropsWithChildren,
        WithClassnameType {
    isLoading?: boolean;
}

export const OutputContainer = (props: OutputContainerPropsType) => {
    const { children, isLoading = false, className = "p-4" } = props;

    const handleBuy = () => {
        console.log("Buy button clicked");
    };

    return (
        <div className="flex justify-between gap-4">
            <img src="https://picsum.photos/200" alt="" />
            <div
                className={classNames(
                    "text-sm border border-gray-200 rounded w-1/2",
                    className
                )}
                data-testid={props["data-testid"]}
            >
                {isLoading ? <Loader /> : children}
            </div>
        </div>
    );
};
