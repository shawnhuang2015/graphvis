let rootPath = 'www.123.graphsql.net/';
let defaultController = 'home';
let defaultAction = 'index';

export interface GetPath {
    (id: number, controller: string, action?: string): string;
}

export var getPath: GetPath;
getPath = function(id: number, controller: string, action: string) {

    if (!controller) {
        controller = defaultController;
    }
    if (!action) {
        action = defaultAction;
    }

    return rootPath + controller + '/' + action + '/' + id;
};
