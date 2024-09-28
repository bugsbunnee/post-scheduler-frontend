import { useCallback, useEffect, useState } from "react";

const useCloudinaryLoaded = () => {
    const [loaded, setLoaded] = useState(false);

    const initUWScript = useCallback(() => {
        if (loaded) return;

        const uwScript = document.getElementById("uw");
        if (uwScript) return setLoaded(true);

        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('id', 'uw');

        script.src = "https://upload-widget.cloudinary.com/global/all.js";

        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
    }, [loaded]);

    useEffect(() => {
        initUWScript();
    }, [initUWScript]);

    return loaded;
};
 
export default useCloudinaryLoaded;