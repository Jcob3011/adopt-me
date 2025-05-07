import {RoutePath} from "../../router/RoutePath";

const ID_SUFFIX = ":id"
export const detailsPathWithoutId = (path: RoutePath) => {
    if (path.endsWith(ID_SUFFIX)) {
        return path.replace(ID_SUFFIX, "")
    }
    return path
}
