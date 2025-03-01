import { RouteNamesEnum } from "localConstants";
import { Dashboard, Home, Details, Add, Search } from "pages";
import { RouteType } from "types";

interface RouteWithTitleType extends RouteType {
    title: string;
}

export const routes: RouteWithTitleType[] = [
    {
        path: RouteNamesEnum.home,
        title: "Home",
        component: Home,
    },
    {
        path: RouteNamesEnum.dashboard,
        title: "Dashboard",
        component: Dashboard,
    },
    {
        path: RouteNamesEnum.details,
        title: "Details",
        component: Details,
    },
    {
        path: RouteNamesEnum.add,
        title: "Add",
        component: Add,
    },
    {
        path: RouteNamesEnum.search,
        title: "Search",
        component: Search,
    },
];
