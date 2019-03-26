import { localeMenu } from '@/utils/routes';

function formatter (data) {
    return data.map(item => {
        if (!item.path) return null;
        if (item.routes) {
            item.routes = formatter(item.routes);
            // delete item.routes;
        }
        item["name"] = localeMenu(item.path);
        return item;
    }).filter(item => item);
}

const filterMenuData = menuData => {
    return menuData || [];
};

const getBreadcrumbNameMap = menuData => {
    const routerMap = {};

    const flattenMenuData = data => {
        data.forEach(menuItem => {
            if (menuItem.routes) {
                flattenMenuData(menuItem.routes);
            }
            routerMap[menuItem.path] = menuItem;
        });
    };
    flattenMenuData(menuData);

    // console.log(routerMap)
    return routerMap;
}


export default {
    namespace: 'menu',
    state: {
        menuData: [],
        routerData: [],
        breadcrumbNameMap: {},
    },
    effects: {
        *getMenuData ({ payload }, {put}) {
            const { routes } = payload;
            const originMenuData = formatter(routes);
            const menuData = filterMenuData(originMenuData);
            const breadcrumbNameMap = getBreadcrumbNameMap(originMenuData);
            yield put({
                type: 'save',
                payload: { menuData, breadcrumbNameMap, routerData: routes},
            })
        }
    },
    reducers: {
        save (state, action) {
            return {
                ...state,
                ...action.payload
            }
        }
    }
}