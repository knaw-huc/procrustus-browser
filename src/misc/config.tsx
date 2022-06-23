// Development
const serviceServer = "http://localhost:5000/";
const home = "http://localhost:3000";

// Production
// const serviceServer = "https://gaservice.sd.di.huc.knaw.nl/";
// const home = "https://ga.sd.di.huc.knaw.nl/";

// Environment variables
// const serviceServer = '$REACT_APP_SERVICE_SERVER';
// const home = '$REACT_APP_HOME';

export const getServiceServer = () => getVar(serviceServer) as string;
export const getHome = () => getVar(home) as string;

function getVar(key: string): string | undefined {
    if (key.startsWith('$REACT_APP_'))
        return process.env[key.substring(1)];
    return key;
}
