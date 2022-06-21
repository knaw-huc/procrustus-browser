const serviceServer = '$REACT_APP_SERVICE_SERVER';
const home = '$REACT_APP_HOME';

export const getServiceServer = () => getVar(serviceServer) as string;
export const getHome = () => getVar(home) as string;

function getVar(key: string): string | undefined {
    if (key.startsWith('$REACT_APP_'))
        return process.env[key.substring(1)];
    return key;
}
