import { Card } from "components/Card";
import { getCallbackRoute } from "utils/getCallbackRoute";
import { WidgetType } from "types/widget.types";
import { useIsWebProvider } from "hooks";
import "./Widget.css";
import { pinata } from "utils/config";
import { Car } from "../widgets";

export const Widget = ({
    title,
    description,
    reference,
    anchor,
    metadata,
    imageurl,
}: any) => {
    const { isWebProvider } = useIsWebProvider();
    const callbackRoute = anchor
        ? getCallbackRoute({ anchor, isWebProvider })
        : "";

    return (
        <div className="max-w-sm w-full max-h-96 specialCard shadow-lg ">
            <Card
                title={metadata.name}
                description={description}
                reference={reference}
                anchor={anchor}
            >
                <Car
                    callbackRoute={callbackRoute}
                    metadata={metadata.keyvalues}
                    imageurl={imageurl}
                />
            </Card>
        </div>
    );
};
