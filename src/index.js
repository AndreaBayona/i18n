import * as React from "react";
import ReactDOM from "react-dom";
import {IntlProvider, useIntl} from 'react-intl';

import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

import JobsList from "./components/jobslist";

const IntlContext = React.createContext({});
const navLocale = navigator.language;

export const IntlContextProvider = ({children}) => {
    const [locale, setLocale] = React.useState(navLocale);
    return <IntlContext.Provider value={{locale, setLocale}}>{children}</IntlContext.Provider>;
};

const useIntlContext = () => React.useContext(IntlContext);

const Locale = () => {
    const {setLocale} = useIntlContext();
    const {locale} = useIntl();

    React.useEffect(() => {
        console.log("From Browser", {locale})
        setLocale(locale)
    }, [locale, setLocale])

    return <JobsList/>;
}

const LocalesJobs = () => {
    const {locale} = useIntlContext();
    console.log("Andrea", {locale})
    return <IntlProvider locale={locale} messages={locale.startsWith("es")? localeEsMessages : localeEnMessages}><Locale/></IntlProvider>;
}


ReactDOM.render(<IntlContextProvider><LocalesJobs/></IntlContextProvider>, document.getElementById("root"));
