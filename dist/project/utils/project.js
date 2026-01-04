import { ProjectType } from "../models/project.js";
export function toProjectType(type) {
    switch (type) {
        case "App":
            return ProjectType.App;
        case "Lib":
            return ProjectType.Lib;
        default:
            return ProjectType.App;
    }
}
