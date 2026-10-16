
import React, { useEffect } from "react";
import { X, BriefcaseBusiness } from "lucide-react";

export default function DiscoverOpportunityModal({ onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="discover-opportunity-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <BriefcaseBusiness size={21} />
            </div>

            <div className="min-w-0">
              <h2
                id="discover-opportunity-title"
                className="truncate text-lg font-semibold text-slate-900 sm:text-xl"
              >
                व्यावसायिक अवसर जानें
              </h2>

              <p className="text-xs text-slate-500 sm:text-sm">
                सीखें • आगे बढ़ें • नए अवसर तलाशें
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="बंद करें"
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={21} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-4 py-5 sm:px-7 sm:py-6">
          <div className="mx-auto max-w-3xl">
            {/* Title */}
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                एक नई शुरुआत,{" "}
                <span className="text-emerald-700">नए अवसर</span>
              </h3>

              <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-emerald-600" />
            </div>

            {/* Introduction */}
            <div className="space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
              <p>
                अपने सपनों की दिशा में कदम बढ़ाएँ और बेहतर जीवनशैली अपनाने की
                संभावनाएँ तलाशें। पोषण से जुड़े उत्पादों की जानकारी प्राप्त
                करें, अपने अनुभव साझा करें, नए लोगों से जुड़ें और संवादात्मक
                प्रशिक्षण के माध्यम से व्यक्तिगत तथा व्यावसायिक कौशल विकसित
                करें।
              </p>

              <p>
                यदि आप अपने जीवन में सकारात्मक बदलाव लाना चाहते हैं या अपनी
                नियमित आय के अतिरिक्त कमाई के अवसर तलाश रहे हैं, तो यह
                व्यावसायिक यात्रा आपके लिए एक नई शुरुआत हो सकती है।
              </p>

              <p>
                हमारा उद्देश्य एक ऐसा व्यवस्थित और विश्वसनीय प्रत्यक्ष-विक्रय
                व्यवसाय विकसित करना है, जहाँ लोग गुणवत्तापूर्ण पोषण उत्पादों
                से जुड़कर अपने कौशल को निखार सकें और दीर्घकालिक व्यावसायिक
                संभावनाओं को समझ सकें।
              </p>
            </div>

            {/* Support System */}
            <section className="mb-7">
              <h4 className="mb-2 text-lg font-bold text-slate-900">
                सहयोग एवं मार्गदर्शन
              </h4>

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                किसी भी व्यावसायिक यात्रा में सही मार्गदर्शन और सहयोग
                महत्वपूर्ण होते हैं। एक प्रभावी सहयोग व्यवस्था में बहुभाषी
                सहायता, क्षेत्रीय नेतृत्व और उत्तरदायी प्रबंधन शामिल हो सकते
                हैं, ताकि साझेदारों को अपने कार्य और विकास से संबंधित जानकारी
                मिल सके।
              </p>
            </section>

            {/* Compensation Plan */}
            <section className="mb-7">
              <h4 className="mb-2 text-lg font-bold text-slate-900">
                लचीली एवं प्रोत्साहन-आधारित योजना
              </h4>

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                प्रत्यक्ष-विक्रय व्यवसाय में लागू नियमों के अनुसार उत्पाद
                बिक्री पर कमीशन और अन्य निर्धारित प्रोत्साहन शामिल हो सकते
                हैं। ऐसी योजनाएँ पूर्णकालिक या अंशकालिक रूप से काम करने की
                संभावनाएँ प्रदान कर सकती हैं। वास्तविक कमाई बिक्री, योजना की
                शर्तों और व्यक्तिगत प्रयासों पर निर्भर करती है। किसी निश्चित
                आय या सफलता की गारंटी नहीं होती।
              </p>
            </section>

            {/* Premium Products */}
            <section className="mb-7">
              <h4 className="mb-2 text-lg font-bold text-slate-900">
                पोषण उत्पादों की जानकारी
              </h4>

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                पोषण उत्पाद चुनते समय उनकी सामग्री, गुणवत्ता संबंधी जानकारी,
                निर्माण मानकों और उपयोग के निर्देशों को समझना आवश्यक है।
                उत्पादों से जुड़े दावे उपलब्ध आधिकारिक जानकारी और प्रमाणों
                के अनुरूप होने चाहिए।
              </p>
            </section>

            {/* Education */}
            <section className="mb-7">
              <h4 className="mb-3 text-lg font-bold text-slate-900">
                प्रशिक्षण एवं सीखने के अवसर
              </h4>

              <ul className="space-y-3 text-sm leading-7 text-slate-600 sm:text-base">
                <li>
                  <span className="font-semibold text-slate-800">
                    • व्यवसाय परिचय सत्र:
                  </span>{" "}
                  व्यवसाय की कार्यप्रणाली, अवसरों और जिम्मेदारियों को समझना।
                </li>

                <li>
                  <span className="font-semibold text-slate-800">
                    • नए साझेदारों के लिए प्रशिक्षण:
                  </span>{" "}
                  बुनियादी जानकारी, उत्पाद परिचय और कार्य शुरू करने की प्रक्रिया।
                </li>

                <li>
                  <span className="font-semibold text-slate-800">
                    • नेतृत्व विकास:
                  </span>{" "}
                  नेतृत्व, टीमवर्क, संवाद और निर्णय लेने के कौशल विकसित करना।
                </li>

                <li>
                  <span className="font-semibold text-slate-800">
                    • ऑनलाइन वेबिनार:
                  </span>{" "}
                  दूर-दराज़ के लोगों के लिए सीखने और संवाद करने की सुविधा।
                </li>

                <li>
                  <span className="font-semibold text-slate-800">
                    • फिटनेस सत्र एवं कार्यशालाएँ:
                  </span>{" "}
                  सक्रिय जीवनशैली, सामान्य पोषण शिक्षा और फिटनेस से जुड़ी
                  जानकारी प्राप्त करना।
                </li>
              </ul>
            </section>

            {/* Brand Message */}
            <div className="rounded-2xl bg-emerald-50 px-5 py-6 text-center">
              <p className="text-base font-semibold leading-7 text-emerald-900 sm:text-lg">
                अपने जीवन में सकारात्मक बदलाव लाएँ और बेहतर भविष्य की ओर
                कदम बढ़ाएँ।
              </p>

              <p className="mt-2 text-sm leading-7 text-emerald-800/80">
                सीखने, पोषण संबंधी जागरूकता, व्यक्तिगत विकास और व्यावसायिक
                संभावनाओं की एक नई यात्रा शुरू करें।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}