import React, { useEffect } from "react";

const TranslationService = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
    script.defer = true;
    document.body.appendChild(script);

    window.gtranslateSettings = {
      default_language: "en",
      detect_browser_language: true,
      languages: [
        "en",
        "fr",
        "de",
        "it",
        "es",
        "ur",
        "uz",
        "ku",
        "hi",
        "zh-CN",
        "ko",
        "ja",
        "tr",
        "my",
      ],
      wrapper_selector: ".gtranslate_wrapper",
    };
  }, []);

  return <div className="gtranslate_wrapper"></div>;
};

export default TranslationService;
