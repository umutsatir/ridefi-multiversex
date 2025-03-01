export type WidgetProps = {
    callbackRoute: string;
};

export type WidgetType<T = any> = {
    title: string;
    widget: (props: T) => JSX.Element;
    description?: string;
    year?: number;
    fuelType?: string;
    transmission?: string;
    mileage?: number;
    reference: string;
    anchor?: string;
};
